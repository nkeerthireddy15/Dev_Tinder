const express = require("express");
const { adminauth, userauth } = require("./middlewares/auth");
const app = express();
const connectDb = require("./database");
const User = require("./models/users");
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
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(200).send("user added");
  } catch (err) {
    res.status(400).send("error saving data", +err.message);
  }
});
