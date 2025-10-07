"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getListPlot } from "@/modules/plots/services/plotService";
import { MapPin, Thermometer, Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { ErrorLoad, SkeletonGrid } from "@/components";

export default function PlotListPage() {
    const Map = useMemo(() => dynamic(
    () => import('@/components/ui/map'),
    { 
      loading: () => <p>loading</p>,
      ssr: false
    }
  ), [])
  const [page, setPage] = useState(0);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const itemsPerPage = 9;

  const { data, error, isLoading } = useQuery({
    queryKey: ["plots", page],
    queryFn: () => getListPlot(itemsPerPage, page * itemsPerPage),
  });

  if (isLoading) return <SkeletonGrid columns={3} rows={3} gap={6} cardType="default" />

  if (error) return <ErrorLoad />

  const plots = data.data.temperatura || [];
  const hasNextPage = plots.length === itemsPerPage;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-MX', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTemperatureColor = (value) => {
    if (value < 10) return "text-chart-1 bg-chart-1/10";
    if (value < 20) return "text-chart-2 bg-chart-2/10";
    if (value < 30) return "text-chart-3 bg-chart-3/10";
    return "text-chart-4 bg-chart-4/10";
  };

  const getTemperatureBadge = (value) => {
    if (value < 10) return { label: "Frío", color: "bg-chart-1/20 text-chart-1" };
    if (value < 20) return { label: "Templado", color: "bg-chart-2/20 text-chart-2" };
    if (value < 30) return { label: "Cálido", color: "bg-chart-3/20 text-chart-3" };
    return { label: "Caliente", color: "bg-chart-4/20 text-chart-4" };
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header con paginación */}
        <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">
              Monitoreo de Temperatura
            </h1>
            <p className="text-sm text-muted-foreground">
              {plots.length} registros encontrados
            </p>
          </div>

          {/* Paginación */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-2 bg-card border border-border rounded-lg hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card transition-colors"
              title="Página anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="px-4 py-2 bg-card border border-border rounded-lg">
              <span className="text-sm font-medium text-card-foreground">
                Página {page + 1}
              </span>
            </div>

            <button
              onClick={() => setPage(p => p + 1)}
              disabled={!hasNextPage}
              className="p-2 bg-card border border-border rounded-lg hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card transition-colors"
              title="Página siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plots.map((plot, index) => {
            const tempBadge = getTemperatureBadge(plot.value);
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Contenido de la card */}
                <div className="p-5">
                  {/* Temperatura principal */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-2 rounded-lg ${getTemperatureColor(plot.value)}`}>
                          <Thermometer className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Temperatura
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-card-foreground">
                          {plot.value}
                        </span>
                        <span className="text-xl font-medium text-muted-foreground">
                          {plot.unit}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${tempBadge.color}`}>
                      {tempBadge.label}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border my-4"></div>

                  {/* Detalles */}
                  <div className="space-y-3">
                    {/* Coordenadas */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-muted-foreground mb-0.5">
                          Ubicación
                        </p>
                        <p className="text-sm text-card-foreground font-mono">
                          {plot.coords.lat.toFixed(6)}, {plot.coords.lon.toFixed(6)}
                        </p>
                      </div>
                    </div>

                    {/* Fecha */}
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-muted-foreground mb-0.5">
                          Fecha de registro
                        </p>
                        <p className="text-sm text-card-foreground">
                          {formatDate(plot.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ver en mapa */}
                  <button
                    onClick={() => setSelectedPlot(plot)}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium rounded-lg transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Ver en el mapa
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {plots.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Thermometer className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No hay registros disponibles</p>
          </div>
        )}
      </div>

      {/* Modal del mapa */}
      {selectedPlot && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPlot(null)}
        >
          <div 
            className="bg-card border border-border rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-card-foreground">
                  Ubicación de la Parcela
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Temperatura: {selectedPlot.value}{selectedPlot.unit} • {formatDate(selectedPlot.timestamp)}
                </p>
              </div>
              <button
                onClick={() => setSelectedPlot(null)}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Modal */}
            <div className="flex-1 p-5 overflow-auto">
              <div className="h-[500px] rounded-lg overflow-hidden border border-border">
                <Map
                  posix={[selectedPlot.coords.lat, selectedPlot.coords.lon]}
                  zoom={15}
                />
              </div>
              
              {/* Información */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Latitud</p>
                  <p className="text-lg font-semibold text-card-foreground font-mono">
                    {selectedPlot.coords.lat.toFixed(6)}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Longitud</p>
                  <p className="text-lg font-semibold text-card-foreground font-mono">
                    {selectedPlot.coords.lon.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}