import { InvestmentParams, InvestmentResults } from "./types";

// Utility functions
const convertToDecimal = (percentage: number): number => percentage / 100;

// Loan calculation utilities
export function calculateLoanMonthlyPayment(loanAmount: number, loanTenure: number, interestRate: number): number {
  const monthlyRate = convertToDecimal(interestRate) / 12;
  const totalPayments = loanTenure * 12;
  
  if (monthlyRate === 0) return loanAmount / totalPayments;
  
  return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
         (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

export function calculateRemainingLoanBalance(
  loanAmount: number, 
  monthlyPayment: number, 
  interestRate: number, 
  paymentsMade: number
): number {
  const monthlyRate = convertToDecimal(interestRate) / 12;
  
  if (monthlyRate === 0) return loanAmount - (monthlyPayment * paymentsMade);
  
  return loanAmount * Math.pow(1 + monthlyRate, paymentsMade) -
         monthlyPayment * (Math.pow(1 + monthlyRate, paymentsMade) - 1) / monthlyRate;
}

// ASB calculation module
export class AsbCalculator {
  static calculate(params: {
    principal: number;
    monthlyInvestment: number;
    tenure: number;
    dividendRate: number;
    compounding: boolean;
  }): { totalPrincipal: number; dividend: number; netProfit: number; monthlyPayment: number } {
    const { principal, monthlyInvestment, tenure, dividendRate, compounding } = params;
    
    const totalPrincipal = Number(principal);
    const monthlyDeposit = Number(monthlyInvestment);
    const months = tenure * 12;
    const annualDividendRate = convertToDecimal(dividendRate);
    
    let runningBalance = totalPrincipal;
    let totalDividend = 0;

    for (let month = 1; month <= months; month++) {
      // Add monthly deposit
      runningBalance += monthlyDeposit;
      
      // Apply dividend annually
      if (month % 12 === 0) {
        const dividendBase = compounding ? runningBalance : (totalPrincipal + (monthlyDeposit * month));
        const yearlyDividend = dividendBase * annualDividendRate;
        totalDividend += yearlyDividend;
        
        if (compounding) {
          runningBalance += yearlyDividend;
        }
      }
    }
    
    const finalPrincipal = totalPrincipal + (monthlyDeposit * months);

    return {
      totalPrincipal: finalPrincipal,
      dividend: totalDividend,
      netProfit: finalPrincipal + totalDividend,
      monthlyPayment: 0,
    };
  }
}

// ASBF calculation module
export class AsbfCalculator {
  static calculate(params: {
    loanAmount: number;
    loanTenure: number;
    tenure: number;
    interestRate: number;
    dividendRate: number;
    compounding: boolean;
  }): { monthlyPayment: number; dividend: number; surrenderValue: number; netProfit: number } {
    const { loanAmount, loanTenure, tenure, interestRate, dividendRate } = params;
    
    const monthlyPayment = calculateLoanMonthlyPayment(loanAmount, loanTenure, interestRate);
    const paymentsMade = tenure * 12;
    const remainingBalance = calculateRemainingLoanBalance(loanAmount, monthlyPayment, interestRate, paymentsMade);
    
    const totalDividends = loanAmount * convertToDecimal(dividendRate) * tenure;
    const surrenderValue = loanAmount - remainingBalance;

    return {
      monthlyPayment,
      dividend: totalDividends,
      surrenderValue,
      netProfit: totalDividends + surrenderValue,
    };
  }
}

// Main investment calculation orchestrator
export function calculateInvestment(params: InvestmentParams): InvestmentResults {
  const { type } = params;
  
  switch (type) {
    case "asb":
      const asbResult = AsbCalculator.calculate({
        principal: params.principal,
        monthlyInvestment: params.monthlyInvestment,
        tenure: params.tenure,
        dividendRate: params.dividendRate,
        compounding: params.compounding,
      });

      return {
        totalPrincipal: asbResult.totalPrincipal,
        dividend: asbResult.dividend,
        netProfit: asbResult.netProfit,
        monthlypayment: asbResult.monthlyPayment,
      };
      
    case "asbf":
      const asbfResult = AsbfCalculator.calculate({
        loanAmount: params.loanAmount,
        loanTenure: params.loanTenure,
        tenure: params.tenure,
        interestRate: params.interestRate,
        dividendRate: params.dividendRate,
        compounding: params.compounding,
      });

      return {
        totalPrincipal: 0,
        dividend: asbfResult.dividend,
        surrendervalue: asbfResult.surrenderValue,
        netProfit: asbfResult.netProfit,
        monthlypayment: asbfResult.monthlyPayment,
      };
      
    default:
      return {
        totalPrincipal: 0,
        dividend: 0,
        netProfit: 0,
        monthlypayment: 0,
      };
  }
}

// Comparison calculation module
export class ComparisonCalculator {
  static calculate(
    params: InvestmentParams,
    asbResults: InvestmentResults,
    asbfResults: InvestmentResults
  ): { difference: number; asbfBetter: boolean; breakEvenRate: number; percentageDifference: number } {
    const asbfBetter = asbfResults.netProfit > asbResults.netProfit;
    const difference = Math.abs(asbfResults.netProfit - asbResults.netProfit);

    // Calculate percentage difference
    const percentageDifference = asbResults.netProfit > 0 
      ? ((asbfResults.netProfit - asbResults.netProfit) / asbResults.netProfit) * 100
      : 0;
    
    // Calculate breakeven rate using binary search
    const breakEvenRate = this.calculateBreakEvenRate(params, asbfResults.netProfit);

    return {
      difference,
      asbfBetter,
      breakEvenRate,
      percentageDifference: Math.abs(percentageDifference),
    };
  }
  
  private static calculateBreakEvenRate(params: InvestmentParams, targetNetProfit: number): number {
    if (params.tenure <= 0) return 0;
    
    let low = 0;
    let high = 100;
    const tolerance = 0.01;
    
    while (high - low > tolerance) {
      const mid = (low + high) / 2;
      
      const testResult = AsbCalculator.calculate({
        principal: params.principal,
        monthlyInvestment: params.monthlyInvestment,
        tenure: params.tenure,
        dividendRate: mid,
        compounding: params.compounding,
      });
      
      const testNetProfit = testResult.netProfit;
      
      if (Math.abs(testNetProfit - targetNetProfit) < 1) {
        return mid;
      } else if (testNetProfit < targetNetProfit) {
        low = mid;
      } else {
        high = mid;
      }
    }
    
    return (low + high) / 2;
  }
}


