const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Product = require("../../models/Product");
const User = require("../../models/Users");

//@route Post api/products
//@desc Create a product
//@access Public
router.post(
  "/",
  [
    body("brand").not().isEmpty().withMessage("Brand is required"),
    body("model").not().isEmpty().withMessage("Model is required"),
    body("productPrice")
      .not()
      .isEmpty()
      .withMessage("Product price is required"),
    body("display").not().isEmpty().withMessage("Display is required"),
    body("battery").not().isEmpty().withMessage("Battery is required"),
    body("productWeight")
      .not()
      .isEmpty()
      .withMessage("Product Weight is required"),
    body("cpuType").not().isEmpty().withMessage("Cpu types is required"),
    body("productImage")
      .not()
      .isEmpty()
      .withMessage("Must contain product image"),
    body("operatingSystem")
      .not()
      .isEmpty()
      .withMessage("Operating System is required"),
    body("memorySize").not().isEmpty().withMessage("Memory Size is required"),
    body("storageType").not().isEmpty().withMessage("Storage Type is required"),
    body("storageSize").not().isEmpty().withMessage("Storage Size is required"),
    body("laptopType").not().isEmpty().withMessage("Laptop Type is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      brand,
      model,
      productPrice,
      display,
      battery,
      productWeight,
      cpuType,
      productImage,
      operatingSystem,
      memorySize,
      storageType,
      storageSize,
      laptopType,
    } = req.body;

    try {
      const product = new Product({
        brand,
        model,
        productPrice,
        display,
        battery,
        productWeight,
        cpuType,
        productImage,
        operatingSystem,
        memorySize,
        storageType,
        storageSize,
        laptopType,
      });
      await product.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");

      console.log(req.body);
    }
  }
);

//@route Get api/products
//@desc Get all products
//@access Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

    console.log(req.body);
  }
});

//@route Get api/product/:id
//@desc Get a product
//@access Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

    console.log(req.body);
  }
});

//@route Put api/product/review/:id
//@desc Create a review
//@access Private
router.put(
  "/review/:id",
  [auth, body("stars").not().isEmpty().withMessage("stars is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const product = await Product.findById(req.params.id);
      const user = await User.findById(req.user.id).select("-password");
      console.log(user);

      const newReview = {
        user: req.user.id,
        stars: req.body.stars,
        text: req.body.text,
        name: user.name,
      };

      product.customerReviews.unshift(newReview);
      await product.save();
      res.json(product.customerReviews);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");

      console.log(req.body);
    }
  }
);

//@route Get api/product/review/:id
//@desc Get a review
//@access Public
router.get("/reviews/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const productReviews = await product.customerReviews;

    res.json(productReviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

    console.log(req.body);
  }
});

//@route Get api/product/myReview
//@desc Get a myReview
//@access private
router.get("/myReviews/reviews", auth, async (req, res) => {
  try {
    const products = await Product.find({
      "customerReviews.user": `${req.user.id}`,
    });

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

    console.log(req.body);
  }
});

//@route Get api/product/gaming
//@desc Get a gaming laptops
//@access private
router.get("/laptopType/", async (req, res) => {
  try {
    const gamingProducts = await Product.find();
    res.json(gamingProducts);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");

    console.log(req.body);
  }
});

module.exports = router;
