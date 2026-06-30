import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  await connectDB();
  const formData = await req.formData();
  const tranId = formData.get("tran_id");

  if (tranId) {
    await Order.findOneAndUpdate(
      { transactionId: tranId },
      { paymentStatus: "failed" }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return NextResponse.redirect(`${baseUrl}/checkout?failed=1`, 303);
}

export async function GET(req) {
  return POST(req);
}
