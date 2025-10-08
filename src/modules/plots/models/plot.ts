

interface coords {
  lat: number;
  lon: number;
}

export interface DataPlot {
  value: number;
  unit: string;
  timestamp: string;
  coords: coords;
}

export interface Plots {
  temperatura: DataPlot[];
}


export interface InternalPlot{
  id: string;
  temperature: number;
  unit: string;
  latitude: string;
  longitude: string;
  status: string;
  manager: string;
  createdAt: string;
}

export interface ApiPlot{

  id: string;
  temperature: number;
  unit: string;
  latitude: string;
  longitude: string;
  status: string;
  manager: string;
  createdAt: string;
  plotManagers: [
    {
      user: {
        id: string;
        name: string;
      };
    }
  ];
}