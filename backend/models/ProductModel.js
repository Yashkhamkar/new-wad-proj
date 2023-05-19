const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
    min: 8,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  review: {
    type: Number,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
