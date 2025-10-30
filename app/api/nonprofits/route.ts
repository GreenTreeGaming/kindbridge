import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Nonprofit from "@/models/Nonprofit";

/**
 * GET /api/nonprofits
 * Returns all verified nonprofits (and optionally user-created ones later)
 */
export async function GET() {
  try {
    await connectToDatabase();

    const nonprofits = await Nonprofit.find({ verified: true }).sort({
      createdAt: -1,
    });

    return NextResponse.json(nonprofits, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching nonprofits:", error);
    return NextResponse.json(
      { message: "Failed to fetch nonprofits" },
      { status: 500 }
    );
  }
}