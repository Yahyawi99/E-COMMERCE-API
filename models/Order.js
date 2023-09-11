const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    tax: { type: Number, required: true },

    shippingFee: { type: Number, required: true },

    subtotal: { type: Number, required: true },

    total: { type: Number, required: true },

    cartItems: [],

    status: { type: String, enum: [], required: true },

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
