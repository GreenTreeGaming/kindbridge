import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Nonprofit from "@/models/Nonprofit";
import { connectToDatabase } from "@/lib/mongodb";

// GET: Fetch nonprofit profile for current user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const nonprofit = await Nonprofit.findOne({ userId: session.user.id });
  return NextResponse.json(nonprofit || {}, { status: 200 });
}

// PUT: Update or create nonprofit profile
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  await connectToDatabase();

  // ✅ Always include userId when creating
  const updated = await Nonprofit.findOneAndUpdate(
    { userId: session.user.id },
    { ...body, userId: session.user.id },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  return NextResponse.json(updated, { status: 200 });
}
