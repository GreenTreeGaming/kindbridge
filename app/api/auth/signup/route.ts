import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, password, role, location, organization } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "donor",
      location,
      organization,
    });

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}