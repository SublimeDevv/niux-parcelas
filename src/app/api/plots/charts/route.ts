import getRedisClient from "@/lib/redis";
import { getCached } from "@/lib/redis-helpers";
import { ResponseHelper, withErrorHandling } from "@/lib/response";
import { DashboardData, TemperatureReading } from "@/modules/plots/interfaces";
import { Plots } from "@/modules/plots/interfaces/plotsApi";

export async function GET() {
  return withErrorHandling(async () => {
    const redis = await getRedisClient();
    const cachedData = await getCached<Plots>(redis, "lista_parcelas");

    if (!cachedData || !cachedData.temperatura) {
      return ResponseHelper.badRequest("No data available");
    }

    const temperaturaData: TemperatureReading[] = cachedData.temperatura;

    const temperatureChartData = temperaturaData.map((reading) => ({
      date: new Date(reading.timestamp).toISOString().split("T")[0],
      temperature: Math.round(reading.value * 100) / 100,
    }));

    const temps = temperaturaData.map((r) => r.value);
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    const firstHalf = temps.slice(0, Math.floor(temps.length / 2));
    const secondHalf = temps.slice(Math.floor(temps.length / 2));
    const avgFirstHalf =
      firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const avgSecondHalf =
      secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    const trend = ((avgSecondHalf - avgFirstHalf) / avgFirstHalf) * 100;

    const humidityData = temperaturaData.map((reading, index) => {
      const simulatedHumidity = Math.round(
        100 - (reading.value - 20) * 2 + Math.random() * 10
      );
      return {
        location: `Parcela ${index + 1}`,
        humidity: Math.max(30, Math.min(95, simulatedHumidity)),
      };
    });

    const avgHumidity =
      humidityData.reduce((a, b) => a + b.humidity, 0) / humidityData.length;
    const minHumidity = Math.min(...humidityData.map((h) => h.humidity));
    const maxHumidity = Math.max(...humidityData.map((h) => h.humidity));

    const crops = [
      { crop: "Maíz", area: 120, fill: "var(--chart-1)" },
      { crop: "Frijol", area: 85, fill: "var(--chart-2)" },
      { crop: "Calabaza", area: 65, fill: "var(--chart-3)" },
      { crop: "Chile", area: 45, fill: "var(--chart-4)" },
      { crop: "Otros", area: 30, fill: "var(--chart-5)" },
    ];
    const totalArea = crops.reduce((sum, c) => sum + c.area, 0);

    const mapMarkers = temperaturaData.map((reading, index) => ({
      position: [reading.coords.lat, reading.coords.lon] as [number, number],
      data: {
        temperature: reading.value,
        humidity: humidityData[index % humidityData.length]?.humidity,
        crop: crops[index % crops.length].crop,
        timestamp: reading.timestamp,
      },
    }));

    const response: DashboardData = {
      temperatureChart: {
        data: temperatureChartData,
        summary: {
          avg: Math.round(avgTemp * 100) / 100,
          min: Math.round(minTemp * 100) / 100,
          max: Math.round(maxTemp * 100) / 100,
          trend: Math.round(trend * 100) / 100,
        },
      },
      humidityChart: {
        data: humidityData,
        summary: {
          avg: Math.round(avgHumidity * 100) / 100,
          min: minHumidity,
          max: maxHumidity,
        },
      },
      cropDistribution: {
        data: crops,
        total: totalArea,
      },
      mapMarkers,
      lastUpdate: new Date().toISOString(),
    };

    return ResponseHelper.ok(response);
  });
}
