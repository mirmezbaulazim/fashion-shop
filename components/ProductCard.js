import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  const img = product.images?.[0] || "/placeholder.png";
  return (
    <Link href={`/product/${product.slug}`} className="card block">
      <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden bg-gray-100">
        {product.images?.[0] ? (
          <Image
            src={img}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            ছবি নেই
          </div>
        )}
      </div>
      <h3 className="mt-3 text-sm font-medium line-clamp-1">{product.name}</h3>
      <div className="mt-1 flex gap-2 items-center">
        {product.discountPrice ? (
          <>
            <span className="font-semibold">৳{product.discountPrice}</span>
            <span className="text-xs text-gray-400 line-through">
              ৳{product.price}
            </span>
          </>
        ) : (
          <span className="font-semibold">৳{product.price}</span>
        )}
      </div>
    </Link>
  );
}
