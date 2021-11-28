const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/Users");
const PersonalInfo = require("../../models/Personal");
const stripe = require("stripe")(
  "sk_test_51K0RvbSHqep0AJHb2OtPSGvXHWMWjJWaz3TaYVmvmtc7Q36ZJA794yQFWfAUkWbCsiKPyst5ibIhOKxCM8p4VUFq008CEnTj8T"
);

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
        };
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

router.get("/address", auth, async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findOne({ user: req.user.id });

    if (!personalInfo) {
      return res.status(404).json({ msg: "Product not found" });
    }
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

    const customers = await stripe.customers.list();

    const customerData = customers.data;
    const isID = customerData.find((data) => data.id === user.customerIdStripe);

    // checking customer stripe id
    if (isID) {
      const customer = await stripe.customers.retrieve(user.customerIdStripe);
      customer_Id = customer.id;
      const session = await stripe.checkout.sessions.create({
        mode: "setup",
        payment_method_types: ["card"],
        success_url:
          "https://localhost:4242/sucess?sessionId={CHECKOUT_SESSION_ID}",
        cancel_url: "https://localhost:4242/cancel",
        customer: customer_Id,
      });

      const session_url = session.url;

      res.json({ session, customer, session_url });
    } else {
      const customer = await stripe.customers.create({
        name: `${user.name}`,
        email: `${user.email}`,
      });

      customer_Id = customer.id;

      await User.updateOne(
        { user: req.user.id },
        { customerIdStripe: customer.id }
      );
      await user.save();
      const session = await stripe.checkout.sessions.create({
        mode: "setup",
        payment_method_types: ["card"],
        success_url:
          "https://localhost:4242/sucess?sessionId={CHECKOUT_SESSION_ID}",
        cancel_url: "https://localhost:4242/cancel",
        customer: customer_Id,
      });

      const session_url = session.url;

      res.json({ session, customer, session_url });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

    console.log(req.body);
  }
});

//@route put api/personalInfo/card
//@desc Add a card
//@access Protected

module.exports = router;
