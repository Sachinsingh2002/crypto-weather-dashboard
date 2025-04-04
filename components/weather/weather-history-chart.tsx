"use client"

import { Card } from "@/components/ui/card"

import type { WeatherHistory } from "@/types/weather"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

interface WeatherHistoryChartProps {
  data: WeatherHistory[]
}

export default function WeatherHistoryChart({ data }: WeatherHistoryChartProps) {
  if (data.length === 0) {
    return (
      <Card className="flex items-center justify-center h-[300px]">
        <p className="text-muted-foreground">No historical data available</p>
      </Card>
    )
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <ChartContainer className="h-[300px]">
      <Chart>
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tickLine={false}
            axisLine={false}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            label={{ value: "Temperature (°C)", angle: -90, position: "insideLeft" }}
            tickLine={false}
            axisLine={false}
            width={80}
          />
          <Line type="monotone" dataKey="temp" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 6 }} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="bg-background border border-border shadow-md"
                labelFormatter={(value) => formatDate(value as string)}
                formatter={(value) => [`${value}°C`, "Temperature"]}
              />
            }
          />
        </LineChart>
      </Chart>
    </ChartContainer>
  )
}

