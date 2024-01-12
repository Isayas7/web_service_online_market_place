const Variant = require("../models/variantModel");
const Store = require("../models/storeModel");
const Transfer = require("../models/transferModel");
const ProductCatagory = require("../models/productCatagoryModel");
const Request = require("../models/requestModel");

// get transfer
const getTransfers = async (req, res) => {
  const transfers = await Transfer.find({}).sort({ createdAt: -1 });
  const transferData = await Promise.all(
    transfers.map(async (transfer) => {
      const senderStores = await Store.findById(
        transfer.senderStore.toString()
      );
      const receiverStores = await Store.findById(
        transfer.receiverStore.toString()
      );
      const productCatagory = await ProductCatagory.findById(
        transfer.productCatagory.toString()
      );
      return {
        sender: senderStores
          ? `${senderStores.storeLocation}(${senderStores.storeName})`
          : null,
        receiver: receiverStores
          ? `${receiverStores.storeLocation}(${receiverStores.storeName})`
          : null,
        productCatagoryName: productCatagory.productCatagoryName,
        product: transfer.productName,
        brand: transfer.brandName,
        ...transfer._doc,
      };
    })
  );

  res.status(200).json(transferData);
};

// get all Brands
const transferVariant = async (req, res) => {
  try {
    const { amounts, variant, store, senderStore } = req.body;

    const storeExists = await Store.findById(store);
    if (!storeExists) {
      return res.status(400).json({ error: "No such store" });
    }

    const updatedVariants = await Promise.all(
      variant.map(async (sVariant, index) => {
        const exists = await Variant.findOne({
          modelName: sVariant.modelName,
          store: store,
        });

        // store to transfer Table
        Transfer.create({
          senderStore,
          receiverStore: store,
          productCatagory: sVariant.productCatagoryId,
          productName: sVariant.productName,
          brandName: sVariant.brandName,
          modelName: sVariant.modelName,
          amount: amounts[index],
        });

        // if exist
        if (exists) {
          const request = Request.findOneAndUpdate(
            { modelName: sVariant.modelName, store: store },
            { requestStatus: "Approved" }
          ).exec();
          console.log(request);

          return Variant.findOneAndUpdate(
            { modelName: sVariant.modelName, store: store },
            { $inc: { amount: +amounts[index] } },
            { new: true }
          );
        } else {
          // if not exist
          return Variant.create({
            productName: sVariant.productName,
            brandName: sVariant.brandName,
            modelName: sVariant.modelName,
            images: sVariant.images,
            sizes: sVariant.sizes,
            colors: sVariant.colors,
            price: sVariant.price,
            amount: amounts[index],
            condition: sVariant.condition,
            gender: sVariant.gender,
            shortDescription: sVariant.shortDescription,
            productCatagory: sVariant.productCatagoryId,
            store: store,
          });
        }
      })
    );

    const reducedVariants = await Promise.all(
      variant.map((sVariant, index) => {
        return Variant.findOneAndUpdate(
          { _id: sVariant._id },
          { $inc: { amount: -amounts[index] } },
          { new: true }
        );
      })
    );

    res.status(200).json({ updatedVariants, reducedVariants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { transferVariant, getTransfers };
