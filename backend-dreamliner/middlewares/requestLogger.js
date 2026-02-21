const { logger } = require("../config/logger");

function requestLogger(req, res, next) {
  const start = Date.now();

  //   Log setiap request masuk
  logger.http("Incoming Request", {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get("User-Agent"),
  });

  //   Log response saat selesai
  res.on("finish", () => {
    const duration = Date.now() - start;

    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.connection.remoteAddress,
    };

    // Pilih level log berdasarkan status code
    if (res.statusCode >= 500) {
      logger.error("Server Error Response", logData);
    } else if (res.statusCode >= 400) {
      logger.warn("Client Error Response", logData);
    } else if (res.statusCode >= 300) {
      logger.info("Redirection Response", logData);
    } else {
      logger.http("Successful Response", logData);
    }
  });

  next();
}

module.exports = {
  requestLogger,
};
