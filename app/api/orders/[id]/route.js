import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PUT(req, { params }) {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const body = await req.json();
  const order = await Order.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json({ order });
}
