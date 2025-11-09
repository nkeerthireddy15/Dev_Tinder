const express = require("express");
const authrouter = express.Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateSignup } = require("../Utils/Validatos");
authrouter.post("/signup", async (req, res) => {
  try {
    const { password } = req.body;
    const passwordhash = await bcrypt.hash(password, 10);
    console.log(passwordhash);
    validateSignup(req);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: passwordhash,
      age: req.body.age,
      skills: req.body.skills,
      photoUrl: req.body.photoUrl,
      emailId: req.body.emailId,
    });
    await user.save();
    res.status(200).send("user added");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authrouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValid = await user.validatePassword(password);

    if (!isValid) {
      res.send("Invalid credentials");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Successfully logged in");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authrouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logout Successful");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = authrouter;
