import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json({ orders });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const order = await Order.create(body);
  return NextResponse.json({ order }, { status: 201 });
}
