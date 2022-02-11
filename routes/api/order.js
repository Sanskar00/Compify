const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const PersonalInfo = require("../../models/Personal");
const { body, validationResult } = require("express-validator");
const stripe = require("stripe")(
  "sk_test_51K0RvbSHqep0AJHbmysnTuSNsLp7ohhGS6thayodJOkEVjdxXSft0d8f7ZfBaeSDQXx5wvZZbIs8UZklFWJhBfTU00dylibS8m"
);

router.post("/:addressId/:productId", auth, async (req, res) => {
  try {
    const errors = validationResult(req);

    let order = await Order.findOne({ user: req.user.id });

    const product = await Product.findById(req.params.productId);

    const personalInfo = await PersonalInfo.findOne({ user: req.user.id });

    const address = personalInfo.addresses.find(
      (address) => address.id === req.params.addressId
    );

    console.log(address);

    if (order) {
      let orderDetails = {
        product,
        address,
      };

      order.orderDetails.unshift(orderDetails);

      await order.save();
    } else {
      order = new Order({
        user: req.user.id,
        orderDetails: [
          {
            product,
            address,
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

router.post("/payment_intent", auth, async (req, res) => {
  try {
    const payment = await stripe.paymentIntents.create({
      customer: req.body.customer_id,
      payment_method: req.body.payment_intent_id,
      amount: req.body.amount * 100,
      currency: "inr",
    });

    if (!payment) {
      return res
        .status(400)
        .json({ errors: [{ msg: "NO payment intent created" }] });
    }

    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/payment_intent_direct", auth, async (req, res) => {
  try {
    const payment = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let order = await Order.findOne({ user: req.user.id });
    const products = order.orderDetails.products;

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
