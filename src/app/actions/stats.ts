"use server";

import { z } from "zod";
import clientPromise from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

const statsSchema = z.object({
  sustainabilityScore: z.number().min(0).max(100),
  carbonFootprint: z.number().min(0),
  monthlyTrends: z.array(z.number()),
  impactMetrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
    trend: z.enum(["up", "down"]),
  })),
  twinData: z.array(z.object({
    month: z.string(),
    actual: z.number(),
    predicted: z.number(),
  })),
});

export async function updateStats(rawSimStats: unknown) {
  const parsed = statsSchema.safeParse(rawSimStats);
  if (!parsed.success) {
    throw new Error("Invalid stats data: " + parsed.error.message);
  }
  const simStats = parsed.data;

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
