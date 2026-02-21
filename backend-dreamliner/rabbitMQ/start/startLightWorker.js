const { logger } = require("../../config/logger");
const { connectRabbitMQ, closeRabbitMQ } = require("../../config/rabbitmq");
const { startEmailWorker } = require("../workers/emailWorker");

// TANGGUNG JAWAB: Entry point untuk worker yang akan memproses semua task yang berhubungan dengan email, seperti mengirim email verifikasi, mengirim email notification login berhasil, dll

// ============================================
// File ini adalah yang akan dijalankan oleh Docker worker container
// Command: npm run worker:light

async function startLightWorker() {
  try {
    logger.info("Starting Light Worker...");

    // 1. Connect ke RabbitMQ
    await connectRabbitMQ();

    // 2. Start email worker
    await startEmailWorker();

    logger.info("Light Worker started successfully");
  } catch (error) {
    logger.error("Error starting Light Worker", {
      error: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
}

// Graceful shutdown - tutup koneksi RabbitMQ saat Ctrl+C
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

// Jalankan Light Worker
// ============================================
// Ini akan dijalankan saat file ini dieksekusi
// npm run worker:light -> node rabbitMQ/start/startLightWorker.js
startLightWorker();
