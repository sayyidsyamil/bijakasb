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
    principal: number;
    monthlyInvestment: number;
    tenure: number;
    dividendRate: number;
    compounding: boolean;
  };
  asbf: {
    loanAmount: number;
    loanTenure: number;
    tenure: number;
    dividendRate: number;
    interestRate: number;
    compounding: boolean;
  };
}


export function ResultsDisplay({ investmentType, asb, asbf }: ResultsDisplayProps) {
  // determine active investment type and parameters
  const isAsb = investmentType === "asb";
  const isAsbf = investmentType === "asbf";

  // dynamically prepare investment parameters
  const investmentParams = isAsb
    ? { ...asb }
    : isAsbf
      ? { ...asbf }
      : null;

  if (!investmentParams) return null;

  const mergedParams = {
    loanTenure: 0,
    interestRate: 0,
    loanAmount: 0,
    principal: 0,
    monthlyInvestment: 0,
    investmentAmount: 0,
    ...investmentParams, // override defaults if values exist
  };

  // calculate investment results
  const results = calculateInvestment({
    type: investmentType,
    ...mergedParams,
  });

  // calculate total investment amount
  const totalInvestment = isAsb
    ? asb.principal + asb.monthlyInvestment * asb.tenure * 12
    : isAsbf
      ? asbf.loanAmount
      : 0;

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
                  {formatCurrency(results.totalPrincipal || totalInvestment)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Dividends</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(results.dividend || 0)}
                </TableCell>
              </TableRow>
              {isAsbf && (
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
            ASB calculates income distribution based on the average monthly
            minimum balance, not using standard compound interest formulas.{" "}
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
