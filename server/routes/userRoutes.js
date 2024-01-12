const express = require("express");

// controller functions
const {
  loginUser,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const { requireAuth, adminRequireAuth } = require("../middleware/requireAuth");

const router = express.Router();

// login route
router.post("/login", loginUser);
// signup route  (requires authorization)
router.post("/", createUser);

// GET all users (requires authorization)
router.get("/", getUsers);

// GET a single user (requires authorization)
router.get("/:id", getUser);

// DELETE a user (requires authorization)
router.delete("/:id", adminRequireAuth, deleteUser);

// UPDATE a user (requires authorization)
router.patch("/:id", requireAuth, updateUser);

module.exports = router;
