"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RateInput } from "@/components/calculator/rate-input";
import { SimpleComparisonView } from "@/components/calculator/simple-comparison-view";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RotateCcw, Info, PiggyBank, CreditCard, BarChart3 } from "lucide-react";
import { AsbCalculator, AsbfCalculator, calculateLoanMonthlyPayment } from "@/lib/calculations";
import { formatCurrency } from "@/lib/utils";
import { AsbChart } from "@/components/charts/asb-chart";
import { AsbfChart } from "@/components/charts/asbf-chart";
import { motion } from "framer-motion";

// Simplified animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

export function SimpleCalculator() {
  const [activeTab, setActiveTab] = useState<string>("asb");

  // ASB state
  const [asb, setAsb] = useState({
    principal: 10000,
    monthlyInvestment: 500,
    dividendRate: 5.5,
    tenure: 3,
    compounding: true,
  });

  // ASBF state
  const [asbf, setAsbf] = useState({
    loanAmount: 100000,
    loanTenure: 30,
    interestRate: 4.5,
    dividendRate: 5.5,
    tenure: 3,
    compounding: true,
  });

  // Handlers
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  const handleAsbChange = useCallback(
    (key: keyof typeof asb) => (value: string | number | boolean) => {
      setAsb((prev) => ({
        ...prev,
        [key]: value === "" ? 0 : value,
      }));
    },
    []
  );

  const handleAsbfChange = useCallback(
    (key: keyof typeof asbf) => (value: string | number) => {
      setAsbf((prev) => ({
        ...prev,
        [key]: value === "" ? 0 : value,
      }));
    },
    []
  );

  const resetData = useCallback(() => {
    setAsb({
      principal: 10000,
      monthlyInvestment: 500,
      dividendRate: 5.5,
      tenure: 3,
      compounding: true,
    });
    setAsbf({
      loanAmount: 100000,
      loanTenure: 30,
      interestRate: 4.5,
      dividendRate: 5.5,
      tenure: 3,
      compounding: true,
    });
  }, []);

  // Calculate results
  const asbResult = AsbCalculator.calculate({
    principal: asb.principal,
    monthlyInvestment: asb.monthlyInvestment,
    tenure: asb.tenure,
    dividendRate: asb.dividendRate,
    compounding: asb.compounding,
  });

  const asbfResult = AsbfCalculator.calculate({
    loanAmount: asbf.loanAmount,
    loanTenure: asbf.loanTenure,
    tenure: asbf.tenure,
    interestRate: asbf.interestRate,
    dividendRate: asbf.dividendRate,
    compounding: asbf.compounding,
  });

  const asbfMonthlyPayment = calculateLoanMonthlyPayment(asbf.loanAmount, asbf.loanTenure, asbf.interestRate);

  return (
    <section id="calculator" className="py-12">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center mb-8"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            ASB & ASBF Calculator
          </h2>
          <p className="text-muted-foreground text-lg">
            Calculate individual investments or compare them
          </p>
        </motion.div>
        
        <Tabs defaultValue="asb" className="w-full" onValueChange={handleTabChange}>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8 shadow-lg">
              <TabsTrigger value="asb" className="flex items-center gap-2">
                <PiggyBank className="h-4 w-4" />
                ASB Calculator
              </TabsTrigger>
              <TabsTrigger value="asbf" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                ASBF Calculator
              </TabsTrigger>
              <TabsTrigger value="compare" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Compare
              </TabsTrigger>
            </TabsList>
          </motion.div>
          
          <div className="max-w-6xl mx-auto">
            <TabsContent value="asb" className="space-y-6">
              <motion.div 
                className="grid gap-8 md:grid-cols-2"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                {/* ASB Settings */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <PiggyBank className="h-5 w-5" />
                      ASB Investment Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="asb-principal">Initial Amount (RM)</Label>
                      <Input
                        id="asb-principal"
                        type="number"
                        value={asb.principal === 0 ? "" : asb.principal}
                        onChange={(e) => handleAsbChange("principal")(e.target.value)}
                        placeholder="10000"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Your starting balance</p>
                    </div>

                    <div>
                      <Label htmlFor="asb-monthly">Monthly Investment (RM)</Label>
                      <Input
                        id="asb-monthly"
                        type="number"
                        value={asb.monthlyInvestment === 0 ? "" : asb.monthlyInvestment}
                        onChange={(e) => handleAsbChange("monthlyInvestment")(e.target.value)}
                        placeholder="500"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">How much you save monthly</p>
                    </div>

                    <RateInput
                      label="Investment Period (Years)"
                      value={asb.tenure}
                      onChange={handleAsbChange("tenure")}
                      min={1}
                      max={30}
                      step={1}
                    />

                    <RateInput
                      label="Dividend Rate (%)"
                      value={asb.dividendRate}
                      onChange={handleAsbChange("dividendRate")}
                    />

                    <div className="flex items-center space-x-2">
                      <Label htmlFor="asb-compounding">Compounding</Label>
                      <Switch
                        id="asb-compounding"
                        checked={asb.compounding}
                        onCheckedChange={(checked) => handleAsbChange("compounding")(checked)}
                      />
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                {/* ASB Results */}
                <Card className="border-blue-200 bg-blue-50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-blue-700">ASB Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-sm text-gray-600">Total Investment</div>
                        <div className="text-lg font-bold text-blue-700">
                          {formatCurrency(asbResult.totalPrincipal)}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-sm text-gray-600">Total Dividends</div>
                        <div className="text-lg font-bold text-blue-700">
                          {formatCurrency(asbResult.dividend)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-white rounded-lg border-2 border-blue-300">
                      <div className="text-sm text-gray-600">Final Balance</div>
                      <div className="text-2xl font-bold text-blue-700">
                        {formatCurrency(asbResult.netProfit)}
                      </div>
                    </div>

                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-sm text-gray-600">Monthly Payment</div>
                      <div className="text-lg font-bold text-blue-700">
                        RM {Number(asb.monthlyInvestment).toFixed(0)}/month
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <AsbChart
                        monthlyInvestment={asb.monthlyInvestment}
                        dividendRate={asb.dividendRate}
                        tenure={asb.tenure}
                        compounding={asb.compounding}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="asbf" className="space-y-6">
              <motion.div 
                className="grid gap-8 md:grid-cols-2"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                {/* ASBF Settings */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      <CreditCard className="h-5 w-5" />
                      ASBF Investment Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="asbf-loan">Loan Amount (RM)</Label>
                      <Input
                        id="asbf-loan"
                        type="number"
                        value={asbf.loanAmount === 0 ? "" : asbf.loanAmount}
                        onChange={(e) => handleAsbfChange("loanAmount")(e.target.value)}
                        placeholder="100000"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Total loan amount from bank</p>
                    </div>

                    <RateInput
                      label="Loan Period (Years)"
                      value={asbf.loanTenure}
                      onChange={handleAsbfChange("loanTenure")}
                      min={1}
                      max={35}
                      step={1}
                      variant="red"
                    />

                    <RateInput
                      label="Investment Period (Years)"
                      value={asbf.tenure}
                      onChange={handleAsbfChange("tenure")}
                      min={1}
                      max={30}
                      step={1}
                      variant="red"
                    />

                    <RateInput
                      label="Dividend Rate (%)"
                      value={asbf.dividendRate}
                      onChange={handleAsbfChange("dividendRate")}
                      variant="red"
                    />

                    <RateInput
                      label="Loan Interest Rate (%)"
                      value={asbf.interestRate}
                      onChange={handleAsbfChange("interestRate")}
                      variant="red"
                    />
                  </CardContent>
                </Card>

                {/* ASBF Results */}
                <Card className="border-red-200 bg-red-50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-red-700">ASBF Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-sm text-gray-600">Total Dividends</div>
                        <div className="text-lg font-bold text-red-700">
                          {formatCurrency(asbfResult.dividend)}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-sm text-gray-600">Surrender Value</div>
                        <div className="text-lg font-bold text-red-700">
                          {formatCurrency(asbfResult.surrenderValue)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-white rounded-lg border-2 border-red-300">
                      <div className="text-sm text-gray-600">Net Profit</div>
                      <div className="text-2xl font-bold text-red-700">
                        {formatCurrency(asbfResult.netProfit)}
                      </div>
                    </div>

                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-sm text-gray-600">Monthly Payment</div>
                      <div className="text-lg font-bold text-red-700">
                        RM {asbfMonthlyPayment.toFixed(0)}/month
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <AsbfChart
                        loanAmount={asbf.loanAmount}
                        loanTenure={asbf.loanTenure}
                        interestRate={asbf.interestRate}
                        dividendRate={asbf.dividendRate}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="compare" className="space-y-6">
              <motion.div 
                className="grid gap-8 md:grid-cols-2"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                {/* Comparison Settings */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Settings for Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="compare-monthly">Monthly Investment (RM)</Label>
                        <Input
                          id="compare-monthly"
                          type="number"
                          value={asb.monthlyInvestment === 0 ? "" : asb.monthlyInvestment}
                          onChange={(e) => handleAsbChange("monthlyInvestment")(e.target.value)}
                          placeholder="500"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="compare-loan">Loan Amount (RM)</Label>
                        <Input
                          id="compare-loan"
                          type="number"
                          value={asbf.loanAmount === 0 ? "" : asbf.loanAmount}
                          onChange={(e) => handleAsbfChange("loanAmount")(e.target.value)}
                          placeholder="100000"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <RateInput
                      label="Investment Period (Years)"
                      value={asb.tenure}
                      onChange={handleAsbChange("tenure")}
                      min={1}
                      max={20}
                      step={1}
                    />

                    <RateInput
                      label="Loan Period (Years)"
                      value={asbf.loanTenure}
                      onChange={handleAsbfChange("loanTenure")}
                      min={1}
                      max={35}
                      step={1}
                      variant="red"
                    />

                    <RateInput
                      label="Dividend Rate (%)"
                      value={asb.dividendRate}
                      onChange={handleAsbChange("dividendRate")}
                    />

                    <RateInput
                      label="Loan Interest Rate (%)"
                      value={asbf.interestRate}
                      onChange={handleAsbfChange("interestRate")}
                      variant="red"
                    />

                    <div className="flex items-center space-x-2">
                      <Label htmlFor="compare-compounding">Compounding</Label>
                      <Switch
                        id="compare-compounding"
                        checked={asb.compounding}
                        onCheckedChange={(checked) => handleAsbChange("compounding")(checked)}
                      />
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>

                    <Button 
                      variant="outline" 
                      onClick={resetData}
                      className="w-full"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset to Default
                    </Button>
                  </CardContent>
                </Card>

                {/* Comparison Results */}
                <div className="space-y-4">
                  <SimpleComparisonView
                    loanAmount={asbf.loanAmount}
                    loanTenure={asbf.loanTenure}
                    tenure={asb.tenure}
                    interestRate={asbf.interestRate}
                    dividendRate={asb.dividendRate}
                    compounding={asb.compounding}
                    type={"compare"}
                  />
                </div>
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
