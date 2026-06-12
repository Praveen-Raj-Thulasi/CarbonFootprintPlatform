import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  console.warn('Invalid/Missing environment variable: "MONGODB_URI". Database connections will fail.');
}

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

async function initializeIndexes(client: MongoClient) {
  try {
    const db = client.db();
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    // Add other indexes here as needed
  } catch (error) {
    console.error("Failed to initialize database indexes:", error);
  }
}

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().then(async (c) => {
      await initializeIndexes(c);
      return c;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().then(async (c) => {
    await initializeIndexes(c);
    return c;
  });
}

export default clientPromise;
