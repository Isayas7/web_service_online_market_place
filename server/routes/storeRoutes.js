const express = require("express");

// controller functions
const {
  getStores,
  getStore,
  createStore,
  deleteStore,
  updateStore,
} = require("../controllers/storeController");
const {requireAuth,adminRequireAuth} = require("../middleware/requireAuth");


const router = express.Router();

// GET all Stores
router.get("/", requireAuth, getStores);

// GET a single Store
router.get("/:id", requireAuth, getStore);

// post route
router.post("/", adminRequireAuth, createStore);

// DELETE a Store
router.delete("/:id", adminRequireAuth, deleteStore);

// UPDATE a Store
router.patch("/:id", adminRequireAuth, updateStore);

module.exports = router;
