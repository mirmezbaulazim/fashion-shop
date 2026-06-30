"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await axios.delete("/api/admin/login");
    router.push("/admin/login");
  }
  return (
    <button onClick={handleLogout} className="text-sm text-red-500">
      লগআউট
    </button>
  );
}
