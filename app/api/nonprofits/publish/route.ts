import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Nonprofit from "@/models/Nonprofit";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { publish } = await req.json();
  await connectToDatabase();

  // Try to find existing nonprofit
  let nonprofit = await Nonprofit.findOne({ userId: session.user.id });

  // ✅ If none exists, create a new one (first-time publish)
  if (!nonprofit) {
    nonprofit = await Nonprofit.create({
      userId: session.user.id,
      name: session.user.name || "My Nonprofit",
      email: session.user.email || "",
      published: publish,
      verified: false,
    });
  } else {
    // Otherwise, just update the publish status
    nonprofit.published = publish;
    await nonprofit.save();
  }

  return NextResponse.json({
    message: publish
      ? "✅ Your nonprofit has been published!"
      : "Your nonprofit has been unpublished.",
    nonprofit,
  });
}
