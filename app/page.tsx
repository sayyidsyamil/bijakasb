"use client";

import { Calculator } from "@/components/calculator";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import Trust from "@/components/trust";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Features/>
      <Calculator />
      <Trust />
    </main>
  );
}