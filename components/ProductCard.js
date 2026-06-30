import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  const img = product.images?.[0] || "/placeholder.png";
  const hasDiscount = !!product.discountPrice;

  return (
    <Link href={`/product/${product.slug}`} className="block group">
      <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden bg-gray-100">
        {hasDiscount && (
          <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
            Sale
          </span>
        )}
        {product.images?.[0] ? (
          <Image
            src={img}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            ছবি নেই
          </div>
        )}
      </div>

      <div className="mt-3 text-center">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        <div className="mt-1 flex justify-center gap-2 items-center">
          {hasDiscount ? (
            <>
              <span className="text-red-600 font-semibold">
                ৳{product.discountPrice}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ৳{product.price}
              </span>
            </>
          ) : (
            <span className="font-semibold text-gray-800">৳{product.price}</span>
          )}
        </div>

        <div className="mt-1 flex justify-center gap-0.5 text-yellow-400 text-xs">
          {"★★★★★".split("").map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}