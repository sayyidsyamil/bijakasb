"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AsbCalculator, 
  AsbfCalculator, 
  ComparisonCalculator, 
  calculateLoanMonthlyPayment 
} from "@/lib/calculations";
import { InvestmentParams } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, CheckCircle, XCircle } from "lucide-react";

interface SimpleComparisonViewProps {
  loanAmount: number;
  loanTenure: number;
  tenure: number;
  interestRate: number;
  dividendRate: number;
  compounding: boolean;
  type: string;
}

export function SimpleComparisonView({
  loanAmount,
  loanTenure,
  tenure,
  interestRate,
  dividendRate,
  compounding,
  type,
}: SimpleComparisonViewProps) {
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
    <div className="space-y-6">
      {/* Simple Winner Card */}
      <Card className="border-2 border-gray-200">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl">
            {asbfBetter ? "ASBF is Better" : "ASB is Better"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {asbfBetter ? (
              <TrendingUp className="h-6 w-6 text-green-600" />
            ) : (
              <TrendingDown className="h-6 w-6 text-red-600" />
            )}
            <span className="text-2xl font-bold">
              {formatCurrency(difference)}
            </span>
          </div>
          <Badge className="text-sm">
            {percentageDifference.toFixed(1)}% difference
          </Badge>
        </CardContent>
      </Card>

      {/* Simple Comparison Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-700 text-center">ASB</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <div className="text-2xl font-bold text-blue-700">
              {formatCurrency(asbResults.netProfit)}
            </div>
            <div className="text-sm text-gray-600">Final Balance</div>
            <div className="text-xs text-gray-500">
              RM {monthlyPayment.toFixed(0)}/month
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-700 text-center">ASBF</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <div className="text-2xl font-bold text-red-700">
              {formatCurrency(asbfResults.netProfit)}
            </div>
            <div className="text-sm text-gray-600">Final Balance</div>
            <div className="text-xs text-gray-500">
              RM {asbfResults.monthlypayment.toFixed(0)}/month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Simple Recommendation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Simple Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              {asbfBetter ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
              )}
              <div>
                <p className="font-medium">
                  {asbfBetter ? "Choose ASBF" : "Choose ASB"}
                </p>
                <p className="text-sm text-gray-600">
                  {asbfBetter 
                    ? "ASBF gives you more money in the end, but requires monthly loan payments."
                    : "ASB is simpler and safer, with no loan obligations."
                  }
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Quick Tip:</strong> ASB uses your own money, ASBF uses borrowed money. 
                Higher returns usually mean higher risk.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple Alert */}
      <Alert>
        <AlertDescription className="text-sm">
          <strong>Remember:</strong> This is just a comparison tool. 
          Consider your financial situation and consult a financial advisor before making investment decisions.
        </AlertDescription>
      </Alert>
    </div>
  );
}
