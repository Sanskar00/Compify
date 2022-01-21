const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        productImage: {
          type: [String],
        },
        model: {
          type: String,
          required: true,
        },
        cpuType: {
          type: String,
          required: true,
        },
        memorySize: {
          type: String,
          required: true,
        },
        storageSize: {
          type: String,
          required: true,
        },
        display: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        productPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    modiefiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
