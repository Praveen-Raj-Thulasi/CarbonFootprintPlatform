import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Leaf, ArrowLeft, Car, Utensils, ShoppingBag, Zap, Lightbulb, TrendingDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const validCategories = ["transportation", "nutrition", "shopping", "lifestyle"];

const categoryData: Record<string, {
  icon: any;
  color: string;
  bgColor: string;
  stats: { label: string; value: string }[];
  insights: { title: string; desc: string }[];
}> = {
  transportation: {
    icon: Car,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    stats: [
      { label: "Global Avg Emission", value: "4.6t CO₂/yr" },
      { label: "EV Potential Savings", value: "3.2t CO₂/yr" }
    ],
    insights: [
      { title: "Daily Commute", desc: "Switching to public transit or carpooling can reduce your commuting footprint by up to 45%." },
      { title: "Air Travel", desc: "A single long-haul flight can produce more carbon emissions than an average person in dozens of countries produces in a whole year." }
    ]
  },
  nutrition: {
    icon: Utensils,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    stats: [
      { label: "Meat-heavy Diet", value: "3.3t CO₂/yr" },
      { label: "Plant-based Diet", value: "1.5t CO₂/yr" }
    ],
    insights: [
      { title: "Food Choices", desc: "Reducing red meat consumption is one of the most effective ways to lower your dietary carbon footprint." },
      { title: "Food Waste", desc: "About one-third of all food produced for human consumption is lost or wasted globally, contributing heavily to greenhouse gas emissions." }
    ]
  },
  shopping: {
    icon: ShoppingBag,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    stats: [
      { label: "Fast Fashion Impact", value: "10% Global Emissions" },
      { label: "Recycling Benefit", value: "30% Energy Saved" }
    ],
    insights: [
      { title: "Sustainable Fashion", desc: "Buying fewer, high-quality items and supporting second-hand markets significantly cuts down textile waste." },
      { title: "Conscious Consumption", desc: "Opting for products with minimal packaging and longer lifespans reduces both manufacturing and disposal emissions." }
    ]
  },
  lifestyle: {
    icon: Zap,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    stats: [
      { label: "Home Energy Avg", value: "5.1t CO₂/yr" },
      { label: "Renewable Switch", value: "2.4t CO₂/yr saved" }
    ],
    insights: [
      { title: "Energy Efficiency", desc: "Upgrading to LED lighting and smart thermostats can reduce home energy consumption by up to 20%." },
      { title: "Water Usage", desc: "Heating water is incredibly energy-intensive. Shorter showers and cold-water laundry loads make a surprisingly large impact." }
    ]
  }
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = resolvedParams.category.toLowerCase();
  
  if (!validCategories.includes(category)) {
    notFound();
  }

  const title = category.charAt(0).toUpperCase() + category.slice(1);
  const data = categoryData[category];
  const Icon = data.icon;

  return (
    <div className="space-y-12 pb-32 pt-8">
      <Link href="/dashboard">
        <Button variant="ghost" className="mb-8 font-bold text-[#86868B] hover:text-black">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Dashboard
        </Button>
      </Link>
      
      <div className="text-center mb-16">
        <div className={`w-24 h-24 mx-auto rounded-[2.5rem] ${data.bgColor} flex items-center justify-center mb-8`}>
          <Icon className={`${data.color} w-12 h-12`} />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-[#1D1D1F] tracking-tight mb-6">{title} Impact.</h1>
        <p className="text-xl text-[#86868B] max-w-2xl mx-auto font-medium leading-relaxed">
          Deep dive into your {category} emissions and explore tailored recommendations to reduce your footprint.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {data.stats.map((stat, i) => (
          <Card key={i} className="p-10 rounded-[3rem] bg-white border-none shadow-xl shadow-black/5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#86868B] uppercase tracking-widest mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold tracking-tight text-[#1D1D1F]">{stat.value}</h3>
            </div>
            <TrendingDown className={`w-8 h-8 ${data.color}`} />
          </Card>
        ))}
      </div>

      <div className="space-y-8">
        <h3 className="text-2xl font-bold tracking-tight text-[#1D1D1F] px-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.insights.map((insight, i) => (
            <Card key={i} className="p-10 rounded-[2.5rem] bg-[#F5F5F7] border-none shadow-none flex flex-col gap-4">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <h4 className="text-xl font-bold text-[#1D1D1F]">{insight.title}</h4>
              <p className="text-[#86868B] leading-relaxed font-medium">
                {insight.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link href="/simulator">
          <Button className="h-16 px-10 bg-black text-white hover:bg-zinc-800 font-bold rounded-2xl text-lg">
            Simulate Changes
          </Button>
        </Link>
      </div>
    </div>
  );
}
