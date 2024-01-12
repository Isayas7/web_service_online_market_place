const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Store = require("../models/storeModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create token
    const token = createToken(user._d);
    const role = user.role;
    const store = user.store;
    const _id = user._id;

    res.status(200).json({ email, role, store, _id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  create user
const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    address,
    role,
    store,
  } = req.body;
  const password = "ABCabc123@#";
  try {
    const user = await User.createUser(
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      address,
      role,
      store,
      password
    );

    // create token
    const token = createToken(user._d);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single user
const getUser = async (req, res) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findById(_id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// get  users
const getUsers = async (req, res) => {
  const users = await User.find({});

  const usersData = await Promise.all(
    users.map(async (user) => {
      if (user.role === "sm") {
        const store = await Store.findById(user.store.toString());
        return {
          storeName: store
            ? `${store.storeLocation}(${store.storeName})`
            : null,
          ...user._doc,
        };
      } else {
        return {
          ...user._doc,
        };
      }
    })
  );
  if (!usersData) {
    return res.status(404).json({ error: "No such user" });
  }
  res.status(200).json(usersData);
};

// update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { editedRow } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }

  const user = await User.findOneAndUpdate({ _id: id }, editedRow);

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }
  res.status(200).json(user);
};

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }
  const user = await User.findOneAndDelete({
    _id: id,
  });
  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }
  res.status(200).json(user);
};



module.exports = {
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  createUser,
};
