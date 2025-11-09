const express = require("express");
const requestRouter = express.Router();
const { userauth } = require("../middlewares/auth");
const User = require("../models/users");
const ConnectionRequestSchema = require("../models/ConnectionRequestModel");
requestRouter.post(
  "/request/send/:status/:toUserId",
  userauth,
  async (req, res) => {
    try {
      const user = req.user;
      const fromUserId = user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(req.params.status)) {
        return res.status(400).json({ message: "Invalid Status type" });
      }

      const userId = await User.findById(toUserId);
      if (!userId) {
        return res.status(404).send({ message: "User Not Found!" });
      }

      // if existing connectionrequest
      const existingconnectionrequest = await ConnectionRequestSchema.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingconnectionrequest) {
        return res
          .status(400)
          .send({ message: "Connection request already exists!" });
      }

      const connectionReq = new ConnectionRequestSchema({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionReq.save();
      res.json({
        data: data,
        message:
          req.user.firstName + " is " + status + " in " + userId.firstName,
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

module.exports = requestRouter;

// if we make any field as unique, then mongodb automatically creates index or index:true also can be gien
