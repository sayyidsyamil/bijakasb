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
import { compareInvestments, calculateLoanMonthlyPayment, calculateAsbDividend,calculateAsbfDividend } from "@/lib/calculations";
import { InvestmentParams } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ComparisonViewProps extends InvestmentParams {}

export function ComparisonView({
  loanAmount,
  loanTenure,
  tenure,
  interestRate,
  dividendRate,
  compounding,
  type,
}: ComparisonViewProps) {

  const monthlyPayment = calculateLoanMonthlyPayment(loanAmount, loanTenure, interestRate);

  const asbResults = {
    totalPrincipal: calculateAsbDividend({ principal: 0, monthlyInvestment: monthlyPayment, tenure, dividendRate, compounding }).totalPrincipal,
    dividend: calculateAsbDividend({ principal: 0, monthlyInvestment: monthlyPayment, tenure, dividendRate, compounding }).dividend,
    netProfit: calculateAsbDividend({ principal: 0, monthlyInvestment: monthlyPayment, tenure, dividendRate, compounding }).netProfit, // or any appropriate value
    monthlypayment: monthlyPayment,
  };
  const asbfResults = {
    totalPrincipal: loanAmount,
    monthlypayment: calculateAsbfDividend({ loanAmount, loanTenure, tenure, interestRate, dividendRate, compounding }).monthlypayment,
    surrendervalue: calculateAsbfDividend({ loanAmount, loanTenure, tenure, interestRate, dividendRate, compounding }).surrendervalue,
    dividend: calculateAsbfDividend({ loanAmount, loanTenure, tenure, interestRate, dividendRate, compounding }).dividend,
    netProfit: calculateAsbfDividend({ loanAmount, loanTenure, tenure, interestRate, dividendRate, compounding }).netProfit, // or any appropriate value
  };

  const {difference, asbfBetter, breakEvenRate }  = compareInvestments({
    loanAmount, loanTenure, tenure, interestRate, dividendRate, compounding, type,
    principal: 0, // or any appropriate value
    monthlyInvestment: monthlyPayment,
    investmentAmount: loanAmount
  }, asbResults, asbfResults);


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
                  {formatCurrency(asbResults?.totalPrincipal ?? 0)}
                  <Badge className="ml-auto w-fit">RM {monthlyPayment.toFixed(2)}/ month</Badge>
                  </div>
             
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(loanAmount ?? 0)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Dividends</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(asbResults?.dividend ?? 0)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(asbfResults?.dividend ?? 0)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Surrender Value</TableCell>
                <TableCell className="text-right">-</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(asbfResults?.surrendervalue ?? 0)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Balance After {tenure} Year</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(asbResults?.netProfit ?? 0)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(asbfResults?.netProfit ?? 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Alert>
            <AlertDescription className="text-sm text-gray-700">
              {asbfBetter ? (
                <>
                  ASBF is better by {formatCurrency(difference)}. ASB would need a dividend rate of{" "}
                  {breakEvenRate?.toFixed(2)}% to match ASBF returns.
                </>
              ) : (
                <>
                  ASB is better by {formatCurrency(difference)}. Consider ASB if you prefer lower risk and simpler investment management.
                </>
              )}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
