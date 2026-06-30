"use client";
import { useEffect, Suspense } from "react";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const tran = searchParams.get("tran");

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-2xl font-bold mb-2">অর্ডার সফল হয়েছে!</h1>
      <p className="text-gray-500 mb-1">ট্রানজেকশন আইডি: {tran}</p>
      <p className="text-gray-500 mb-6">আমরা দ্রুত আপনার সাথে যোগাযোগ করব।</p>
      <Link href="/products" className="btn-primary inline-block">
        আরও শপিং করুন
      </Link>
    </div>
  );
}
