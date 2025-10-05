interface coords {
  lat: number;
  lon: number;
}

interface DataPlot {
  value: number;
  unit: string;
  timestamp: string;
  coords: coords;
}

export interface Plots {
  temperatura: DataPlot[];
}
