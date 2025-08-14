"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AsbCalculator, AsbfCalculator, ComparisonCalculator, calculateLoanMonthlyPayment } from "@/lib/calculations";
import { InvestmentParams } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ComparisonViewProps {
  loanAmount: number;
  loanTenure: number;
  tenure: number;
  interestRate: number;
  dividendRate: number;
  compounding: boolean;
  type: string;
}

export function ComparisonView({
  loanAmount,
  loanTenure,
  tenure,
  interestRate,
  dividendRate,
  compounding,
  type,
}: ComparisonViewProps) {
  // Calculate monthly payment once
  const monthlyPayment = calculateLoanMonthlyPayment(loanAmount, loanTenure, interestRate);

  // Calculate ASB results once
  const asbResult = AsbCalculator.calculate({
    principal: 0,
    monthlyInvestment: monthlyPayment,
    tenure,
    dividendRate,
    compounding,
  });

  // Calculate ASBF results once
  const asbfResult = AsbfCalculator.calculate({
    loanAmount,
    loanTenure,
    tenure,
    interestRate,
    dividendRate,
    compounding,
  });

  // Format results for display
  const asbResults = {
    totalPrincipal: asbResult.totalPrincipal,
    dividend: asbResult.dividend,
    netProfit: asbResult.netProfit,
    monthlypayment: monthlyPayment,
  };

  const asbfResults = {
    totalPrincipal: loanAmount,
    monthlypayment: asbfResult.monthlyPayment,
    surrendervalue: asbfResult.surrenderValue,
    dividend: asbfResult.dividend,
    netProfit: asbfResult.netProfit,
  };

  // Calculate comparison once
  const comparisonParams: InvestmentParams = {
    loanAmount,
    loanTenure,
    tenure,
    interestRate,
    dividendRate,
    compounding,
    type: type as any,
    principal: 0,
    monthlyInvestment: monthlyPayment,
    investmentAmount: loanAmount,
  };

  const { difference, asbfBetter, breakEvenRate, percentageDifference } = ComparisonCalculator.calculate(
    comparisonParams,
    asbResults,
    asbfResults
  );

  return (
    <div className="space-y-6 ">
      <Card>
        <CardHeader>
          <CardTitle>Investment Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">ASB</TableHead>
                <TableHead className="text-right">ASBF</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Total Investment</TableCell>
                <TableCell className="text-right">
                  <div className="grid grid-rows-2 ">
                    {formatCurrency(asbResults.totalPrincipal)}
                    <Badge className="ml-auto w-fit">RM {monthlyPayment.toFixed(2)}/ month</Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(loanAmount)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Dividends</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(asbResults.dividend)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(asbfResults.dividend)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Surrender Value</TableCell>
                <TableCell className="text-right">-</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(asbfResults.surrendervalue)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Balance After {tenure} Year</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(asbResults.netProfit)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(asbfResults.netProfit)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Alert>
            <AlertDescription className="text-sm text-gray-700">
              {asbfBetter ? (
                <>
                  ASBF is better by {formatCurrency(difference)} ({percentageDifference.toFixed(1)}% better). ASB would need a dividend rate of{" "}
                  {breakEvenRate?.toFixed(2)}% to match ASBF returns.
                </>
              ) : (
                <>
                  ASB is better by {formatCurrency(difference)} ({percentageDifference.toFixed(1)}% better). Consider ASB if you prefer lower risk and simpler investment management.
                </>
              )}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
