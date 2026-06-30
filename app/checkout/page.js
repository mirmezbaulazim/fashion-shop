"use client";
import { useState, Suspense } from "react";
import { useCart } from "@/components/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutForm />
    </Suspense>
  );
}

function CheckoutForm() {
  const { cart, total, clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const failed = searchParams.get("failed");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast.error("সব তথ্য পূরণ করুন");
      return;
    }
    setLoading(true);
    try {
      const items = cart.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        size: i.size,
        color: i.color,
        qty: i.qty,
        image: i.image,
      }));

      const { data } = await axios.post("/api/payment/init", {
        items,
        customer: form,
        total,
      });

      if (data.gatewayUrl) {
        window.location.href = data.gatewayUrl;
      } else {
        toast.error("পেমেন্ট শুরু করা যায়নি। SSLCommerz কী যুক্ত করা হয়েছে কিনা চেক করুন।");
      }
    } catch (err) {
      toast.error("কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center text-gray-500">
        আপনার কার্ট খালি।
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">চেকআউট</h1>
      {failed && (
        <p className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
          পেমেন্ট ব্যর্থ হয়েছে বা বাতিল হয়েছে, আবার চেষ্টা করুন।
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="input" placeholder="পুরো নাম" name="name" value={form.name} onChange={handleChange} />
        <input className="input" placeholder="মোবাইল নম্বর" name="phone" value={form.phone} onChange={handleChange} />
        <input className="input" placeholder="ইমেইল (ঐচ্ছিক)" name="email" value={form.email} onChange={handleChange} />
        <input className="input" placeholder="ঠিকানা" name="address" value={form.address} onChange={handleChange} />
        <input className="input" placeholder="শহর" name="city" value={form.city} onChange={handleChange} />

        <div className="border-t pt-3 flex justify-between font-semibold">
          <span>সর্বমোট</span>
          <span>৳{total}</span>
        </div>

        <button disabled={loading} className="btn-primary w-full">
          {loading ? "প্রসেসিং..." : "bKash/Nagad/কার্ড দিয়ে পে করুন"}
        </button>
      </form>
    </div>
  );
}
