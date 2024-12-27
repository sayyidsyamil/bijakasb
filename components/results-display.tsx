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
import { calculateInvestment } from "@/lib/calculations";
import { InvestmentType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface ResultsDisplayProps {
  investmentType: InvestmentType;
  asb: {
    monthlyDeposit: number;
    monthlyInvestment: any;
    principal: number;
    dividendRate: number;
    tenure: number;
    compounding: boolean;
  };
  asbf: {
    dividendRate: any;
    loanAmount: number;
    loanTenure: number;
    tenure: number;
    interestRate: number;
    compounding: boolean;
  };
}

export function ResultsDisplay({
  investmentType,
  asb,
  asbf,
}: ResultsDisplayProps) {
  // Check if the data exists for the active investment type
  const isAsb = investmentType === "asb";
  const isAsbf = investmentType === "asbf";

  // Ensure that asb or asbf data exists for the selected investment type
  const investmentParams = isAsb
    ? {
      investmentAmount: asb?.principal,
      dividendRate: asb?.dividendRate,
      tenure: asb?.tenure,
      compounding: asb?.compounding || false,
      monthlyInvestment: asb?.monthlyInvestment,
    }
    : isAsbf
      ? {
        investmentAmount: asbf?.loanAmount,
        interestRate: asbf?.interestRate,
        loanTenure: asbf?.loanTenure,
        tenure: asbf?.tenure,
        compounding: asbf?.compounding || false,
        dividendRate: asbf?.dividendRate,
        monthlyInvestment: 0,
      }
      : {
        investmentAmount: 0,
        dividendRate: 0,
        tenure: 0,
        loanTenure: asbf?.loanTenure ?? 0,
        interestRate: asbf?.interestRate ?? 0,
        compounding: false,
        monthlyInvestment: 0,
      };

  // Calculate results
  const results = calculateInvestment({
    type: investmentType,
    ...investmentParams,
    loanAmount: 0,
    principal: 0,
    loanTenure: investmentParams.loanTenure ?? 0,
    interestRate: investmentParams.interestRate ?? 0,
  });

  // Calculate the total investment for the ASB and ASBF cases
  const totalInvestment =
    investmentType === "asb"
      ? asb?.principal + asb?.monthlyDeposit * asb?.tenure * 12
      : asbf?.loanAmount || 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Investment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Total Investment</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(results.averageBalance || totalInvestment)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Total Dividends</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(results.dividend || 0)}
                </TableCell>
              </TableRow>

              {investmentType === "asbf" && (
                <TableRow>
                  <TableCell>Surrender Value</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(results.surrendervalue || 0)}
                  </TableCell>
                </TableRow>
              )}

              <TableRow>
                <TableCell>Net Profit</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(results.netProfit || 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <span className="text-sm text-gray-700">
            ASB calculates income distribution based on the average monthly minimum balance, not using standard compound interest formulas.{" "}
            <Link
              href="https://www.asnb.com.my/ASBIncomeDistribution_EN.php"
              className="text-blue-500 hover:underline"
              target="_blank"
            >
              Learn more at ASNB
            </Link>
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
