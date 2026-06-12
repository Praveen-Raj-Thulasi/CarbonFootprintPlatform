import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { verifyJWT } from "./auth-utils";
import clientPromise from "./db";
import { ObjectId } from "mongodb";

export { signJWT, verifyJWT } from "./auth-utils";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function getCurrentUser() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;

  const payload = await verifyJWT(session);
  if (!payload || !payload.userId) return null;

  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection("users").findOne({ 
    _id: new ObjectId(payload.userId as string) 
  });

  return user;
}
