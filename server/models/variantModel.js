const mongoose = require("mongoose");

const VariantSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    sizes: [
      {
        type: String,
      },
    ],
    colors: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    condition: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    productCatagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCatagory",
      required: true,
    },
  },
  { timestamps: true }
);

// Virtual property to track time when amount is less than 10
VariantSchema.virtual("lowStockTime").get(function () {
  if (this.amount < 10) {
    return this.updatedAt; // or use this.updatedAt if you prefer to track the time of the last update
  }
  return null; // Return null if amount is 10 or greater
});
// Ensure academicYear is unique across documents
// VariantSchema.index({ modelName: 1, store: 1 }, { unique: true });

const Variant = mongoose.model("Variant", VariantSchema);
module.exports = Variant;
