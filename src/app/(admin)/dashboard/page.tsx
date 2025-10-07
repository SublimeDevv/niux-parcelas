"use client";

import { useState } from "react";
import { ChartLineInteractive } from "@/components/ui/chart/chart-line-interactive";
import { ChartBarLabel } from "@/components/ui/chart/chart-bar-label";
import { ChartPieLabel } from "@/components/ui/chart/chart-pie-label";
import { useQuery } from "@tanstack/react-query";
import { getPlotsDataChart } from "@/modules/plots/services/plotService";
import { ErrorLoad, SkeletonGrid } from "@/components";
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { LayoutGrid, LayoutList, Columns, Grip } from "lucide-react";

export default function DashboardPage() {
   const MapDashboard = useMemo(() => dynamic(
    () => import('@/components/ui/map/MapDashboard'),
    { 
      loading: () => <p>loading</p>,
      ssr: false
    }
  ), [])
  const [layout, setLayout] = useState("default");
  const [customOrder, setCustomOrder] = useState([0, 1, 2, 3]);
  const [draggedItem, setDraggedItem] = useState(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["dataCharts"],
    queryFn: () => getPlotsDataChart(),
  });

  if (isLoading) return <SkeletonGrid gap={6} rows={3} columns={1} />;
  if (error) return <ErrorLoad />;

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const newOrder = [...customOrder];
    const draggedValue = newOrder[draggedItem];
    newOrder.splice(draggedItem, 1);
    newOrder.splice(dropIndex, 0, draggedValue);
    
    setCustomOrder(newOrder);
    setDraggedItem(null);
  };

  const charts = [
    {
      id: "temperature",
      component: (
        <ChartLineInteractive
          data={data.data.temperatureChart.data}
          summary={data.data.temperatureChart.summary}
        />
      ),
    },
    {
      id: "humidity",
      component: (
        <ChartBarLabel
          data={data.data.humidityChart.data}
          summary={data.data.humidityChart.summary}
        />
      ),
    },
    {
      id: "crops",
      component: (
        <ChartPieLabel
          data={data.data.cropDistribution.data}
          total={data.data.cropDistribution.total}
        />
      ),
    },
    {
      id: "map",
      component: (
        <div className="bg-card rounded-lg shadow-sm border p-4">
          <h2 className="text-xl font-semibold mb-4">Ubicación de parcelas</h2>
          <div className="w-full h-[700px]">
            <MapDashboard
              posix={[18.01, -92.93]}
              zoom={11}
              markers={data.data.mapMarkers}
            />
          </div>
        </div>
      ),
    },
  ];

  const renderLayout = () => {
    switch (layout) {
      case "default":
        return (
          <div className="space-y-6">
            {charts.map((chart) => (
              <div key={chart.id} className="w-full">
                {chart.component}
              </div>
            ))}
          </div>
        );

      case "grid":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">{charts[0].component}</div>
            <div className="w-full">{charts[1].component}</div>
            <div className="w-full">{charts[2].component}</div>
            <div className="w-full md:col-span-2">{charts[3].component}</div>
          </div>
        );

      case "sidebar":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="w-full">{charts[0].component}</div>
              <div className="w-full">{charts[3].component}</div>
            </div>
            <div className="space-y-6">
              <div className="w-full">{charts[1].component}</div>
              <div className="w-full">{charts[2].component}</div>
            </div>
          </div>
        );

      case "custom":
        return (
          <div className="space-y-6">
            {customOrder.map((chartIndex, index) => (
              <div
                key={charts[chartIndex].id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="w-full cursor-move border-2 border-transparent hover:border-blue-300 rounded-lg transition-colors relative group"
              >
                <div className="absolute top-2 right-2 z-10 bg-white rounded p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Grip className="w-5 h-5 text-gray-500" />
                </div>
                {charts[chartIndex].component}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-auto p-4 md:p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Dashboard de monitoreo de parcelas
        </h1>
        <p className="text-sm text-gray-500">
          Última actualización:{" "}
          {new Date(data.data.lastUpdate).toLocaleString("es-MX")}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setLayout("default")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            layout === "default"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <LayoutList className="w-4 h-4" />
          Vista Lista
        </button>

        <button
          onClick={() => setLayout("grid")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            layout === "grid"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          Vista Cuadrícula
        </button>

        <button
          onClick={() => setLayout("sidebar")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            layout === "sidebar"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Columns className="w-4 h-4" />
          Vista Lateral
        </button>

        <button
          onClick={() => setLayout("custom")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            layout === "custom"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Grip className="w-4 h-4" />
          Personalizar
        </button>
      </div>

      {layout === "custom" && (
        <div className="border rounded-lg p-4 mb-6">
          <p className="text-sm">
            <strong>Modo personalizado:</strong> Arrastra las gráficas para reordenarlas a tu gusto
          </p>
        </div>
      )}

      {renderLayout()}
    </div>
  );
}