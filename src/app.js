const express = require("express");
const { userauth } = require("./middlewares/auth");
const app = express();
const connectDb = require("./database");
const User = require("./models/users");
const { validateSignup } = require("./Utils/Validatos");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const authRouter = require("./routes/authRoute");
const requestRouter = require("./routes/Requests");
const profileRouter = require("./routes/ProfileRouter");

connectDb()
  .then(() => {
    console.log("connection established");
    app.listen(7777, () => {
      console.log("app is listening at 77777");
    });
  })
  .catch((err) => {
    console.error("connection not possible");
  });

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
