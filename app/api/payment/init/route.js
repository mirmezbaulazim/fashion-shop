import { NextResponse } from "next/server";
import axios from "axios";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

const isLive = process.env.SSLCOMMERZ_IS_LIVE === "true";
const API_URL = isLive
  ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
  : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { items, customer, total } = body;

  const transactionId = "TXN" + Date.now();

  const order = await Order.create({
    transactionId,
    items,
    customer,
    total,
    paymentStatus: "pending",
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const payload = {
    store_id: process.env.SSLCOMMERZ_STORE_ID,
    store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,
    total_amount: total,
    currency: "BDT",
    tran_id: transactionId,
    success_url: `${baseUrl}/api/payment/success`,
    fail_url: `${baseUrl}/api/payment/fail`,
    cancel_url: `${baseUrl}/api/payment/fail`,
    cus_name: customer.name,
    cus_email: customer.email || "customer@example.com",
    cus_add1: customer.address,
    cus_city: customer.city,
    cus_phone: customer.phone,
    cus_country: "Bangladesh",
    shipping_method: "Courier",
    product_name: "Fashion Items",
    product_category: "Fashion",
    product_profile: "general",
  };

  try {
    const params = new URLSearchParams(payload).toString();
    const { data } = await axios.post(API_URL, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (data.status === "SUCCESS") {
      return NextResponse.json({ gatewayUrl: data.GatewayPageURL });
    }
    return NextResponse.json(
      { error: "Payment session failed to initiate", details: data },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "SSLCommerz request failed", details: err.message },
      { status: 500 }
    );
  }
}
