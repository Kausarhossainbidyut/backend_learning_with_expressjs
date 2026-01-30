const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSchema = require("../schema/userSchema");

const User = new mongoose.model("User", userSchema);

// signup user
router.post("/signup", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email || null,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "Signup was successful",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      error: "Signup failed",
      details: err.message,
    });
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password,
      );

      if (isValidPassword) {
        // generate a token and send to the user
        if (!process.env.JWT_SECRET_KEY) {
          return res.status(500).json({
            error: "Login failed",
            details: "JWT secret key not defined",
          });
        }

        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" },
        );

        res.status(200).json({
          access_token: token,
          message: "Login successful",
        });
      } else {
        return res.status(401).json({ error: "Authentication failed" });
      }
    } else {
      return res.status(401).json({ error: "Authentication failed" });
    }
  } catch (err) {
    res.status(500).json({
      error: "Login failed",
      details: err.message,
    });
  }
});

module.exports = router;
