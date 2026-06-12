"use server";

import clientPromise from "@/lib/db";
import { hashPassword, comparePassword, signJWT } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const client = await clientPromise;
  const db = client.db();
  const users = db.collection("users");

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await hashPassword(password);
  
  const result = await users.insertOne({
    email,
    password: hashedPassword,
    name: name || email.split("@")[0],
    createdAt: new Date(),
  });

  const token = await signJWT({ userId: result.insertedId.toString(), email });
  
  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  redirect("/dashboard");
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const client = await clientPromise;
  const db = client.db();
  const users = db.collection("users");

  const user = await users.findOne({ email });
  if (!user) {
    return { error: "Invalid email or password" };
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    return { error: "Invalid email or password" };
  }

  const token = await signJWT({ userId: user._id.toString(), email });
  
  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  redirect("/dashboard");
}

export async function logoutUser() {
  (await cookies()).delete("session");
  redirect("/login");
}
