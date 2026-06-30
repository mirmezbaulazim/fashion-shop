# STYLE.bd — ফ্যাশন ই-কমার্স ওয়েবসাইট

Next.js + MongoDB + SSLCommerz (bKash/Nagad/Rocket/Card) দিয়ে বানানো একটা সম্পূর্ণ ই-কমার্স সাইট, সাথে এডমিন প্যানেল।

## যা আছে
- হোমপেজ, প্রডাক্ট লিস্টিং, প্রডাক্ট ডিটেইলস, কার্ট, চেকআউট
- SSLCommerz পেমেন্ট ইন্টিগ্রেশন (bKash, Nagad, Rocket, Card)
- এডমিন প্যানেল: লগইন, প্রডাক্ট অ্যাড/এডিট/ডিলিট (ছবি আপলোড সহ), অর্ডার দেখা ও স্ট্যাটাস পরিবর্তন

---

## ১. VS Code-এ রান করার ধাপ

### প্রয়োজনীয় জিনিস (একবার ইনস্টল করতে হবে)
1. **Node.js** (v18 বা তার বেশি) — https://nodejs.org থেকে ডাউনলোড করুন
2. **VS Code** — https://code.visualstudio.com

### সেটআপ
1. এই পুরো ফোল্ডারটা VS Code-এ ওপেন করুন (`File > Open Folder`)
2. টার্মিনাল ওপেন করুন (`Terminal > New Terminal`) এবং রান করুন:
   ```
   npm install
   ```
3. `.env.example` ফাইলটার নাম পরিবর্তন করে `.env.local` বানান, এবং ভেতরের ভ্যালুগুলো পূরণ করুন (নিচে ধাপ ২ ও ৩ দেখুন)
4. এডমিন অ্যাকাউন্ট তৈরি করুন:
   ```
   npm run seed
   ```
5. সাইট রান করুন:
   ```
   npm run dev
   ```
6. ব্রাউজারে যান: http://localhost:3000 (ওয়েবসাইট) এবং http://localhost:3000/admin/login (এডমিন প্যানেল)

---

## ২. MongoDB Atlas (ফ্রি ডেটাবেস) সেটআপ
1. https://www.mongodb.com/cloud/atlas/register এ গিয়ে ফ্রি অ্যাকাউন্ট খুলুন
2. একটা ফ্রি (M0) ক্লাস্টার বানান
3. "Database Access" থেকে একটা ইউজার বানান (username/password মনে রাখুন)
4. "Network Access" থেকে `0.0.0.0/0` (Allow access from anywhere) যুক্ত করুন
5. "Connect" বাটনে ক্লিক করে connection string কপি করুন, এটা দেখতে এমন হবে:
   ```
   mongodb+srv://username:password@cluster0.mongodb.net/fashion-shop
   ```
6. এটা `.env.local` ফাইলে `MONGODB_URI` এর মান হিসেবে বসান

---

## ৩. Cloudinary (ফ্রি ছবি হোস্টিং) সেটআপ
1. https://cloudinary.com এ ফ্রি অ্যাকাউন্ট খুলুন
2. Dashboard-এ গিয়ে `Cloud Name`, `API Key`, `API Secret` কপি করুন
3. `.env.local`-এ বসান

---

## ৪. SSLCommerz পেমেন্ট সেটআপ
1. টেস্টের জন্য: https://developer.sslcommerz.com থেকে ফ্রি স্যান্ডবক্স একাউন্ট নিন (Store ID ও Store Password পাবেন)
2. `.env.local`-এ `SSLCOMMERZ_STORE_ID` ও `SSLCOMMERZ_STORE_PASSWORD` বসান, `SSLCOMMERZ_IS_LIVE=false` রাখুন (টেস্টিং মোড)
3. সাইট লাইভ করার পর, আসল bKash পেমেন্ট নেওয়ার জন্য sslcommerz.com থেকে Merchant Account রেজিস্ট্রেশন করতে হবে (তখন `SSLCOMMERZ_IS_LIVE=true` করবেন এবং লাইভ Store ID/Password ব্যবহার করবেন)

---

## ৫. ফ্রি-তে লাইভ করার ধাপ (Vercel)
1. একটা GitHub অ্যাকাউন্ট থাকলে, এই প্রজেক্টটা GitHub-এ পুশ করুন:
   ```
   git init
   git add .
   git commit -m "first commit"
   ```
   GitHub-এ একটা নতুন রিপোজিটরি বানিয়ে সেখানে পুশ করুন (GitHub-এর instructions অনুসরণ করুন)
2. https://vercel.com এ গিয়ে GitHub দিয়ে সাইনআপ করুন
3. "Add New Project" → আপনার রিপোজিটরি সিলেক্ট করুন
4. "Environment Variables" সেকশনে `.env.local`-এর সবগুলো ভ্যারিয়েবল একে একে যুক্ত করুন (এবার `NEXT_PUBLIC_BASE_URL` হবে আপনার Vercel দেওয়া লাইভ URL, যেমন `https://your-site.vercel.app`)
5. "Deploy" বাটনে ক্লিক করুন — কয়েক মিনিটে সাইট লাইভ হয়ে যাবে, সম্পূর্ণ ফ্রি!

---

## এডমিন প্যানেল ব্যবহার
- লগইন: `/admin/login` — `.env.local`-এ দেওয়া `ADMIN_EMAIL` ও `ADMIN_PASSWORD` দিয়ে
- প্রডাক্ট যুক্ত করুন: `/admin/products`
- অর্ডার দেখুন/স্ট্যাটাস পরিবর্তন করুন: `/admin/orders`

## পরবর্তীতে যুক্ত করতে পারবেন
- কাস্টমার লগইন/সাইনআপ ও অর্ডার হিস্ট্রি
- হোমপেজ ব্যানার/সেকশন এডিট করার এডমিন টুল
- SMS নোটিফিকেশন (অর্ডার কনফার্মেশনের জন্য)
