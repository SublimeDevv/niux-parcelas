"use client";

import { Pie, PieChart, Cell, Legend } from "recharts";

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

interface Props {
  data: Array<{ crop: string; area: number; fill: string }>;
  total: number;
}

export function ChartPieLabel({ data, total }: Props) {
  const chartConfig: ChartConfig = data.reduce((acc, item, index) => {
    acc[item.crop.toLowerCase()] = {
      label: item.crop,
      color: `var(--chart-${index + 1})`,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribución de Cultivos</CardTitle>
        <CardDescription>Área cultivada por tipo de cultivo</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">Área Total</p>
          <p className="text-3xl font-bold text-green-600">{total} ha</p>
        </div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `${value} ha (${(((value as number) / total) * 100).toFixed(
                      1
                    )}%)`,
                    name,
                  ]}
                />
              }
            />
            <Pie
              data={data}
              dataKey="area"
              nameKey="crop"
              cx="50%"
              cy="50%"
              label={({ crop, area }) => `${crop}: ${area}ha`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pt-4">
        <div className="text-muted-foreground leading-none text-center">
          Distribución actual de cultivos en {data.length} categorías
        </div>
      </CardFooter>
    </Card>
  );
}
