const { logger } = require("../config/logger");

function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let message = "Internal Server Error";

  switch (err.name) {
    case "SequelizeValidationError":
      statusCode = 400;
      message = err.errors.map((el) => el.message);
      break;

    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      message = err.errors.map((el) => el.message[0]);
      break;

    case "LOGIN_INPUT_INVALID":
      statusCode = 400;
      message = "Email and Password are required.";
      break;

    case "LOGIN_EMAIL_PASS_INVALID":
      statusCode = 401;
      message = "Invalid email or password.";
      break;

    case "USER_NOT_VERIFIED":
      statusCode = 403;
      message = "User email is not verified.";
      break;

    case "FORBIDDEN":
      statusCode = 403;
      message = "You do not have permission to access this resource.";
      break;

    case "UNAUTHORIZED":
      statusCode = 401;
      message = "Authentication is required to access this resource.";
      break;

    case "JsonWebTokenError":
      statusCode = 401;
      message = "Invalid token.";
      break;

    case "TokenExpiredError":
      statusCode = 401;
      message = "Your token has expired.";
      break;

    case "REGISTER_INPUT_INVALID":
      statusCode = 400;
      message = "Username, Email, and Password are required.";
      break;

    case "REGISTER_USERNAME_EXISTS":
      statusCode = 400;
      message = "Username already exists. Please choose another one.";
      break;

    case "REGISTER_EMAIL_EXISTS":
      statusCode = 400;
      message = "Email already exists. Please use another email.";
      break;

    case "VERIFY_EMAIL_INPUT_INVALID":
      statusCode = 400;
      message = "Verification token is required.";
      break;

    case "USER_NOT_FOUND":
      statusCode = 404;
      message = "User not found.";
      break;

    case "USER_UPDATE_FAILED":
      statusCode = 500;
      message = "Failed to update user verification status.";
      break;

    case "POST_ID_REQUIRED":
      statusCode = 400;
      message = "Post ID is required.";
      break;

    case "COMMENT_CONTENT_REQUIRED":
      statusCode = 400;
      message = "Comment content is required.";
      break;

    case "POST_NOT_FOUND":
      statusCode = 404;
      message = "Post not found.";
      break;

    case "USERNAME_IS_REQUIRED":
      statusCode = 400;
      message = "Username is required.";
      break;

    default:
      break;
  }

  //   Log error
  const logData = {
    name: err.name,
    message: message,
    statusCode: statusCode,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    UserId: req.user?.id || null,
    email: req.body?.email || null, // ← Business context
  };

  //   Log error berdasarkan status code
  if (statusCode >= 500) {
    logger.error("Server Error", {
      ...logData,
      stack: err.stack,
    });
  } else if (statusCode >= 400) {
    logger.warn("Client Error", logData);
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    data: null,
  });
}

module.exports = {
  errorHandler,
};
