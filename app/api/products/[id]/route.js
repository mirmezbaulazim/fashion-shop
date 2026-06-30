import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req, { params }) {
  await connectDB();
  const product = await Product.findOne({
    $or: [{ slug: params.id }, { _id: params.id.match(/^[0-9a-f]{24}$/) ? params.id : null }],
  });
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PUT(req, { params }) {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const body = await req.json();
  const product = await Product.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  return NextResponse.json({ product });
}

export async function DELETE(req, { params }) {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
