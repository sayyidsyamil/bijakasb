"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, Shield, Heart } from "lucide-react";

export function SimpleFooter() {
  return (
    <div className="py-12 bg-gradient-to-b from-background to-muted/30 border-t">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Calculator className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ASB vs ASBF Calculator
            </h3>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Made with <Heart className="inline h-4 w-4 text-red-500" /> for smart investors
          </p>

          <div>
            <Alert className="bg-card border">
              <Shield className="h-4 w-4 text-primary" />
              <AlertDescription className="text-muted-foreground">
                <strong>Disclaimer:</strong> This calculator is for educational purposes only. 
                Past performance doesn't guarantee future results. Consider consulting a financial advisor 
                before making investment decisions.
              </AlertDescription>
            </Alert>
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            © 2024 ASB Calculator. Made for educational purposes.
          </div>
        </div>
      </div>
    </div>
  );
}
