import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export class UserService {
  private static async getCollection() {
    const client = await clientPromise;
    return client.db().collection("users");
  }

  static async findByEmail(email: string) {
    const users = await this.getCollection();
    return await users.findOne({ email });
  }

  static async findById(id: string) {
    const users = await this.getCollection();
    return await users.findOne({ _id: new ObjectId(id) });
  }

  static async createUser(data: { email: string; passwordHash: string; name: string }) {
    const users = await this.getCollection();
    const result = await users.insertOne({
      email: data.email,
      password: data.passwordHash,
      name: data.name,
      createdAt: new Date(),
    });
    return result.insertedId.toString();
  }
}
