// Yassin@github@1999

const mongoose = require("mongoose");

const SingleCartItem = mongoose.Schema({
  name: { type: String, required: true },

  image: { type: String, required: true },

  price: { type: Number, required: true },

  amount: { type: Number, required: true },

  product: { type: mongoose.Types.ObjectId, ref: "product", requied: true },
});

const OrderSchema = mongoose.Schema(
  {
    tax: { type: Number, required: true },

    shippingFee: { type: Number, required: true },

    subtotal: { type: Number, required: true },

    total: { type: Number, required: true },

    cartItems: [SingleCartItem],

    status: {
      type: String,
      enum: ["pending", "faild", "paid", "delivered", "canceled"],
      default: "pending",
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },

    clientSecret: { type: String, required: true },

    paymentId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
