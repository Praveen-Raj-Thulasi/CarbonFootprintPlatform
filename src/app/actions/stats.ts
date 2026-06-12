"use server";

import clientPromise from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export async function updateStats(simStats: {
  sustainabilityScore: number;
  carbonFootprint: number;
  monthlyTrends: number[];
  impactMetrics: { label: string; value: string; trend: "up" | "down" }[];
  twinData: { month: string; actual: number; predicted: number }[];
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const client = await clientPromise;
  const db = client.db();

  // Map simulator twinData format to dashboard-compatible format
  const dashboardTwinData = simStats.twinData.map((d) => ({
    name: d.month,
    predicted: d.predicted,
  }));

  await db.collection("dashboards").updateOne(
    { userId: new ObjectId(user._id.toString()) },
    {
      $set: {
        stats: {
          sustainabilityScore: simStats.sustainabilityScore,
          projectedIncrease: Math.round(
            ((simStats.twinData[simStats.twinData.length - 1]?.predicted ?? 0) /
              (simStats.twinData[0]?.predicted ?? 1) -
              1) *
              100
          ),
          currentFootprint: simStats.carbonFootprint,
          targetFootprint: simStats.twinData[simStats.twinData.length - 1]?.predicted ?? simStats.carbonFootprint,
          twinData: dashboardTwinData,
        },
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );

  revalidatePath("/dashboard");
}
