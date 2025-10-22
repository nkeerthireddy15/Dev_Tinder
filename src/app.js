const express = require("express");

const app = express();

app.use("/admin", (req, res, next) => {
  const token = "xyz";
  const isauthorised = token === "xyz";
  if (isauthorised) {
    next();
  } else {
    res.status(401).send("admin not authorised");
  }
});

app.get("/admin/user", (req, res, next) => {
  res.send("hello response");
});

app.get("/admin/delete", (req, res, next) => {
  res.send("hello response delete");
});

app.listen(7777, () => {
  console.log("app is listening at 77777");
});
