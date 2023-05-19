const express = require("express");
const {
  getProducts,
  getOneProduct,
  createProduct,
} = require("../controllers/productControllers");
const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken");
const router = express.Router();
router.route("/").get(getProducts);
router.route("/find/:id").get(getOneProduct);
router.route("/").post(verifyTokenAdmin, createProduct);
module.exports = router;
