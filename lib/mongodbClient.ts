import { MongoClient } from "mongodb";

const uri = "mongodb+srv://karunsarvajith_db_user:yyp9KWMP5MSFmA64@cluster1.fyqcg2f.mongodb.net/?retryWrites=true&w=majority";
if (!uri) throw new Error("Please add MONGODB_URI to .env.local");

const options = {};
let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;