// Run with: npm run seed
// Creates (or updates) the first admin account using ADMIN_EMAIL / ADMIN_PASSWORD from .env.local

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI missing in .env.local");
    process.exit(1);
  }
  await mongoose.connect(uri);
  const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const hashed = await bcrypt.hash(password, 10);

  const existing = await Admin.findOne({ email });
  if (existing) {
    existing.password = hashed;
    await existing.save();
    console.log(`Admin password updated for ${email}`);
  } else {
    await Admin.create({ email, password: hashed, name: "Admin" });
    console.log(`Admin created: ${email}`);
  }
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
