"use client"

import { Card } from "@/components/ui/card"
import type { CryptoHistory } from "@/types/crypto"
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

interface CryptoPriceChartProps {
  data: CryptoHistory[]
}

export default function CryptoPriceChart({ data }: CryptoPriceChartProps) {
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
  

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price)
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
            label={{ value: "Price (USD)", angle: -90, position: "insideLeft" }}
            tickLine={false}
            axisLine={false}
            width={80}
            tickFormatter={(value) => `$${value}`}
          />
          <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 6 }} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="bg-background border border-border shadow-md"
                labelFormatter={(value) => formatDate(value as string)}
                formatter={(value) => [formatPrice(value as number), "Price"]}
              />
            }
          />
        </LineChart>
      </Chart>
    </ChartContainer>
  )
}

