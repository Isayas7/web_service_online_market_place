const Variant = require("../models/variantModel");
const ProductCatagory = require("../models/productCatagoryModel");
const Store = require("../models/storeModel");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

// get all Variants
const getVariants = async (req, res) => {
  const variants = await Variant.find({}).sort({ updatedAt: -1 });
  const variantsData = await Promise.all(
    variants.map(async (variant) => {
      const productCatagory = await ProductCatagory.findById(
        variant.productCatagory.toString()
      );
      const store = await Store.findById(variant.store.toString());

      return {
        ...variant._doc,
        productCatagory: productCatagory.producCatagoryName,
        productCatagoryId: productCatagory._id,
        storeName: store.storeName,
      };
    })
  );

  res.status(200).json(variantsData);
};

// get a single Variant
const getVariant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such variant" });
  }
  const variant = await Variant.findById(id);

  if (!variant) {
    return res.status(404).json({ error: "No such variant" });
  }

  res.status(200).json(variant);
};

// create a new Variant
const createVariant = async (req, res) => {
  const {
    productName,
    brandName,
    modelName,
    images,
    sizes,
    colors,
    price,
    amount,
    condition,
    gender,
    shortDescription,
    store,
    productCatagory,
  } = req.body;
  let emptyFields = [];

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const uploadedImages = [];

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "psms",
      });
      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const variant = await Variant.create({
      productName,
      brandName,
      modelName,
      images: uploadedImages,
      sizes,
      colors,
      price,
      amount,
      condition,
      gender,
      shortDescription,
      store,
      productCatagory,
    });

    // reupload emage
    const uploaded = [];
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "psms",
      });
      uploaded.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
      break;
    }

    // Push image to productNames
    const productCatagorys = await ProductCatagory.findById(productCatagory);
    if (!productCatagorys) {
      return res.status(404).json({ error: "ProductCatagory not found" });
    }

    const productNamesWithImage = productCatagorys.productNames.map(
      (product) => {
        if (product.name === productName) {
          return {
            ...product.toObject(),
            image: uploaded[0],
          };
        }
        return product;
      }
    );

    productCatagorys.productNames = productNamesWithImage;
    await productCatagorys.save();

    res.status(200).json(variant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Variant
const deleteVariant = async (req, res) => {
  const { id } = req.params;
  const deletedVariant = await Variant.findById(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such variant" });
  }

  const imagePublicIds = deletedVariant.images.map((image) => image.public_id);

  // Delete multiple images
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

    // All images deleted successfully
    // Delete the variant from the database
    const deletedVariantFromDB = await Variant.findOneAndDelete({ _id: id });

    if (!deletedVariantFromDB) {
      return res.status(400).json({ error: "No such variant" });
    }

    return res.status(200).json({ message: "Variant deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Error deleting variant and images" });
  }
};

// update a Variant
const updateVariant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such variant" });
  }

  const variant = await Variant.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!variant) {
    return res.status(400).json({ error: "No such Variant" });
  }

  res.status(200).json(variant);
};

module.exports = {
  getVariants,
  getVariant,
  createVariant,
  deleteVariant,
  updateVariant,
};
