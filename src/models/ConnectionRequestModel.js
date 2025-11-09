const mongoose = require("mongoose");

const ConnectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["accepted", "rejected", "ignored", "interested"],
        message: "Value is incorrect status type",
      },
      required: true,
    },
  },
  { timestamps: true }
);

// compund index---makes query will be very fast if we r querying 2 then it should be compund indexed
ConnectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// another type of validation
ConnectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself");
  }
  next();
});

module.exports = mongoose.model(
  "ConnectionRequestModel",
  ConnectionRequestSchema
);
