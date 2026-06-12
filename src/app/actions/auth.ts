"use server";

import { hashPassword, comparePassword, signJWT } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

import { UserService } from "@/services/user.service";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const parsed = authSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { error: parsed.error?.errors?.[0]?.message || "Validation failed" };
  }

  let success = false;
  try {
    const existingUser = await UserService.findByEmail(email);
    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await hashPassword(password);
    
    const userId = await UserService.createUser({
      email,
      passwordHash: hashedPassword,
      name: name || email.split("@")[0]
    });

    const token = await signJWT({ userId, email });
    
    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    
    success = true;
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "An unexpected error occurred during registration." };
  }

  if (success) {
    redirect("/dashboard");
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const parsed = authSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { error: parsed.error?.errors?.[0]?.message || "Validation failed" };
  }

  let success = false;
  try {
    const user = await UserService.findByEmail(email);
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
    
    success = true;
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred during login." };
  }

  if (success) {
    redirect("/dashboard");
  }
}

export async function logoutUser() {
  try {
    (await cookies()).delete("session");
  } catch (error) {
    console.error("Logout error:", error);
  }
  redirect("/login");
}
