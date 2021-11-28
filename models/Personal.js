const mongoose = require("mongoose");

const PersonalInfoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  addresses: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
        required: true,
      },
      mobileNumber: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      cityDistrictTown: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
      },
      alternatePhone: {
        type: String,
      },
      addressType: {
        type: String,
        required: true,
      },
    },
  ],
  cards: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      cardNumber: {
        type: String,
        required: true,
      },
      expiryDate: {
        month: {
          type: String,
          required: true,
        },
        year: {
          type: String,
          required: true,
        },
      },
      nameOnCard: {
        type: String,
        required: true,
      },
    },
  ],
});

const PersonalInfo = mongoose.model("PersonalInfo", PersonalInfoSchema);

module.exports = PersonalInfo;
