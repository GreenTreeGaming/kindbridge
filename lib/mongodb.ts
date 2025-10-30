import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://karunsarvajith_db_user:yyp9KWMP5MSFmA64@cluster1.fyqcg2f.mongodb.net/?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI in .env.local");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "kindbridge", // you can name this however you like
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}