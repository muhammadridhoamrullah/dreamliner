if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { router } = require("./routes");
const { requestLogger } = require("./middlewares/requestLogger");
const { errorHandler } = require("./middlewares/errorHandling");
const { logger } = require("./config/logger"); // ← TAMBAH
const { connectRabbitMQ, closeRabbitMQ } = require("./config/rabbitmq"); // ← TAMBAH

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(requestLogger);

app.use(router);

app.use(errorHandler);

// ============================================
// START SERVER FUNCTION
// ============================================

async function startServer() {
  try {
    // 1. Connect ke RabbitMQ sebelum server mulai menerima request
    await connectRabbitMQ();

    // 2. Start Server
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    logger.error("Error starting server", {
      error: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
}

// Graceful shutdown handlers
process.on("SIGINT", async () => {
  logger.info("🛑 SIGINT received, shutting down gracefully...");
  await closeRabbitMQ();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  logger.info("🛑 SIGTERM received, shutting down gracefully...");
  await closeRabbitMQ();
  process.exit(0);
});

startServer();
// ====== SAMPAI SINI ======

// CD 1
