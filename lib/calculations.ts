import { InvestmentParams, InvestmentResults, ComparisonResult } from "./types";

// helper function to calculate yearly balance with compounding
export function calculateAsbDividend(principal: number, monthlyInvestment: number, tenure: number, dividendRate: number, compounding: boolean): { totalPrincipal: number, dividend: number, netProfit: number, monthlypayment: number } {

  principal = Number(principal);
  monthlyInvestment = Number(monthlyInvestment);
  let totalPrincipal = principal;
  let totalAmount = principal;
  let dividend = 0;
  let months = tenure * 12;
  dividendRate /=100;

  for (let month = 1; month <= months; month++) {
    // add the monthly deposit
    totalPrincipal += monthlyInvestment;
    totalAmount += monthlyInvestment;


    // apply compound interest every 12 months if compound is true
    if (compounding && month % 12 === 0) {
      let yearlyDividend = totalAmount * dividendRate;
      dividend += yearlyDividend;
      totalAmount += yearlyDividend;
    }

    // apply simple interest every 12 months if compound is false
    if (!compounding && month % 12 === 0) {
      let yearlyDividend = totalPrincipal * dividendRate;
      dividend += yearlyDividend;
    }
  }

  return {
    totalPrincipal: totalPrincipal,
    dividend: dividend,
    netProfit: totalPrincipal + dividend,
    monthlypayment: 0,
  };
}



export function calculateAsbfDividend(loanAmount: number, loanTenure: number, tenure: number, interestRate: number, dividendRate: number, compounding: boolean): { monthlypayment: number, dividend: number, surrendervalue: number, netProfit: number } {

  const totalPayments = loanTenure * 12;
  interestRate = interestRate / 100;
  dividendRate = dividendRate / 100;

  // Calculate monthly payment for the loan
  const monthlyPayment = (loanAmount * (interestRate / 12) * Math.pow(1 + interestRate / 12, totalPayments)) / (Math.pow(1 + interestRate / 12, totalPayments) - 1);
  const paymentsMade = tenure * 12;

  // Adjust investment amount based on compounding
  const remainingBalance = loanAmount * Math.pow(1 + interestRate / 12, paymentsMade) -
    monthlyPayment * (Math.pow(1 + interestRate / 12, paymentsMade) - 1) / (interestRate / 12);


  const totalDividends = (loanAmount * dividendRate * tenure);
  const surrenderValue = loanAmount - remainingBalance;


  return {
    monthlypayment: monthlyPayment,
    dividend: totalDividends,
    surrendervalue: surrenderValue,
    netProfit: totalDividends + surrenderValue,
  };
}

export function calculateLoanMonthlyPayment(loanAmount: number, loanTenure: number, interestRate: number): number {
  interestRate = interestRate / 100;
  const totalPayments = loanTenure * 12;
  return (loanAmount * (interestRate / 12) * Math.pow(1 + interestRate / 12, totalPayments)) / (Math.pow(1 + interestRate / 12, totalPayments) - 1);
}

export function calculateInvestment(params: InvestmentParams): InvestmentResults {
  const {
    type,
    dividendRate,
    principal,
    tenure,
    loanTenure,
    interestRate,
    compounding,
    monthlyInvestment,
  } = params;

  console.log("params", params);

  if (type === "asb") {
    const result = calculateAsbDividend(params.principal, params.monthlyInvestment, params.tenure, params.dividendRate, params.compounding);
    const averageBalance = result.totalPrincipal;
    const totalDividends = result.dividend;
    const netProfit = totalDividends + averageBalance;

    console.log("info",averageBalance,totalDividends, netProfit )
    return {
      totalPrincipal: averageBalance,
      dividend: totalDividends,
      netProfit,
      monthlypayment: 0, // Add default value for monthlypayment
    };
  } else if (type === "asbf") {
    const result = calculateAsbfDividend(params.loanAmount, params.loanTenure, params.tenure, params.interestRate, params.dividendRate, params.compounding);
    const monthlyPayment = result.monthlypayment;
    const totalDividends = result.dividend;
    const surrendervalue = result.surrendervalue;
    const netProfit = totalDividends + surrendervalue;

    return {
      totalPrincipal: 0,
      monthlypayment: monthlyPayment,
      dividend: totalDividends,
      surrendervalue,
      netProfit,
    };
  }

  return {
    totalPrincipal: 0,
    dividend: 0,
    netProfit: 0,
    monthlypayment: 0,
  };
}



export function compareInvestments(
  params: InvestmentParams,
  asbResults: InvestmentResults,
  asbfResults: InvestmentResults
): { difference: number; asbfBetter: boolean; breakEvenRate: number } {
  const asbfBetter = asbfResults.netProfit > asbResults.netProfit;
  const difference = Math.abs(asbfResults.netProfit - asbResults.netProfit);

  console.log(asbResults.totalPrincipal)

  // calculate breakeven rate
  const breakevenRate =
    asbResults.totalPrincipal > 0
      ? (asbfResults.netProfit - asbResults.totalPrincipal) /
      asbResults.totalPrincipal
      : 0.;

  return {
    difference,
    asbfBetter,
    breakEvenRate: breakevenRate * 100, // convert to percentage
  };
}


