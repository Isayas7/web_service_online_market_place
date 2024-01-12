const ProductCatagory = require("../models/productCatagoryModel");
const Request = require("../models/requestModel");
const Store = require("../models/storeModel");
const User = require("../models/userModel");
const Variant = require("../models/variantModel");
const mongoose = require("mongoose");

// get all Requests
const getRequests = async (req, res) => {
  const requests = await Request.find({}).sort({ createdAt: -1 });
  const requestsData = await Promise.all(
    requests.map(async (request) => {
      const variant = await Variant.findById(request.variantId.toString());
      const stores = await Store.findById(variant.store.toString());
      const user = await User.findById(request.requester.toString());
      const productCatagory = await ProductCatagory.findById(
        variant.productCatagory.toString()
      );
      return {
        requesterName: `${user.firstName}(${user.email})`,
        storeName: stores
          ? `${stores.storeLocation}(${stores.storeName})`
          : null,
        productCatagory: productCatagory.productCatagoryName,
        product: variant.productName,
        brand: variant.brandName,
        store: stores._id,
        ...request._doc,
      };
    })
  );

  res.status(200).json(requestsData);
};

// create a new Request
const createRequest = async (req, res) => {
  const { store, requester, variant, requestType, requestStatus, readStatus } =
    req.body;

  const vari = await Variant.findById(variant);
  const productCatagory = await ProductCatagory.findById(vari.productCatagory);
  try {
    const request = await Request.create({
      store,
      requester,
      productCatagory: productCatagory.productCatagoryName,
      modelName: vari.modelName,
      variantId: variant,
      requestType,
      requestStatus,
      readStatus,
    });
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateRequest = async (req, res) => {
  const { id } = req.params;

  const request = await Request.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!request) {
    return res.status(400).json({ error: "No such requests" });
  }

  res.status(200).json(request);
};

module.exports = {
  getRequests,
  createRequest,
  updateRequest,
};
