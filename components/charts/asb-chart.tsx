"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { type ChartConfig } from "@/components/ui/chart"

interface AsbChartProps {
  monthlyInvestment: number
  dividendRate: number
  tenure: number
  compounding: boolean
}

const chartConfig = {
  balance: {
    label: "Balance",
    color: "hsl(var(--chart-1))",
  },
  dividend: {
    label: "Dividend",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AsbChart({ monthlyInvestment, dividendRate, tenure, compounding }: AsbChartProps) {
  // Generate yearly data for the chart
  const generateChartData = () => {
    const data = []
    let balance = 0
    let totalDividend = 0

    for (let year = 0; year <= tenure; year += 0.5) {
      const months = Math.round(year * 12)
      
      if (months > tenure * 12) break
      
      // Calculate values for this year
      let currentBalance = 0
      let currentTotalDividend = 0
      
      // Calculate up to this point
      for (let month = 1; month <= months; month++) {
        // Add monthly investment
        currentBalance += monthlyInvestment
        
        // Calculate dividend (simplified - in reality it's based on MAB)
        const monthlyDividend = (currentBalance * dividendRate / 100) / 12
        currentTotalDividend += monthlyDividend
        
        if (compounding) {
          currentBalance += monthlyDividend
        }
      }

      data.push({
        year: year === 0 ? "Year 0" : `Year ${year}`,
        balance: Math.round(currentBalance),
        dividend: Math.round(currentTotalDividend),
      })
    }

    return data
  }

  const chartData = generateChartData()

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No data to display
      </div>
    )
  }

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold mb-2">Growth Chart</h3>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="year"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => `RM ${(value / 1000).toFixed(0)}k`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="var(--color-balance)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="dividend"
            stroke="var(--color-dividend)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
