const mongoose = require("mongoose");

const SingleOrderItem = mongoose.Schema({
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

    subTotal: { type: Number, required: true },

    total: { type: Number, required: true },

    orderItems: [SingleOrderItem],

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

    paymentIntentId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
