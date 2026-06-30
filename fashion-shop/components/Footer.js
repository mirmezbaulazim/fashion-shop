export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm">
        <p className="font-semibold text-white mb-2">STYLE.bd</p>
        <p>বাংলাদেশের ট্রেন্ডি ফ্যাশন শপ — গুণগত মান, সাশ্রয়ী দামে।</p>
        <p className="mt-4 text-gray-500">
          © {new Date().getFullYear()} STYLE.bd — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
