const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Order = require("../../models/Order");
const Product = require("../../models/Product");

router.post("/:productId", auth, async (req, res) => {
  try {
    let order = await Order.findOne({ user: req.user.id });

    const product = await Product.findById(req.params.productId);

    console.log(`add product ${product}`);

    console.log(order);

    if (order) {
      const images = product.productImage;

      order.products.unshift({
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
      await order.save();
    } else {
      const images = product.productImage;
      order = new Order({
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
      await order.save();
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let order = await Order.findOne({ user: req.user.id });
    const products = order.products;

    if (!order || products.length === 0) {
      return res.status(404).json({ msg: "No product is ordered" });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
