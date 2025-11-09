const express = require("express");
const profileRouter = express.Router();
const { userauth } = require("../middlewares/auth");
const { User } = require("../models/users");
const { validateEditFields } = require("../Utils/Validatos");
profileRouter.get("/profile/view", userauth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

profileRouter.patch("/profile/edit", userauth, async (req, res) => {
  try {
    // validateEditFields(req);
    console.log(req.user, 777);
    if (validateEditFields(req)) {
      const loggedinuser = req.user;
      Object.keys(req.body).forEach(
        (key) => (loggedinuser[key] = req.body[key])
      );

      await loggedinuser.save();

      res.json({
        message: `${loggedinuser.firstName}, your profile updated successfully`,
        data: loggedinuser,
      });
    } else {
      throw new Error("Invalid edit request");
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = profileRouter;
