import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";


async function getProducts(category) {
  await connectDB();
  const query = category ? { category } : {};
  const products = await Product.find(query).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage({ searchParams }) {
  const category = searchParams?.category;
  const products = await getProducts(category);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        {category ? `${category} ক্যাটাগরি` : "সব প্রডাক্ট"}
      </h1>
      {products.length === 0 ? (
        <p className="text-gray-500">কোনো প্রডাক্ট পাওয়া যায়নি।</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
