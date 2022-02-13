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
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
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
