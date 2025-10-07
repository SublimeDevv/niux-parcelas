export interface TemperatureReading {
  value: number;
  unit: string;
  timestamp: string;
  coords: {
    lat: number;
    lon: number;
  };
}
