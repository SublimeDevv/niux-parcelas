"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from "lucide-react";

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
  temperature: {
    label: "Temperatura",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface Props {
  data: Array<{ date: string; temperature: number }>;
  summary: {
    avg: number;
    min: number;
    max: number;
    trend: number;
  };
}

export function ChartLineInteractive({ data, summary }: Props) {
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);

  const totalPages = Math.ceil(data.length / pageSize);
  
  const paginatedData = React.useMemo(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return data.slice(start, end).map((item, index) => ({
      ...item,
      index: start + index,
      displayDate: item.date
    }));
  }, [data, currentPage, pageSize]);

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
        <CardTitle>Temperatura de parcelas</CardTitle>
        <CardDescription>
          Monitoreo de temperatura en tiempo real
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-primary/5 border border-primary/10 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Promedio</p>
            <p className="text-2xl font-bold text-primary">{summary.avg}°C</p>
          </div>
          <div className="text-center p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Mínima</p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{summary.min}°C</p>
          </div>
          <div className="text-center p-3 bg-orange-500/5 border border-orange-500/10 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Máxima</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{summary.max}°C</p>
          </div>
        </div>

        {/* Controles de filtrado */}
        <div className="flex items-center justify-between mb-4 gap-4">
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
              onClick={() => handlePageSizeChange(data.length)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                pageSize === data.length
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              Todos
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
              {currentPage + 1} / {totalPages}
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

        <div className="text-xs text-muted-foreground mb-2">
          Mostrando lecturas {currentPage * pageSize + 1} - {Math.min((currentPage + 1) * pageSize, data.length)} de {data.length}
        </div>

        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            data={paginatedData}
            margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="index"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `#${value + 1}`}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}°C`}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Lectura #${value}`}
                  formatter={(value) => [`${Number(value).toFixed(2)}°C`, "Temperatura"]}
                />
              }
            />
            <Line
              dataKey="temperature"
              type="monotone"
              stroke="var(--color-chart-1)"
              strokeWidth={3}
              dot={{
                fill: "var(--color-chart-1)",
                stroke: "var(--color-background)",
                strokeWidth: 2,
                r: 4
              }}
              activeDot={{ 
                r: 6,
                fill: "var(--color-chart-1)",
                stroke: "var(--color-background)",
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 items-center leading-none font-medium">
          {summary.trend >= 0 ? (
            <>
              Tendencia al alza de {Math.abs(summary.trend)}%
              <TrendingUp className="h-4 w-4 text-red-500" />
            </>
          ) : (
            <>
              Tendencia a la baja de {Math.abs(summary.trend)}%
              <TrendingDown className="h-4 w-4 text-blue-500" />
            </>
          )}
        </div>
        <div className="text-muted-foreground leading-none">
          Datos recopilados de {data.length} lecturas
        </div>
      </CardFooter>
    </Card>
  );
}