"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const statusOptions = ["processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/orders");
      setOrders(data.orders);
    } catch {
      toast.error("অর্ডার লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function updateStatus(id, orderStatus) {
    try {
      await axios.put(`/api/orders/${id}`, { orderStatus });
      toast.success("স্ট্যাটাস আপডেট হয়েছে");
      loadOrders();
    } catch {
      toast.error("আপডেট ব্যর্থ হয়েছে");
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/admin" className="text-sm text-gray-500">← ড্যাশবোর্ড</Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">অর্ডার ম্যানেজমেন্ট</h1>

      {loading ? (
        <p className="text-gray-500">লোড হচ্ছে...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">এখনো কোনো অর্ডার আসেনি।</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <p className="font-semibold">{o.customer?.name}</p>
                  <p className="text-sm text-gray-500">{o.customer?.phone} · {o.customer?.city}</p>
                  <p className="text-sm text-gray-500">{o.customer?.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{o.transactionId}</p>
                  <p className="font-semibold">৳{o.total}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      o.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : o.paymentStatus === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    পেমেন্ট: {o.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="mt-3 border-t pt-3 space-y-1">
                {o.items?.map((it, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    {it.name} ({it.size}{it.color ? `, ${it.color}` : ""}) × {it.qty} — ৳{it.price * it.qty}
                  </p>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm font-medium">অর্ডার স্ট্যাটাস:</span>
                <select
                  className="input w-auto py-1"
                  value={o.orderStatus}
                  onChange={(e) => updateStatus(o._id, e.target.value)}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
