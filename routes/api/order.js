const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const PersonalInfo = require("../../models/Personal");
const { body, validationResult } = require("express-validator");

router.post("/:addressId/:productId", auth, async (req, res) => {
  try {
    const errors = validationResult(req);

    let order = await Order.findOne({ user: req.user.id });

    const product = await Product.findById(req.params.productId);

    const personalInfo = await PersonalInfo.findOne({ user: req.user.id });

    const address = personalInfo.addresses.find(
      (address) => address.id === req.params.addressId
    );

    console.log(personalInfo);
    console.log(`add product ${product}`);
    console.log(`address ${address}`);

    // if (order) {
    //   const images = product.productImage;

    //   let orderDetails = order.orderDetails;

    //   orderDetails.addresses.unshift({
    //     _id: req.body.addressID,
    //     name: address.name,
    //     pincode: address.pincode,
    //     address: address.address,
    //     cityDistrictTown: address.cityDistrictTown,
    //     state: address.state,
    //     landmark: address.landmark,
    //     alternatePhone: address.alternatePhone,
    //     addressType: address.addressType,
    //   });

    //   orderDetails.products.unshift({
    //     _id: req.params.productId,
    //     productImage: images,
    //     model: product.model,
    //     cpuType: product.cpuType,
    //     memorySize: product.memorySize,
    //     storageSize: product.storageSize,
    //     display: product.display,
    //     quantity: product.quantity,
    //     productPrice: product.productPrice,
    //   });
    //   await order.save();
    // } else {
    //   const images = product.productImage;

    //   order = new Order({
    //     user: req.user.id,
    //     orderDetails: {
    //       products: [
    //         {
    //           _id: req.params.productId,
    //           productImage: images,
    //           model: product.model,
    //           cpuType: product.cpuType,
    //           memorySize: product.memorySize,
    //           storageSize: product.storageSize,
    //           display: product.display,
    //           quantity: product.quantity,
    //           productPrice: product.productPrice,
    //         },
    //       ],
    //       addresses: {
    //         _id: req.body.addressID,
    //         // name: address.name,name: address.name,
    //         pincode: address.pincode,
    //         address: address.address,
    //         cityDistrictTown: address.cityDistrictTown,
    //         state: address.state,
    //         landmark: address.landmark,
    //         alternatePhone: address.alternatePhone,
    //         addressType: address.addressType,
    //       },
    //     },
    //   });
    //   await order.save();
    // }

    // res.json(order);
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
