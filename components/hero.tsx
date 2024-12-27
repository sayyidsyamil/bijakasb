"use client";

import { ArrowRight, Calculator as CalcIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToCalculator = () => {
    const calculator = document.getElementById("calculator");
    calculator?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 md:px-6 ">
        <div className="flex flex-col items-center gap-y-8 sm:gap-y-14 text-center">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
             Bijak ASB
            </h1>
            <p className=" mx-[5%] text-muted-foreground md:text-xl">
              Compare profits, surrender values, and find the right investment option for you
            </p>
          <Button
            size="lg"
            className="group"
            onClick={scrollToCalculator}
          >
            Start Calculating
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}