import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AdminHome() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">এডমিন ড্যাশবোর্ড</h1>
        <LogoutButton />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link href="/admin/products" className="card flex flex-col items-center py-10">
          <span className="text-3xl mb-2">👕</span>
          <span className="font-medium">প্রডাক্ট ম্যানেজমেন্ট</span>
        </Link>
        <Link href="/admin/orders" className="card flex flex-col items-center py-10">
          <span className="text-3xl mb-2">📦</span>
          <span className="font-medium">অর্ডার ম্যানেজমেন্ট</span>
        </Link>
      </div>
    </div>
  );
}
