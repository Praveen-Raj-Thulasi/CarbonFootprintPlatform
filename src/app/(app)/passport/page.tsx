import PassportClient from "./PassportClient";
import { getCurrentUser } from "@/lib/auth";
import { getUserStats } from "@/lib/stats";
import { redirect } from "next/navigation";

export default async function PassportPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const stats = await getUserStats(user._id.toString());

  const userData = {
    name: user.name || "User",
    email: user.email,
    _id: user._id.toString()
  };

  return <PassportClient user={userData} stats={stats} />;
}
