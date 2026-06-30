import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const query = {};
  if (category) query.category = category;
  if (featured) query.featured = true;

  const products = await Product.find(query).sort({ createdAt: -1 });
  return NextResponse.json({ products });
}

export async function POST(req) {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const body = await req.json();

  const slug = body.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const product = await Product.create({
    ...body,
    slug: `${slug}-${Date.now().toString().slice(-5)}`,
  });

  return NextResponse.json({ product }, { status: 201 });
}
