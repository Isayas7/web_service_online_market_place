const ProductCatagory = require("../models/productCatagoryModel");
const Sell = require("../models/sellModel");
const Store = require("../models/storeModel");
const User = require("../models/userModel");
const Variant = require("../models/variantModel");
const mongoose = require("mongoose");

// get all Sells
const getSells = async (req, res) => {
  try {
    const sells = await Sell.find({}).sort({ createdAt: -1 });
    const sellsData = await Promise.all(
      sells.map(async (sell) => {
        const variant = await Variant.findById(sell.variantId.toString());
        const stores = await Store.findById(variant.store.toString());
        const user = await User.findById(sell.seller.toString());
        const productCatagory = await ProductCatagory.findById(
          variant.productCatagory.toString()
        );

        const totalPrice = parseFloat(sell.price) * parseFloat(sell.amount);

        return {
          sellerName: `${user.firstName}(${user.email})`,
          storeName: stores
            ? `${stores.storeLocation}(${stores.storeName})`
            : null,
          productCatagory: productCatagory.productCatagoryName,
          product: variant.productName,
          brand: variant.brandName,
          store: stores._id,
          totalPrice: totalPrice.toFixed(2),
          ...sell._doc,
        };
      })
    );

    res.status(200).json(sellsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// get a single Sell
const getSell = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such sell" });
  }
  const sell = await Sell.findById(id);

  if (!sell) {
    return res.status(404).json({ error: "No such sell" });
  }

  res.status(200).json(sell);
};

// create a new Sell
const createSell = async (req, res) => {
  const { seller, variant, price, amount } = req.body;

  let emptyFields = [];
  if (!amount) {
    emptyFields.push("amount");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  //   finding the selled product
  const selledVariant = await Variant.findById(variant);
  //   checking if amount is balanced
  if (selledVariant.amount < amount) {
    return res.status(400).json({ error: "No such amount", emptyFields });
  }

  //   deleting if  equal amount
  else if (+selledVariant.amount === +amount) {
    const deletedVariant = await Variant.findById(variant);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such variant" });
    }

    const imagePublicIds = deletedVariant.images.map(
      (image) => image.public_id
    );

    const deletionPromises = imagePublicIds.map((publicId) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    });

    try {
      await Promise.all(deletionPromises);
      const deletedVariantFromDB = await Variant.findOneAndDelete({ _id: id });
      if (!deletedVariantFromDB) {
        return res.status(400).json({ error: "No such variant" });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Error reducing variant and images" });
    }
  }
  //   if product id greater than selled amount
  else if (+selledVariant.amount > +amount) {
    const selledVariantUpdate = await Variant.findOneAndUpdate(
      { _id: variant },
      {
        amount: +selledVariant.amount - +amount,
      }
    );
    if (!selledVariantUpdate) {
      return res
        .status(400)
        .json({ error: "Error reducing variant and images" });
    }
  }

  const vari = await Variant.findById(variant);
  const productCatagory = await ProductCatagory.findById(vari.productCatagory);
  try {
    const sell = await Sell.create({
      seller,
      productCatagory: productCatagory.productCatagoryName,
      model: vari.modelName,
      variantId: variant,
      price,
      amount,
    });
    res.status(200).json(sell);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getSells,
  getSell,
  createSell,
};
