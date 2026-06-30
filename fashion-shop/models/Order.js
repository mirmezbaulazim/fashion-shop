import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  price: Number,
  size: String,
  color: String,
  qty: Number,
  image: String,
});

const OrderSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true, unique: true },
    items: [OrderItemSchema],
    customer: {
      name: String,
      phone: String,
      email: String,
      address: String,
      city: String,
    },
    total: { type: Number, required: true },
    paymentMethod: { type: String, default: "sslcommerz" },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
