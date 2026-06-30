"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/admin/login", form);
      toast.success("লগইন সফল!");
      router.push("/admin");
    } catch {
      toast.error("ইমেইল বা পাসওয়ার্ড ভুল");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-24">
      <h1 className="text-2xl font-bold mb-6 text-center">এডমিন লগইন</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="input"
          placeholder="ইমেইল"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="input"
          type="password"
          placeholder="পাসওয়ার্ড"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn-primary w-full" disabled={loading}>
          {loading ? "..." : "লগইন করুন"}
        </button>
      </form>
    </div>
  );
}
