const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");

// Definisikan format log
const logFormat = winston.format.combine(
  // Tambahkan timestamp ke setiap log
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),

  //   Tangkap error stack trace
  winston.format.errors({ stack: true }),

  //   Support string interpolation
  winston.format.splat(),

  //   Ubah menjadi JSON format
  winston.format.json(),
);

// Error log transport ( terpisah )

const errorTransport = new DailyRotateFile({
  filename: path.join("logs", "error-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  level: "error",
  maxSize: "20m",
  maxFiles: "30d",
  zippedArchive: true,
  format: logFormat,
});

// Semua log transport

const combinedTransport = new DailyRotateFile({
  filename: path.join("logs", "app-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxSize: "50m",
  maxFiles: "30d",
  zippedArchive: true,
  format: logFormat,
});

// Console transport untuk development
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: "HH:mm:ss",
    }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      let msg = `${timestamp} [${level}]: ${message} `;

      if (Object.keys(meta).length) {
        msg += JSON.stringify(meta);
      }
      return msg;
    }),
  ),

  level: "debug",
});

// Buat logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: { service: "dreamliner-backend" },
  transports: [errorTransport, combinedTransport],
});

// Tambahkan console transport jika bukan production
if (process.env.NODE_ENV !== "production") {
  logger.add(consoleTransport);
}

module.exports = {
  logger,
};
