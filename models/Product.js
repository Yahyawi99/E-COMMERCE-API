const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a product name"],
      maxlength: [100, "Name is too long"],
    },

    price: { type: Number, required: [true, "Please provide a product price"] },

    description: {
      type: String,
      required: [true, "Please provide a product description"],
      maxlength: [1000, "description is too long"],
    },

    image: { type: String, default: "/uploads/example.jpeg" },

    category: {
      type: String,
      required: [true, "Please provide a product category"],
      enum: ["office", "kitchen", "bedroom"],
    },

    company: {
      type: String,
      required: [true, "Please provide a company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },

    colors: { type: [String], default: ["#222"], required: true },

    featured: { type: Boolean, default: false },

    freeShipping: { type: Boolean, default: false },

    inventory: { type: Number, required: true, default: 15 },

    averageRating: { type: Number, default: 0 },

    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
  match: { rating: 5 },
});

ProductSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
});

module.exports = mongoose.model("Product", ProductSchema);
