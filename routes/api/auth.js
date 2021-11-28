const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const User = require("../../models/Users");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route Get api/users
//@desc Test route
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route Post api/auth
//@desc Authentication user & get token
//@access Public
router.post(
  "/",

  [
    body("mobileNumber")
      .not()
      .isEmpty()
      .withMessage("mobile number is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { mobileNumber, password } = req.body;

    try {
      let user = await User.findOne({ mobileNumber });

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid credentials" }] });
      }

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
    }
    console.log(req.body);
  }
);

module.exports = router;
