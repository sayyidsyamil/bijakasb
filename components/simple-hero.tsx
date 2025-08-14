"use client";

import { ArrowDown, Calculator, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function SimpleHero() {
  const scrollToCalculator = () => {
    const calculator = document.getElementById("calculator");
    calculator?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg opacity-5"></div>
      
      <div className="container px-4 md:px-6 relative">
        <motion.div 
          className="flex flex-col items-center gap-y-8 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Smart Investment Calculator</span>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ASB vs ASBF Calculator
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Simple comparison tool to help you decide between ASB savings and ASBF financing. 
            See which option gives you better returns with our advanced calculator.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={scrollToCalculator}
              className="text-lg px-8 py-6 shadow-glow hover:shadow-glow-purple transition-all duration-300"
            >
              Start Comparing
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full">
            <div className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-2xl font-bold text-primary mb-2">Simple</div>
              <p className="text-muted-foreground">Easy to use, no complex calculations</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-2xl font-bold text-primary mb-2">Clear</div>
              <p className="text-muted-foreground">See which option is better at a glance</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-2xl font-bold text-primary mb-2">Fast</div>
              <p className="text-muted-foreground">Get results instantly</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
