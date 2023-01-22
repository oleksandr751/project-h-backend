const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const router = Router();

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Minimal password length is 6 symbols").isLength({
      min: 6,
    }),
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data",
        });
      }
      const { signUpForm } = req.body;

      const candidate = await User.findOne({ username: signUpForm.username });
      const candidateEmail = await User.findOne({ email: signUpForm.email });

      if (candidate || candidateEmail) {
        return res.status(400).json({ message: "Such user already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(signUpForm.password, 12);
        signUpForm.password = hashedPassword;
        const user = new User(signUpForm);
        await user.save(function (err: any) {
          if (err) return console.error(err);
          console.log("Document inserted successfully!");
        });

        res.status(201).json({ message: "User created" });
      }
    } catch (e) {
      res.status(500).json({ message: "Something went wrong try again" });
    }
  }
);
module.exports = router;
