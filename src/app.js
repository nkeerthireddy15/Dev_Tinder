const express = require("express");
const { adminauth, userauth } = require("./middlewares/auth");
const app = express();
const connectDb = require("./database");
const User = require("./models/users");
const { validateSignup } = require("./Utils/Validatos");
const bcrypt = require("bcrypt");
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.send("Invalid credentials");
    } else {
      res.send("Successfully logged in");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
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

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("Deleted successfully");
  } catch {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  console.log(userId, req.body);
  try {
    const allowedupdated = [
      "firstName",
      "lastName",
      "photoUrl",
      "about",
      "password",
      "gender",
      "age",
      "skills",
    ];
    const isAllowed = Object.keys(data).every((k) =>
      allowedupdated.includes(k)
    );
    console.log(isAllowed, 1034);
    if (!isAllowed) {
      throw new Error("Updates not allowed");
    }
    // const user = await User.findByIdAndUpdate({ _id: userId }, data, {
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send("updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
