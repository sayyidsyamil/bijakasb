"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RateInput } from "@/components/calculator/rate-input";
import { ResultsDisplay } from "@/components/results-display";
import { ComparisonView } from "@/components/calculator/comparison-view";
import { InvestmentType } from "@/lib/types";
import { Switch } from "@/components/ui/switch";

export function Calculator() {
  const [activeTab, setActiveTab] = useState<InvestmentType>("asb");

  // grouped state for asb and asbf
  const [asb, setAsb] = useState({
    principal: 0,
    monthlyInvestment: 500,
    dividendRate: 5.5,
    tenure: 1,
    compounding: true,
  });

  const [asbf, setAsbf] = useState({
    loanAmount: 100000,
    loanTenure: 30,
    interestRate: 4.5,
    dividendRate: 5.5,
    tenure: 3,
    compounding: true,
  });

  // tab change handler
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value as InvestmentType);
  }, []);

  // handlers for asb
  const handleAsbChange = useCallback(
    (key: keyof typeof asb) => (value: string | number | boolean) => {
      setAsb((prev) => ({
        ...prev,
        [key]: value === "" ? 0 : value, // allow empty string
      }));
    },
    []
  );

  const handleAsbfChange = useCallback(
    (key: keyof typeof asbf) => (value: string | number) => {
      setAsbf((prev) => ({
        ...prev,
        [key]: value === "" ? 0 : value, // allow empty string
      }));
    },
    []
  );


  return (
    <section id="calculator" className="py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Investment Calculator</h2>
        <Tabs defaultValue="asb" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="asb">ASB</TabsTrigger>
            <TabsTrigger value="asbf">ASBF</TabsTrigger>
            <TabsTrigger value="compare">Compare</TabsTrigger>
          </TabsList>
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {activeTab === "asb" && (
                    <>
                      <Label htmlFor="asb-principal">Principal Amount (RM)</Label>
                      <Input
                        id="asb-principal"
                        type="number"
                        value={asb.principal === 0 ? "" : asb.principal}
                        onChange={(e) => handleAsbChange("principal")(e.target.value)}
                        placeholder="0"
                        onBlur={() => handleAsbChange("principal")(asb.principal === 0 ? 0 : asb.principal)} // reset to 0 on blur if empty
                      />

                      <Label htmlFor="asb-monthly">Monthly Deposit (RM)</Label>
                      <Input
                        id="asb-monthly"
                        type="number"
                        value={asb.monthlyInvestment === 0 ? "" : asb.monthlyInvestment}
                        onChange={(e) => handleAsbChange("monthlyInvestment")(e.target.value)}
                        placeholder="0"
                        onBlur={() => handleAsbChange("monthlyInvestment")(asb.monthlyInvestment === 0 ? 0 : asb.monthlyInvestment)} // reset to 0 on blur if empty
                      />
                      <RateInput
                        label="Investment Period (Years)"
                        value={asb.tenure}
                        onChange={handleAsbChange("tenure")}
                        min={1}
                        max={40}
                        step={1}
                      />
                      <RateInput
                        label="Dividend Rate (%)"
                        value={asb.dividendRate}
                        onChange={handleAsbChange("dividendRate")}
                      />

                    </>
                  )}
                  {(activeTab === "asbf" || activeTab === "compare") && (
                    <>
                      <Label htmlFor="asbf-loan">Loan Amount (RM)</Label>
                      <Input
                        id="asbf-loan"
                        type="number"
                        value={asbf.loanAmount === 0 ? "" : asbf.loanAmount}
                        onChange={(e) => handleAsbfChange("loanAmount")(e.target.value)}
                        placeholder="0"
                        onBlur={() => handleAsbfChange("loanAmount")(asbf.loanAmount === 0 ? 0 : asbf.loanAmount)} // reset to 0 on blur if empty
                      />
                      <RateInput
                        label="Loan Period (Years)"
                        value={asbf.loanTenure}
                        onChange={handleAsbfChange("loanTenure")}
                        min={1}
                        max={40}
                        step={1}
                      />
                      <RateInput
                        label="Investment Period (Years)"
                        value={asbf.tenure}
                        onChange={handleAsbfChange("tenure")}
                        min={1}
                        max={40}
                        step={1}
                      />
                      <RateInput
                        label="Dividend Rate (%)"
                        value={asbf.dividendRate}
                        onChange={handleAsbfChange("dividendRate")}
                      />
                      <RateInput
                        label="Interest Rate (%)"
                        value={asbf.interestRate}
                        onChange={handleAsbfChange("interestRate")}
                      />

                    </>

                  )}
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="asb-compounding">Compounding</Label>
                    <Switch
                      id="asb-compounding"
                      checked={asb.compounding}
                      onCheckedChange={(checked) => handleAsbChange("compounding")(checked)}
                    />
                  </div>
                </div>

              </CardContent>
            </Card>
            {activeTab === "compare" ? (
              <ComparisonView
                loanAmount={asbf.loanAmount}
                loanTenure={asbf.loanTenure}
                tenure={asbf.tenure}
                interestRate={asbf.interestRate}
                dividendRate={asbf.dividendRate}
                compounding={asbf.compounding} type={"compare"} principal={0} monthlyInvestment={0} investmentAmount={0} />
            ) : (
              <ResultsDisplay
                investmentType={activeTab}
                asb={asb}
                asbf={asbf}
              />
            )}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
