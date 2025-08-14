"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RateInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  tooltip?: string;
  variant?: "default" | "red";
}

export function RateInput({
  label,
  value,
  onChange,
  min = 1,
  max = 100,
  step = 0.1,
  tooltip,
  variant = "default",
}: RateInputProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
    }
  };

  const handleSliderChange = (values: number[]) => {
    const newValue = values[0];
    setInputValue(newValue.toString());
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Input
          type="number"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-24 ml-2"
          min={min}
          max={max}
          step={step}
        />
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={handleSliderChange}
        variant={variant}
      />
    </div>
  );
}