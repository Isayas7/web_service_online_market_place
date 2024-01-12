const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const sendEmail = require("../controllers/mailController");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
  password: {
    type: String,
    required: true,
  },
});

// static create method
userSchema.statics.createUser = async function (
  firstName,
  lastName,
  email,
  phoneNumber,
  gender,
  address,
  role,
  store,
  password
) {
  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !gender ||
    !address ||
    !role
  ) {
    throw Error("All fields must be filled");
  }
  if (!store) {
    store = "Admin";
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  if (role === "admin") {
    const user = await this.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      address,
      role,
      password: hash,
    });
    return user;
  } else {
    const user = await this.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      address,
      role,
      store,
      password: hash,
    });
    sendEmail(email, password);

    return user;
  }
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }
  console.log(user);
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
