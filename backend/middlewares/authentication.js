const { verify } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = (req, res, next) => {
  if (!req.headers.access_token) {
    next({ name: "NotLogin " });
  } else {
    const decoded = verify(req.headers.access_token.split(" ")[0]);
    User.findByPk(decoded.id)
      .then((data) => {
        if (data) {
          let { id, email, role } = data;
          req.currentUser = { id, email, role };
          next();
        } else {
          next({ name: "InvalidToken" });
        }
      })
      .catch((err) => {
        next({ name: "InternalError", message: err.message });
      });
  }
};
