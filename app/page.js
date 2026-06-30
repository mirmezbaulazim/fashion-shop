import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";

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

const heroImages = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
];

export default async function HomePage() {
  const featured = await getFeatured();
  const latest = featured.length ? [] : await getLatest();
  const showProducts = featured.length ? featured : latest;

  return (
    <div>
      {/* Hero banner - 4 image strip */}
      <section className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 h-[260px] md:h-[420px]">
          {heroImages.map((src, i) => (
            <div key={i} className="relative h-full">
              <Image src={src} alt="" fill className="object-cover" priority={i === 0} />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/80 text-xs md:text-sm tracking-[0.3em] mb-2">
            নতুন কালেকশন
          </p>
          <h1 className="text-white text-3xl md:text-6xl font-bold tracking-wide drop-shadow-lg">
            NEW ARRIVALS
          </h1>
          <Link
            href="/products"
            className="mt-6 bg-white text-black px-6 py-2 text-sm font-medium hover:bg-gray-100 transition"
          >
            এখনই শপিং করুন
          </Link>
        </div>
      </section>

      {/* Shop popular categories */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-center text-lg font-semibold tracking-widest text-gray-700 mb-6">
          শপ পপুলার ক্যাটাগরি
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/products?category=men" className="relative h-56 rounded-md overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80"
              alt="পুরুষ"
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white text-2xl font-semibold tracking-wide">পুরুষ</span>
            </div>
          </Link>
          <Link href="/products?category=women" className="relative h-56 rounded-md overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
              alt="নারী"
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white text-2xl font-semibold tracking-wide">নারী</span>
            </div>
          </Link>
        </div>

        {/* 3 small category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Link href="/products" className="relative h-36 rounded-md overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"
              alt="পপুলার প্রডাক্ট"
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-medium">পপুলার প্রডাক্ট</span>
            </div>
          </Link>
          <Link href="/products?category=kids" className="relative h-36 rounded-md overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80"
              alt="শিশু কালেকশন"
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-medium">শিশু কালেকশন</span>
            </div>
          </Link>
          <Link href="/products" className="relative h-36 rounded-md overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"
              alt="নতুন এসেছে"
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-medium">নতুন এসেছে</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-center text-lg font-semibold tracking-widest text-gray-700 mb-6">
          ফিচার্ড প্রডাক্ট
        </h2>
        {showProducts.length === 0 ? (
          <p className="text-gray-500 text-center">
            এখনো কোনো প্রডাক্ট যুক্ত করা হয়নি। এডমিন প্যানেল থেকে প্রডাক্ট যুক্ত করুন।
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {showProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}