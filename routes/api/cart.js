const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

//@route put api/cart/:productId
//@desc Add a product into a cart
//@access Protected
router.post("/:productId", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });

    const product = await Product.findById(req.params.productId);

    console.log(`add product ${product}`);

    if (cart) {
      const isCart = product.isCart.find((user) => user.user == req.user.id);

      const images = product.productImage;

      if (!isCart) {
        cart.products.unshift({
          _id: req.params.productId,
          productImage: images,
          model: product.model,
          cpuType: product.cpuType,
          memorySize: product.memorySize,
          storageSize: product.storageSize,
          display: product.display,
          quantity: product.quantity,
          productPrice: product.productPrice,
        });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: "Product already added" }] });
      }
      product.isCart.unshift({ user: req.user.id });
      await cart.save();
      await product.save();
    } else {
      const images = product.productImage;
      cart = new Cart({
        user: req.user.id,
        products: [
          {
            _id: req.params.productId,
            productImage: images,
            model: product.model,
            cpuType: product.cpuType,
            memorySize: product.memorySize,
            storageSize: product.storageSize,
            display: product.display,
            quantity: product.quantity,
            productPrice: product.productPrice,
          },
        ],
      });
      product.isCart.unshift({ user: req.user.id });
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route get api/cart
//@desc get a cart
//@access Protected
router.get("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    const products = cart.products;

    if (!cart || products.length === 0) {
      return res.status(404).json({ msg: "Product is not added" });
    }

    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route delete api/cart/:productId
//@desc  remove product from cart
//@access Protected
router.delete("/delete/:productId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    const product = await Product.findById(req.params.productId);
    console.log(`remove product${req.params.productId}`);
    const removedProduct = cart.products.filter(
      (product) => product._id != req.params.productId
    );

    cart.products = removedProduct;

    const removedUser = product.isCart.filter(
      ({ user }) => user != req.user.id
    );
    console.log(product);
    product.isCart = removedUser;

    await product.save();
    await cart.save();

    res.json({ cart });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
