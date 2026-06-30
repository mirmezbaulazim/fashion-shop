import { verifyAdminToken } from "./auth";
import { cookies } from "next/headers";

export function requireAdmin() {
  const token = cookies().get("admin_token")?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
