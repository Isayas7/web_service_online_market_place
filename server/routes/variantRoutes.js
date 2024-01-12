const express = require("express");

// controller functions
const {
  getVariants,
  getVariant,
  createVariant,
  deleteVariant,
  updateVariant,
} = require("../controllers/variantController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

// signup route
router.post("/", requireAuth, createVariant);

// GET all Variants (requires authentication)
router.get("/", getVariants);

// GET a single Variant (requires authentication)
router.get("/:id", getVariant);

// DELETE a Variant (requires authentication)
router.delete("/:id", requireAuth, deleteVariant);

// UPDATE a Variant (requires authentication)
router.patch("/:id", requireAuth, updateVariant);

module.exports = router;
