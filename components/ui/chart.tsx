"use client"

import type React from "react"

import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  Tooltip,
} from "recharts"

interface ChartContainerProps {
  children: React.ReactNode
  className?: string
}

export function ChartContainer({ children, className }: ChartContainerProps) {
  return <div className={`w-full rounded-md border ${className}`}>{children}</div>
}

interface ChartTooltipContentProps {
  labelFormatter?: (value: string | number) => string
  formatter?: (value: string | number) => string[]
  className?: string
}

export function ChartTooltipContent({ labelFormatter, formatter, className }: ChartTooltipContentProps) {
  return <div className={className}>{/* Tooltip content will be dynamically rendered by Recharts */}</div>
}

export const ChartTooltip = Tooltip

export const Chart = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  )
}

export const LineChart = RechartsLineChart
export const Line = RechartsLine
export const XAxis = RechartsXAxis
export const YAxis = RechartsYAxis

