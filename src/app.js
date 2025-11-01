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

// get usr
app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  console.log(email, 990);
  try {
    // const users = await User.find({ emailId: email });
    const users = await User.findOne({ emailId: email });
    // if (users.length === 0) {
    //   res.status(400).send("User not found");
    // }
    res.send(users);
    res.send("data got successfully");
  } catch {
    res.status(400).send("Someting went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch {
    res.status(400).send("Something went wrong");
  }
});
