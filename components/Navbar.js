"use client";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          STYLE<span className="text-gray-400">.bd</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/products?category=men">পুরুষ</Link>
          <Link href="/products?category=women">নারী</Link>
          <Link href="/products?category=kids">শিশু</Link>
          <Link href="/products">সব প্রডাক্ট</Link>
        </nav>
        <Link href="/cart" className="relative">
          🛒
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
