import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.DB_NAME!;

if (!uri) {
  throw new Error("Connection string is not defined");
}

let client: MongoClient;

async function getMongoClientInstance(): Promise<MongoClient> {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

export async function getDb() {
  const client = await getMongoClientInstance();
  return client.db(dbName);
}

export async function closeMongoClient() {
  if (client) {
    await client.close();
    client = null as unknown as MongoClient;
  }
}
