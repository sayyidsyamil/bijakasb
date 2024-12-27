export type InvestmentType = "asb" | "asbf" | "compare";

export interface InvestmentParams {
  type: InvestmentType;
  dividendRate: number;
  tenure: number;
  loanTenure: number;
  interestRate: number;
  compounding: boolean;
  loanAmount: number;
  principal: number;
  monthlyInvestment: number;
  investmentAmount: number,
}

export interface InvestmentResults {
  totalPrincipal: number;
  dividend: number;
  netProfit: number;
  monthlypayment: number;
  surrendervalue?: number;
  averageBalance?: number;
  monthlyPayment?: number;
  remainingBalance?: number;  
  investmentAmount?: number;

}

export interface ComparisonResult {
  asbResults: InvestmentResults;
  asbfResults: InvestmentResults;
  difference: number;
  asbfBetter: boolean;
  breakEvenRate: number;
}
