import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    return NextResponse.json({ message: "✅ Connected to MongoDB", host: conn.connection.host });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    return NextResponse.json({ message: "Connection failed", error });
  }
}