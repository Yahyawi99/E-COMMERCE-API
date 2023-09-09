// Yassin@github@1999

const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide a rating"],
    },
    title: {
      type: String,
      trim: true,
      maxlength: 50,
      required: [true, "Please provide a review title"],
    },
    comment: {
      type: String,
      maxlength: 1000,
      required: [true, "Please provide a review text"],
    },
    user: {
      Type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      Type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.export = mongoose.model("Review", ReviewSchema);
