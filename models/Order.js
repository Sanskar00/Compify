const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderDetails: [
      {
        product: {
          type: Object,
        },
        address: {
          type: Object,
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

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
