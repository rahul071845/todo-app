const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const passport = require("passport");

router.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({ error: "Login after signup failed" });
      }
      return res
        .status(201)
        .json({ message: "User registered & logged in", user: registeredUser });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(401)
        .json({ error: info.message || "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ error: "Login failed" });
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid"); // remove session cookie
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// Route to check authenticated users
router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user });
  }
  res.status(401).json({ error: "Not authenticated" });
});

module.exports = router;
