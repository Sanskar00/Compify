const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../../models/Users");
const config = require("config");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

//@ route Post api/users
//@decs register route
//@acess Public

router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("Name is required "),

    body("mobileNumber").not().isEmpty().withMessage("Number is required"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password must be of length 5 or greater"),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, mobileNumber, email, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: "User already exists" }],
        });
      }

      user = new User({
        name,
        mobileNumber,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");

      console.log(req.body);
    }
  }
);

router.put(
  "/editInfo",
  [
    auth,
    [
      body("name").not().isEmpty().withMessage("Name is required "),

      body("mobileNumber").not().isEmpty().withMessage("Number is required"),
      body("email").not().isEmpty().withMessage("Email is required"),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, mobileNumber, email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: "User already exists with this email" }],
        });
      }
      //See if user exists
      user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: req.body }
      );

      await user.save();

      return res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");

      console.log(req.body);
    }
  }
);

module.exports = router;
