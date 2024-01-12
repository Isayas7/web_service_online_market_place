const ProductCatagory = require("../models/productCatagoryModel");
const Purchase = require("../models/purchaseModel");
const Store = require("../models/storeModel");
const User = require("../models/userModel");
const Variant = require("../models/variantModel");
const mongoose = require("mongoose");

// get all Purchases
const getPurchases = async (req, res) => {
  const purchases = await Purchase.find({}).sort({ createdAt: -1 });
  const purchasesData = await Promise.all(
    purchases.map(async (purchase) => {
      const variant = await Variant.findById(purchase.variantId.toString());
      const stores = await Store.findById(variant.store.toString());
      const user = await User.findById(purchase.purchaser.toString());
      const productCatagory = await ProductCatagory.findById(
        variant.productCatagory.toString()
      );
      return {
        purchaserName: `${user.firstName}(${user.email})`,
        storeName: stores
          ? `${stores.storeLocation}(${stores.storeName})`
          : null,
        productCatagory: productCatagory.productCatagoryName,
        product: variant.productName,
        brand: variant.brandName,
        store: stores._id,
        ...purchase._doc,
      };
    })
  );

  res.status(200).json(purchasesData);
};

// get a single Purchase
const getPurchase = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such purchase" });
  }
  const purchase = await Purchase.findById(id);

  if (!purchase) {
    return res.status(404).json({ error: "No such purchase" });
  }

  res.status(200).json(purchase);
};

// create a new Purchase
const createPurchase = async (req, res) => {
  const { purchaser, variant, price, amount } = req.body;

  let emptyFields = [];
  if (!amount) {
    emptyFields.push("amount");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  //   finding the purchaseed product
  const purchaseedVariant = await Variant.findById(variant);

  const purchaseedVariantUpdate = await Variant.findOneAndUpdate(
    { _id: variant },
    {
      amount: +purchaseedVariant.amount + +amount,
    }
  );
  if (!purchaseedVariantUpdate) {
    return res.status(400).json({ error: "Error reducing variant and images" });
  }

  const vari = await Variant.findById(variant);
  const productCatagory = await ProductCatagory.findById(vari.productCatagory);
  try {
    const purchase = await Purchase.create({
      purchaser,
      productCatagory: productCatagory.productCatagoryName,
      model: vari.modelName,
      variantId: variant,
      price,
      amount,
    });
    res.status(200).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPurchases,
  getPurchase,
  createPurchase,
};
