const Store = require("../models/storeModel");
const mongoose = require("mongoose");
const Variant = require("../models/variantModel");
// get all Stores
const getStores = async (req, res) => {
  const stores = await Store.find({});
  if (!stores) {
    return res.status(404).json({ error: "No such stores" });
  }
  const storeData = await Promise.all(
    stores.map(async (store) => {
      const variant = await Variant.find({ store: store._id.toString() });
      return {
        ...store._doc,
        product: variant.length,
      };
    })
  );

  res.status(200).json(storeData);
};

// get a single Store
const getStore = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such store" });
  }
  const store = await Store.findById(id);

  if (!store) {
    return res.status(404).json({ error: "No such store" });
  }

  res.status(200).json(store);
};

// create a new Store
const createStore = async (req, res) => {
  const { storeName, storeLocation } = req.body.storeName;

  let emptyFields = [];

  if (!storeName) {
    emptyFields.push("storeName");
  }
  if (!storeLocation) {
    emptyFields.push("storeLocation");
  }
  console.log(req.body);
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const store = await Store.create({
      storeName,
      storeLocation,
    });
    res.status(200).json(store);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Store
const deleteStore = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such store" });
  }

  const store = await Store.findOneAndDelete({ _id: id });

  if (!store) {
    return res.status(400).json({ error: "No such store" });
  }

  res.status(200).json(store);
};

// update a Store
const updateStore = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such store" });
  }

  const store = await Store.findOneAndUpdate(
    { _id: id },
    {
      ...req.body.body,
    }
  );

  if (!store) {
    return res.status(400).json({ error: "No such store" });
  }

  res.status(200).json(store);
};

module.exports = {
  getStores,
  getStore,
  createStore,
  deleteStore,
  updateStore,
};
