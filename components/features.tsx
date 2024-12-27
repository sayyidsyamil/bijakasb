import { BarChart3, RefreshCcw, LineChart } from "lucide-react";

const features = [
  {
    title: "Instant Profit Calculation",
    description: "Get real-time results as you adjust your investment parameters",
    icon: BarChart3,
  },
  {
    title: "Real-time Comparison",
    description: "Compare ASB and ASBF side by side to make informed decisions",
    icon: RefreshCcw,
  },
  {
    title: "Easy-to-Understand Insights",
    description: "Clear visualizations and explanations of your investment potential",
    icon: LineChart,
  },
];

export function Features() {
  return (
    <section className="py-12 bg-secondary/30 hidden sm:block mb-36">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-lg"
            >
              <feature.icon className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}