"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  discountPrice: "",
  category: "men",
  sizes: "S,M,L,XL",
  colors: "",
  stock: "",
  featured: false,
  images: [],
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function loadProducts() {
    const { data } = await axios.get("/api/products");
    setProducts(data.products);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        const { data } = await axios.post("/api/upload", fd);
        urls.push(data.url);
      }
      setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
      toast.success("ছবি আপলোড হয়েছে");
    } catch {
      toast.error("ছবি আপলোড ব্যর্থ হয়েছে। Cloudinary কী সেট করা আছে কিনা চেক করুন।");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
        stock: Number(form.stock) || 0,
        sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        colors: form.colors.split(",").map((s) => s.trim()).filter(Boolean),
      };

      if (editingId) {
        await axios.put(`/api/products/${editingId}`, payload);
        toast.success("প্রডাক্ট আপডেট হয়েছে");
      } else {
        await axios.post("/api/products", payload);
        toast.success("প্রডাক্ট যুক্ত হয়েছে");
      }
      setForm(emptyForm);
      setEditingId(null);
      loadProducts();
    } catch {
      toast.error("সমস্যা হয়েছে, আবার চেষ্টা করুন");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(p) {
    setEditingId(p._id);
    setForm({
      name: p.name,
      description: p.description || "",
      price: p.price,
      discountPrice: p.discountPrice || "",
      category: p.category,
      sizes: (p.sizes || []).join(","),
      colors: (p.colors || []).join(","),
      stock: p.stock,
      featured: p.featured,
      images: p.images || [],
    });
  }

  async function handleDelete(id) {
    if (!confirm("আপনি কি নিশ্চিত এই প্রডাক্ট ডিলিট করতে চান?")) return;
    await axios.delete(`/api/products/${id}`);
    toast.success("ডিলিট হয়েছে");
    loadProducts();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/admin" className="text-sm text-gray-500">← ড্যাশবোর্ড</Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">প্রডাক্ট ম্যানেজমেন্ট</h1>

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-sm space-y-3 mb-10">
        <h2 className="font-semibold">{editingId ? "প্রডাক্ট এডিট করুন" : "নতুন প্রডাক্ট যুক্ত করুন"}</h2>
        <input className="input" name="name" placeholder="প্রডাক্টের নাম" value={form.name} onChange={handleChange} required />
        <textarea className="input" name="description" placeholder="বিবরণ" value={form.description} onChange={handleChange} rows={3} />
        <div className="grid grid-cols-2 gap-3">
          <input className="input" name="price" type="number" placeholder="দাম (৳)" value={form.price} onChange={handleChange} required />
          <input className="input" name="discountPrice" type="number" placeholder="ডিসকাউন্ট দাম (ঐচ্ছিক)" value={form.discountPrice} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <select className="input" name="category" value={form.category} onChange={handleChange}>
            <option value="men">পুরুষ</option>
            <option value="women">নারী</option>
            <option value="kids">শিশু</option>
          </select>
          <input className="input" name="stock" type="number" placeholder="স্টক সংখ্যা" value={form.stock} onChange={handleChange} />
        </div>
        <input className="input" name="sizes" placeholder="সাইজ (কমা দিয়ে আলাদা করুন: S,M,L,XL)" value={form.sizes} onChange={handleChange} />
        <input className="input" name="colors" placeholder="রং (কমা দিয়ে আলাদা করুন, ঐচ্ছিক)" value={form.colors} onChange={handleChange} />

        <div>
          <label className="text-sm font-medium block mb-1">প্রডাক্ট ছবি</label>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-sm text-gray-500 mt-1">আপলোড হচ্ছে...</p>}
          <div className="flex gap-2 mt-2 flex-wrap">
            {form.images.map((img, i) => (
              <div key={i} className="relative w-16 h-16 rounded overflow-hidden">
                <Image src={img} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          হোমপেজে ফিচার করুন
        </label>

        <div className="flex gap-2">
          <button className="btn-primary" disabled={saving}>
            {saving ? "সেভ হচ্ছে..." : editingId ? "আপডেট করুন" : "প্রডাক্ট যুক্ত করুন"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="px-4 py-2 border rounded"
            >
              বাতিল
            </button>
          )}
        </div>
      </form>

      <h2 className="font-semibold mb-3">সব প্রডাক্ট ({products.length})</h2>
      <div className="space-y-2">
        {products.map((p) => (
          <div key={p._id} className="flex items-center gap-4 bg-white p-3 rounded shadow-sm">
            <div className="relative w-14 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
              {p.images?.[0] && <Image src={p.images[0]} alt="" fill className="object-cover" />}
            </div>
            <div className="flex-1">
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">৳{p.discountPrice || p.price} · স্টক: {p.stock} · {p.category}</p>
            </div>
            <button onClick={() => handleEdit(p)} className="text-sm text-blue-600">এডিট</button>
            <button onClick={() => handleDelete(p._id)} className="text-sm text-red-500">ডিলিট</button>
          </div>
        ))}
      </div>
    </div>
  );
}
