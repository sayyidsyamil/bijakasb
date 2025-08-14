"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PiggyBank, CreditCard, Info } from "lucide-react";
import { motion } from "framer-motion";

export function SimpleExplanation() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              What's the Difference?
            </h2>
            <p className="text-muted-foreground text-lg">
              Simple explanation of ASB vs ASBF
            </p>
          </motion.div>

          <motion.div 
            className="grid gap-8 md:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <PiggyBank className="h-5 w-5" />
                  ASB (Savings)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="font-medium">How it works:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• You save your own money monthly</li>
                    <li>• Get dividends every year</li>
                    <li>• No loans or debt</li>
                    <li>• Simple and safe</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Good for:</strong> People who want simple, safe savings without loans
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <CreditCard className="h-5 w-5" />
                  ASBF (Financing)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="font-medium">How it works:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bank gives you a loan</li>
                    <li>• Full amount invested immediately</li>
                    <li>• Pay monthly loan installments</li>
                    <li>• Higher potential returns</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Good for:</strong> People who want higher returns and can handle loan payments
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Simple Rule:</strong> ASB uses your own money (safer), ASBF uses borrowed money (higher returns but more risk). 
                Choose based on your comfort with loans and monthly payments.
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
