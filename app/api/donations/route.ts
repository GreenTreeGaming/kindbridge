import { getServerSession } from "next-auth/next"; // ensure this path
import { authOptions } from "@/lib/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { matchNonprofitsForDonation } from "@/lib/matchNonprofits";

// GET /api/donations
export async function GET() {
  try {
    await connectToDatabase();
    const donations = await Donation.find().sort({ createdAt: -1 });
    return NextResponse.json(donations, { status: 200 });
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json({ message: "Failed to fetch donations" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, category, description, quantity, location, photoUrl } = body;

    // Find donor
    const donor = await Donation.db.model("User").findOne({ email: session.user.email });
    if (!donor)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Create donation
    const donation = await Donation.create({
      donorId: donor._id,
      title,
      category,
      description,
      quantity,
      location,
      photoUrl,
    });

    // ✅ Find matching nonprofits
    const matches = await matchNonprofitsForDonation(title, category);

    return NextResponse.json(
      { message: "Donation created successfully!", donation, matches },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating donation:", error);
    return NextResponse.json({ message: "Failed to create donation" }, { status: 500 });
  }
}