import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";


async function getProduct(slug) {
  await connectDB();
  const product = await Product.findOne({ slug }).lean();
  if (!product) return null;
  return JSON.parse(JSON.stringify(product));
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
