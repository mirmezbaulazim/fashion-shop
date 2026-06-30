"use client";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import toast from "react-hot-toast";

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState(product.sizes?.[0] || "");
  const [color, setColor] = useState(product.colors?.[0] || "");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const price = product.discountPrice || product.price;

  function handleAdd() {
    addToCart({
      productId: product._id,
      name: product.name,
      price,
      size,
      color,
      qty,
      image: product.images?.[0] || "",
    });
    toast.success("কার্টে যুক্ত হয়েছে!");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      <div>
        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
          {product.images?.[activeImg] ? (
            <Image
              src={product.images[activeImg]}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              ছবি নেই
            </div>
          )}
        </div>
        {product.images?.length > 1 && (
          <div className="flex gap-2 mt-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative w-16 h-16 rounded overflow-hidden border ${
                  i === activeImg ? "border-black" : "border-gray-200"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="mt-2 flex gap-3 items-center">
          <span className="text-xl font-semibold">৳{price}</span>
          {product.discountPrice && (
            <span className="text-gray-400 line-through">
              ৳{product.price}
            </span>
          )}
        </div>
        <p className="mt-4 text-gray-600">{product.description}</p>

        {product.sizes?.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">সাইজ</p>
            <div className="flex gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1 rounded border text-sm ${
                    size === s ? "bg-black text-white" : "border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.colors?.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">রং</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-1 rounded border text-sm ${
                    color === c ? "bg-black text-white" : "border-gray-300"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center gap-3">
          <p className="text-sm font-medium">পরিমাণ</p>
          <div className="flex items-center border rounded">
            <button
              className="px-3 py-1"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="px-3">{qty}</span>
            <button className="px-3 py-1" onClick={() => setQty((q) => q + 1)}>
              +
            </button>
          </div>
        </div>

        <button onClick={handleAdd} className="btn-primary mt-6 w-full md:w-auto">
          কার্টে যুক্ত করুন
        </button>

        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-orange-600 text-sm mt-3">
            স্টকে আছে শুধু {product.stock} টি!
          </p>
        )}
        {product.stock === 0 && (
          <p className="text-red-600 text-sm mt-3">স্টক শেষ</p>
        )}
      </div>
    </div>
  );
}
