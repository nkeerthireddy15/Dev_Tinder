const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://keerthireddy15:Nkeerthi1234@cluster0.2it9r0k.mongodb.net/devTinder"
  );
};

module.exports = connectDb;
