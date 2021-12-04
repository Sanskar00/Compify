const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  display: {
    type: String,
    required: true,
  },
  battery: {
    type: String,
    required: true,
  },
  productWeight: {
    type: String,
    required: true,
  },
  cpuType: {
    type: String,
    required: true,
  },
  productImage: [String],
  operatingSystem: {
    type: String,
    required: true,
  },
  memorySize: {
    type: String,
    required: true,
  },
  storageType: {
    type: String,
    requied: true,
  },
  storageSize: {
    type: String,
    required: true,
  },

  laptopType: {
    type: String,
    required: true,
  },
  isCart: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  customerReviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      stars: {
        type: String,
        requied: true,
      },
      text: {
        type: String,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
