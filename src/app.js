const express = require("express");

const app = express();

app.use(
  "/hello",
  (req, res, next) => {
    console.log("one");
    res.send("hellookeerthi!!!!");
    next();
  },
  (req, res) => {
    console.log("two");
    res.send("hello response2");
  }
);

app.listen(7777, () => {
  console.log("app is listening at 77777");
});
