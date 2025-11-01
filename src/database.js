const mongoose = require("mongoose");
const User = require("./models/users");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://keerthireddy15:Nkeerthi1234@cluster0.2it9r0k.mongodb.net/devTinder"
  );
  User.init(); // ⬅️ This ensures Mongoose builds the indexes
  console.log("Indexes ensured!");
};

module.exports = connectDb;
