const mongoose = require("mongoose");

const ProductCatagorySchema = mongoose.Schema(
  {
    productCatagoryName: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    productNames: [
      {
        name: {
          type: String,
        },
        image: {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      },
      // String,
    ],
  },
  { timestamps: true }
);
// Ensure academicYear is unique across documents
// ProductCatagorySchema.index({ productCatagoryName: 1, store: 1 }, { unique: true });

const ProductCatagory = mongoose.model(
  "ProductCatagory",
  ProductCatagorySchema
);
module.exports = ProductCatagory;
