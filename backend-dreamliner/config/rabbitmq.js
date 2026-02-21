const amqp = require("amqplib");
const { logger } = require("./logger");

// Ini untuk mengelola koneksi RabbitMQ secara global di seluruh aplikasi

// Global variable untuk koneksi RabbitMQ

let connection = null;
let channel = null;

// Function untuk menghubungkan ke RabbitMQ

async function connectRabbitMQ() {
  try {
    // 1. Cek apakah sudah ada koneksi yang aktif
    if (connection && channel) {
      logger.info("RabbitMQ connection already established");
      return channel;
    }

    // 2. Ambil URL RabbitMQ dari environment variable atau gunakan default localhost
    const rabbitMQUrl = process.env.RABBITMQ_URL || "amqp://localhost:5672";

    // 3. Logger info koneksi
    logger.info("Connecting to RabbitMQ...", { url: rabbitMQUrl });

    // 4. Buat koneksi ke RabbitMQ
    // Ini seperti membuka pintu ke RabbitMQ, kita butuh alamatnya (URL) untuk masuk
    connection = await amqp.connect(rabbitMQUrl);

    // 5. Buat channel
    // Channel ini seperti ruang kerja di dalam RabbitMQ, kita bisa mengirim dan menerima pesan di sini
    channel = await connection.createChannel();

    // 6. Logger sukses koneksi
    logger.info("Connected to RabbitMQ Successfully");

    // 7. Handler error koneksi, jika terjadi masalah dengan koneksi, kita akan tahu lewat log ini
    connection.on("error", (error) => {
      logger.error("RabbitMQ Connection Error", {
        error: error.message,
        stack: error.stack,
      });
      connection = null;
      channel = null;
    });

    // 8. Handle koneksi terputus
    connection.on("close", () => {
      logger.warn("RabbitMQ Connection Closed");
      connection = null;
      channel = null;
    });

    return channel;
  } catch (error) {
    logger.error("RabbitMQ Connection Error", {
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

// Async function untuk mendapatkan channel RabbitMQ
// Jika channel belum ada, maka akan memanggil connectRabbitMQ untuk membuat koneksi dan channel baru
async function getChannel() {
  if (!channel) {
    await connectRabbitMQ();
  }

  return channel;
}

// Function untuk menutup koneksi RabbitMQ
// Ini untuk menutup koneksi secara graceful ketika aplikasi dimatikan atau tidak lagi membutuhkan koneksi ke RabbitMQ
// Dipanggil saat:
// - Server shutdown (Ctrl+C)
// - Process terminate
async function closeRabbitMQ() {
  try {
    logger.info("Closing RabbitMQ Connection...");

    if (channel) {
      await channel.close();
      logger.info("RabbitMQ Channel Closed");
    }

    if (connection) {
      await connection.close();
      logger.info("RabbitMQ Connection Closed");
    }

    connection = null;
    channel = null;
  } catch (error) {
    logger.error("Error Closing RabbitMQ Connection", { error: error.message });
  }
}

module.exports = {
  connectRabbitMQ,
  getChannel,
  closeRabbitMQ,
};
