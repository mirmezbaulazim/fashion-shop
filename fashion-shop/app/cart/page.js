"use client";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">আপনার কার্ট খালি।</p>
        <Link href="/products" className="btn-primary inline-block">
          শপিং করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">আপনার কার্ট</h1>
      <div className="space-y-4">
        {cart.map((item, i) => (
          <div key={i} className="flex gap-4 items-center bg-white p-3 rounded-lg shadow-sm">
            <div className="relative w-16 h-20 rounded overflow-hidden bg-gray-100 flex-shrink-0">
              {item.image && (
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.size} {item.color && `· ${item.color}`}
              </p>
              <p className="text-sm font-semibold mt-1">৳{item.price}</p>
            </div>
            <div className="flex items-center border rounded">
              <button className="px-2" onClick={() => updateQty(i, item.qty - 1)}>-</button>
              <span className="px-2">{item.qty}</span>
              <button className="px-2" onClick={() => updateQty(i, item.qty + 1)}>+</button>
            </div>
            <button onClick={() => removeFromCart(i)} className="text-red-500 text-sm">
              মুছুন
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center border-t pt-4">
        <span className="font-semibold">সর্বমোট</span>
        <span className="text-xl font-bold">৳{total}</span>
      </div>

      <Link href="/checkout" className="btn-primary block text-center mt-6">
        চেকআউট করুন
      </Link>
    </div>
  );
}
