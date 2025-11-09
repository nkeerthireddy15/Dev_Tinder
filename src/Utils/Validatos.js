const validator = require("validator");

const validateSignup = (req) => {
  const { firstName, lastName, password, emailId } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid ");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter strong password");
  }
};

const validateEditFields = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "age",
    "about",
    "photoUrl",
    "skills",
    "gender",
  ];

  const isAllowed = Object.keys(req.body).every((k) =>
    allowedFields.includes(k)
  );
  return isAllowed;
};
module.exports = { validateSignup, validateEditFields };
