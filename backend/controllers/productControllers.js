const asyncHandler = require("express-async-handler");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../models/ProductModel");

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find(req.query);
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});
const getOneProduct = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(500).json({ msg: "No Product with id" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});
const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create({ ...req.body });
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
  }
});
module.exports = { getProducts, getOneProduct, createProduct };
