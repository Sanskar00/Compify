const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderDetails: {
      products: [],
      addresses: [],
    },
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

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
