const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter valid emailId: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo url " + value);
        }
      },
      default:
        "https://fastly.picsum.photos/id/735/200/300.jpg?hmac=1a236E3f0SNOHOLEh3dxu5_WIFvWaNKYBSZXBWpi6xE",
    },
    about: {
      type: String,
      default: "default about of user",
    },
    skills: {
      type: [String],
      validate: [
        {
          validator: function (value) {
            return value.length <= 10;
          },
          message: "You can add only upto 10 skills",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// indexing
userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEVTINDER@1234#", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordinputbyuser) {
  const user = this;
  const passwordhash = user.password;
  const isValid = await bcrypt.compare(passwordinputbyuser, passwordhash);
  return isValid;
};

module.exports = mongoose.model("User", userSchema);
