const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/Users");
const PersonalInfo = require("../../models/Personal");
const stripe = require("stripe")(
  "sk_test_51K0RvbSHqep0AJHbmysnTuSNsLp7ohhGS6thayodJOkEVjdxXSft0d8f7ZfBaeSDQXx5wvZZbIs8UZklFWJhBfTU00dylibS8m"
);
const bcypt = require("bcryptjs");

//@route put api/personalInfo/address/
//@desc Add a address
//@access Protected

router.post(
  "/address",
  [
    auth,
    [
      body("name").not().isEmpty().withMessage("Name is required"),
      body("mobileNumber")
        .not()
        .isEmpty()
        .withMessage("Mobile Number is required"),
      body("pincode").not().isEmpty().withMessage("Pincode is required "),
      body("address").not().isEmpty().withMessage("address is required"),
      body("cityDistrictTown")
        .not()
        .isEmpty()
        .withMessage("City or District or Town is required"),
      body("state").not().isEmpty().withMessage("State is required"),
      body("addressType")
        .not()
        .isEmpty()
        .withMessage("Address Type is required"),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      mobileNumber,
      pincode,
      address,
      cityDistrictTown,
      state,
      landmark,
      alternatePhone,
      addressType,
      defaultAddress,
    } = req.body;

    try {
      let personalInfo = await PersonalInfo.findOne({
        user: req.user.id,
      });
      if (personalInfo) {
        const user = await User.findById(req.user.id).select("-password");
        const newAddress = {
          user: req.user.id,
          name,
          mobileNumber,
          pincode,
          address,
          cityDistrictTown,
          state,
          landmark,
          alternatePhone,
          addressType,
          defaultAddress,
        };

        if (defaultAddress) {
          const address = personalInfo.addresses.find(
            (address) => address.defaultAddress === true
          );

          address.defaultAddress = false;
        }

        personalInfo.addresses.unshift(newAddress);
        await personalInfo.save();
        res.json(personalInfo.addresses);
      } else {
        personalInfo = new PersonalInfo({
          user: req.user.id,
          addresses: [
            {
              user: req.user.id,
              name,
              mobileNumber,
              pincode,
              address,
              cityDistrictTown,
              state,
              landmark,
              alternatePhone,
              addressType,
              defaultAddress,
            },
          ],
        });
        await personalInfo.save();
        res.json(personalInfo.addresses);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");

      console.log(req.body);
    }
  }
);

//@route put api/personalInfo/address/
//@desc get adresses
//@access Protected
router.get("/address", auth, async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findOne({ user: req.user.id });

    if (!personalInfo) {
      return res.status(404).json({ msg: "No Personal Info found" });
    }
    res.json(personalInfo.addresses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

    console.log(req.body);
  }
});

//@route delete api/personalInfo/address/delelte
//@desc delelte adress
//@access Protected
router.delete("/address/delete/:addressId", auth, async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findOne({ user: req.user.id });
    if (!personalInfo) {
      return res.status(404).json({ msg: "No Personal Info found" });
    }

    const addresses = personalInfo.addresses;

    const fileteredAddresses = addresses.filter(
      (address) => address.id !== req.params.addressId
    );

    personalInfo.addresses = fileteredAddresses;
    await personalInfo.save();

    res.json(personalInfo.addresses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

    console.log(req.body);
  }
});

//@route update api/personalInfo/address/default/:addressId
//@desc update a defaultAddress
//@access Protected
router.put("/address/default/:addressId", auth, async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findOne({ user: req.user.id });

    if (!personalInfo) {
      return res.status(404).json({ msg: "No Personal Info found" });
    }

    const addresses = personalInfo.addresses;

    const defaultAddress = addresses.find(
      (address) => address.defaultAddress == true
    );

    const updateAddress = addresses.find(
      (address) => address.id === req.params.addressId
    );

    if (defaultAddress) {
      defaultAddress.defaultAddress = false;
      updateAddress.defaultAddress = true;
    } else {
      updateAddress.defaultAddress = true;
    }

    await personalInfo.save();

    res.json(personalInfo.addresses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

    console.log(req.body);
  }
});

//@route post api/v1/checkout.sessions
//@desc Create a Session
//@acess Protected
router.post("/v1/checkout/sessions", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(req.body.url);

    const customers = await stripe.customers.list();

    const customerData = customers.data;
    const isID = customerData.find((data) => data.id === user.customerIdStripe);
    let customer = "";

    // checking customer stripe id
    if (isID) {
      customer = await stripe.customers.retrieve(user.customerIdStripe);
    } else {
      customer = await stripe.customers.create({
        name: `${user.name}`,
        email: `${user.email}`,
      });

      await User.updateOne(
        { user: req.user.id },
        { customerIdStripe: customer.id }
      );
      await user.save();
    }
    const session = await stripe.checkout.sessions.create({
      mode: "setup",
      payment_method_types: ["card"],
      success_url: req.body.url,
      cancel_url: req.body.url,
      customer: customer.id,
    });

    const session_url = session.url;

    res.json({ session, session_url });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

    console.log(req.body);
  }
});

//@route get /v1/customers/cards/:id
//@desc get a card list
//@access Protected
router.get("/v1/customers/cards", auth, async (req, res) => {
  try {
    console.log();
    const user = await User.findById(req.user.id).select("-password");

    const customers = await stripe.customers.list();

    const customerData = customers.data;
    const isID = customerData.find((data) => data.id === user.customerIdStripe);

    if (isID) {
      const cards = await stripe.paymentMethods.list({
        customer: user.customerIdStripe,
        type: "card",
      });
      return res.json(cards.data);
    } else {
      return res.status(400).json({
        errors: [{ msg: "No card is added" }],
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

    console.log(req.body);
  }
});

//@route delete /v1/customers/cards/delete/:cardId
//@desc delete a card
//@access Protected
router.delete("/v1/customers/cards/delete/:cardId/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const customers = await stripe.customers.list();

    const customerData = customers.data;
    const isID = customerData.find((data) => data.id === user.customerIdStripe);

    if (isID) {
      const paymentMethod = await stripe.paymentMethods.detach(
        req.params.cardId
      );

      res.json(paymentMethod);
    } else {
      return res.status(400).json({
        errors: [{ msg: "No card is added" }],
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
    console.log(req.body);
  }
});

module.exports = router;
