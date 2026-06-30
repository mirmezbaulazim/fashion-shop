import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";


async function getFeatured() {
  await connectDB();
  const products = await Product.find({ featured: true }).limit(8).lean();
  return JSON.parse(JSON.stringify(products));
}

async function getLatest() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).limit(8).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function HomePage() {
  const featured = await getFeatured();
  const latest = featured.length ? [] : await getLatest();
  const showProducts = featured.length ? featured : latest;

  return (
    <div>
      <section className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            নতুন ফ্যাশন কালেকশন
          </h1>
          <p className="text-gray-300 mb-6">
            সর্বনিম্ন দামে সেরা মানের পোশাক — অর্ডার করুন এখনই
          </p>
          <Link href="/products" className="btn-primary inline-block bg-white text-black">
            শপিং শুরু করুন
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold mb-6">ফিচার্ড প্রডাক্ট</h2>
        {showProducts.length === 0 ? (
          <p className="text-gray-500">
            এখনো কোনো প্রডাক্ট যুক্ত করা হয়নি। এডমিন প্যানেল থেকে প্রডাক্ট যুক্ত করুন।
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {showProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
