"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronLeft, ChevronRight, Droplets } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  humidity: {
    label: "Humedad",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface Props {
  data: Array<{ location: string; humidity: number }>;
  summary: {
    avg: number;
    min: number;
    max: number;
  };
}

export function ChartBarLabel({ data, summary }: Props) {
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [humidityFilter, setHumidityFilter] = React.useState<"all" | "low" | "medium" | "high">("all");

  const filteredData = React.useMemo(() => {
    let filtered = [...data];

    if (humidityFilter === "low") {
      filtered = filtered.filter(d => d.humidity < 50);
    } else if (humidityFilter === "medium") {
      filtered = filtered.filter(d => d.humidity >= 50 && d.humidity < 70);
    } else if (humidityFilter === "high") {
      filtered = filtered.filter(d => d.humidity >= 70);
    }

    return filtered;
  }, [data, humidityFilter]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = React.useMemo(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, pageSize]);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Humedad por Parcela</CardTitle>
        <CardDescription>
          Niveles de humedad relativa en diferentes ubicaciones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-primary/5 border border-primary/10 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Promedio</p>
            <p className="text-2xl font-bold text-primary">{summary.avg}%</p>
          </div>
          <div className="text-center p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Mínima</p>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{summary.min}%</p>
          </div>
          <div className="text-center p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Máxima</p>
            <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{summary.max}%</p>
          </div>
        </div>

        {/* Controles de filtrado */}
        <div className="mb-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              Filtrar por Nivel de Humedad
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => {
                  setHumidityFilter("all");
                  setCurrentPage(0);
                }}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  humidityFilter === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => {
                  setHumidityFilter("low");
                  setCurrentPage(0);
                }}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  humidityFilter === "low"
                    ? "bg-amber-500 text-white"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                Baja (&lt;50%)
              </button>
              <button
                onClick={() => {
                  setHumidityFilter("medium");
                  setCurrentPage(0);
                }}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  humidityFilter === "medium"
                    ? "bg-green-500 text-white"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                Media (50-70%)
              </button>
              <button
                onClick={() => {
                  setHumidityFilter("high");
                  setCurrentPage(0);
                }}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  humidityFilter === "high"
                    ? "bg-cyan-500 text-white"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                Alta (≥70%)
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2 border-t border-border">
            <div className="flex gap-2">
              <button
                onClick={() => handlePageSizeChange(10)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  pageSize === 10
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                10
              </button>
              <button
                onClick={() => handlePageSizeChange(25)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  pageSize === 25
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                25
              </button>
              <button
                onClick={() => handlePageSizeChange(50)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  pageSize === 50
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                50
              </button>
              <button
                onClick={() => handlePageSizeChange(filteredData.length)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  pageSize === filteredData.length
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                Todas
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className="p-1.5 rounded-md bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-muted-foreground min-w-[100px] text-center">
                {totalPages > 0 ? `${currentPage + 1} / ${totalPages}` : "0 / 0"}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage >= totalPages - 1}
                className="p-1.5 rounded-md bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            Mostrando {paginatedData.length > 0 ? currentPage * pageSize + 1 : 0} - {Math.min((currentPage + 1) * pageSize, filteredData.length)} de {filteredData.length} parcelas
            {filteredData.length !== data.length && (
              <span className="ml-1">({data.length} total)</span>
            )}
          </div>
        </div>

        <ChartContainer config={chartConfig}>
          <BarChart
            data={paginatedData}
            margin={{ top: 20, right: 12, left: 12, bottom: 12 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="location"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => [`${value}%`, "Humedad"]}
                />
              }
            />
            <Bar dataKey="humidity" fill="var(--color-chart-2)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => `${value}%`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Mediciones de {data.length} parcelas monitoreadas
        </div>
      </CardFooter>
    </Card>
  );
}