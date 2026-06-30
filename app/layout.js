import "../styles/globals.css";
import { CartProvider } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "STYLE.bd — ফ্যাশন শপ",
  description: "বাংলাদেশের ট্রেন্ডি ফ্যাশন ই-কমার্স স্টোর",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}
