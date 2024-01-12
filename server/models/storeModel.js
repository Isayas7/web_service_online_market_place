const mongoose = require("mongoose");

const StoreSchema = mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
    },

    storeLocation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", StoreSchema);
module.exports = Store;
