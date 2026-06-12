import clientPromise from "./db";
import { ObjectId } from "mongodb";

export async function getUserStats(userId: string) {
  const client = await clientPromise;
  const db = client.db();
  
  // Try to fetch existing dashboard data
  const dashboard = await db.collection("dashboards").findOne({ userId: new ObjectId(userId) });
  
  if (dashboard) {
    return dashboard.stats;
  }

  // If no dashboard exists, provide starting data
  // In a real app, this would be calculated from user's inputs
  const startData = {
    sustainabilityScore: 65,
    projectedIncrease: 12,
    currentFootprint: 4.8,
    targetFootprint: 3.2,
    twinData: [
      { name: "Year 1", predicted: 480 },
      { name: "Year 2", predicted: 510 },
      { name: "Year 3", predicted: 550 },
      { name: "Year 4", predicted: 620 },
      { name: "Year 5", predicted: 720 },
    ],
    topInsight: {
      title: "Energy Use.",
      description: "Your home energy consumption is the primary driver of your twin's growth. Last month, your electric heating usage was 34% above average.",
      actionText: "Urgent Action",
      progress: 34
    },
    topRecommendation: {
      title: "The Solution.",
      description: "\"Switching to a smart thermostat and optimizing your laundry schedule could reduce your total emissions by 12% in just 30 days.\""
    }
  };

  await db.collection("dashboards").insertOne({
    userId: new ObjectId(userId),
    stats: startData,
    updatedAt: new Date()
  });

  return startData;
}

export async function getPlatformStats() {
  const client = await clientPromise;
  const db = client.db();
  
  // Example of generating dynamic platform stats based on actual DB records
  const userCount = await db.collection("users").countDocuments();
  const dashboardCount = await db.collection("dashboards").countDocuments();

  // Combine real counts with baseline values to simulate platform scale
  const baseTwins = 85000 + userCount * 12;
  const co2Reduced = 12400 + Math.floor(userCount * 4.5);
  const treesSaved = 1.2 + (userCount * 0.0001); // In Millions
  const insightsDelivered = 500 + dashboardCount * 2;

  return [
    { label: "CO₂ Reduced", value: co2Reduced.toLocaleString(), unit: "Tons" },
    { label: "Climate Twins", value: baseTwins.toLocaleString(), unit: "+" },
    { label: "Trees Saved", value: treesSaved.toFixed(1), unit: "M" },
    { label: "Insights Delivered", value: insightsDelivered.toString(), unit: "M+" },
  ];
}
