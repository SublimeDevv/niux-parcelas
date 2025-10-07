export interface DashboardData {
  temperatureChart: {
    data: Array<{
      date: string;
      temperature: number;
    }>;
    summary: {
      avg: number;
      min: number;
      max: number;
      trend: number;
    };
  };
  humidityChart: {
    data: Array<{
      location: string;
      humidity: number;
    }>;
    summary: {
      avg: number;
      min: number;
      max: number;
    };
  };
  cropDistribution: {
    data: Array<{
      crop: string;
      area: number;
      fill: string;
    }>;
    total: number;
  };
  mapMarkers: Array<{
    position: [number, number];
    data: {
      temperature: number;
      humidity?: number;
      crop?: string;
      timestamp: string;
    };
  }>;
  lastUpdate: string;
}
