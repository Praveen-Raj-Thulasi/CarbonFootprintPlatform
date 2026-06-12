import DashboardClient from "./DashboardClient";
import { getCurrentUser } from "@/lib/auth";
import { getUserStats } from "@/lib/stats";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const stats = await getUserStats(user._id.toString());

  // Cast user to plain object to avoid serialization issues
  const userData = {
    name: user.name || "User",
    email: user.email
  };

  return <DashboardClient user={userData} stats={stats} />;
}
