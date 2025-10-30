import { NextResponse } from "next/server";
import { matchNonprofitsForDonation } from "@/lib/matchNonprofits";

export async function POST(req: Request) {
  try {
    const { title, category } = await req.json();
    const matches = await matchNonprofitsForDonation(title, category);
    console.log("✅ Found matches:", matches.map((m) => m.name)); // <-- add this line
    return NextResponse.json({ matches });
  } catch (error) {
    console.error("Error matching nonprofits:", error);
    return NextResponse.json({ message: "Failed to match nonprofits" }, { status: 500 });
  }
}
