"use client";

import { SimpleHero } from "@/components/simple-hero";
import { SimpleCalculator } from "@/components/calculator/simple-calculator";
import { SimpleExplanation } from "@/components/simple-explanation";
import { SimpleFooter } from "@/components/simple-footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SimpleHero />
      <SimpleCalculator />
      <SimpleExplanation />
      <SimpleFooter />
    </main>
  );
}