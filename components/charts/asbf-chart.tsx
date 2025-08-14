"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { type ChartConfig } from "@/components/ui/chart"

interface AsbfChartProps {
  loanAmount: number
  loanTenure: number
  interestRate: number
  dividendRate: number
}

const chartConfig = {
  loanBalance: {
    label: "Loan Balance",
    color: "hsl(var(--chart-3))",
  },
  surrenderValue: {
    label: "Surrender Value",
    color: "#ef4444", // Red color
  },
  netProfit: {
    label: "Net Profit",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AsbfChart({ loanAmount, loanTenure, interestRate, dividendRate }: AsbfChartProps) {
  // Generate yearly data for the chart
  const generateChartData = () => {
    const data = []
    
    // Calculate monthly payment
    const monthlyRate = interestRate / 100 / 12
    const totalPayments = loanTenure * 12
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1)

    let loanBalance = loanAmount
    let surrenderValue = loanAmount
    let totalDividend = 0

    for (let year = 0; year <= loanTenure; year += 0.5) {
      const months = Math.round(year * 12)
      
      if (months > loanTenure * 12) break
      
      // Calculate values for this year
      let currentLoanBalance = loanAmount
      let currentSurrenderValue = loanAmount
      let currentTotalDividend = 0
      
      // Calculate up to this point
      for (let month = 1; month <= months; month++) {
        // Calculate interest and principal for this month
        const monthlyInterest = currentLoanBalance * monthlyRate
        const monthlyPrincipal = monthlyPayment - monthlyInterest
        
        // Update loan balance
        currentLoanBalance -= monthlyPrincipal
        
        // Calculate dividend (simplified - based on surrender value)
        const monthlyDividend = (currentSurrenderValue * dividendRate / 100) / 12
        currentTotalDividend += monthlyDividend
        
        // Update surrender value (dividends stay in ASB)
        currentSurrenderValue += monthlyDividend
      }
      
      // Calculate net profit
      const netProfit = currentSurrenderValue - currentLoanBalance

      data.push({
        year: year === 0 ? "Year 0" : `Year ${year}`,
        loanBalance: Math.round(currentLoanBalance),
        surrenderValue: Math.round(currentSurrenderValue),
        netProfit: Math.round(netProfit),
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
      <h3 className="text-sm font-semibold mb-2">Performance Chart</h3>
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
            dataKey="loanBalance"
            stroke="var(--color-loanBalance)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="surrenderValue"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="netProfit"
            stroke="var(--color-netProfit)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
