module.exports = (err, req, res, next) => {
  let code;
  let message;
  let messages;
  switch (err.name) {
    case "InvalidToken":
      code = 403;
      message = "Invalid Token";
      break;
    case "InternalError":
      code = 500;
      message = err.message;
      break;
    case "Unauthorized":
      code = 403;
      message = "Unauthorized";
      break;
    case "Validations":
      code = 400;
      message = err.messages;
      break;
    case "Invalid":
      code = 401;
      message = "Invalid";
      break;
    case "Required":
      code = 404;
      message = "Email or Password is Required";
      break;
    case "UserNotFound":
      code = 404;
      message = "User Not Found";
      break;
    case "NotLogin":
      code = 403;
      message = "Please Login First";
      break;
    default:
      code = 500;
      message = "Internal Server Error";
      break;
  }
  if (messages) {
    console.log(err);
    res.status(code).json({ messages });
  } else {
    res.status(code).json({ message });
  }
};
