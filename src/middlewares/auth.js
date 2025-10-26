const adminauth = (req, res, next) => {
  const token = "xyz";
  const isauthorised = token === "xyfz";
  if (isauthorised) {
    next();
  } else {
    res.status(401).send("admin not authorised");
  }
};
const userauth = (req, res, next) => {
  const token = "xyz";
  const isauthorised = token === "xyfz";
  if (isauthorised) {
    next();
  } else {
    res.status(401).send("admin not authorised");
  }
};

module.exports = {
  adminauth,
  userauth,
};
