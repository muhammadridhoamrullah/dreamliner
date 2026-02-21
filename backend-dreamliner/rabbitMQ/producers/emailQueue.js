const { logger } = require("../../config/logger");
const { getChannel } = require("../../config/rabbitmq");

// Ini untuk mengelola semua fungsi yang berhubungan dengan RabbitMQ, khususnya untuk mengirim email melalui queue RabbitMQ
// Ini yang dipanggil dari controller untuk mengirim email, kita tidak langsung kirim email dari controller, tapi kita kirim ke RabbitMQ, nanti RabbitMQ yang akan memproses dan mengirim emailnya, ini untuk membuat aplikasi lebih scalable dan tidak blocking saat mengirim email yang biasanya butuh waktu lama
// Kirim message ke worker

// Nama Queue yang digunakan untuk mengirim email
const QUEUE = {
  EMAIL: "email_queue",
  NOTIFICATION_LOGIN: "notification_login_queue",
};

// Async function untuk mengirim verification email ke RabbitMQ
async function sendVerificationEmail(data) {
  try {
    // Panggil channel RabbitMQ
    const channel = await getChannel();

    // Kirim data ke queue
    await channel.assertQueue(QUEUE.EMAIL, { durable: true });

    // Buat message
    const message = {
      type: "verification_email",
      email: data.email,
      UserId: data.UserId,
      username: data.username,
      timestamp: new Date(),
      link: data.link,
    };

    // Kirim message ke queue
    const sent = channel.sendToQueue(
      QUEUE.EMAIL,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
      },
    );
    console.log(sent, "Ini sent email queue");

    if (sent) {
      logger.info("Verification email sent to RabbitMQ", {
        email: data.email,
        UserId: data.UserId,
      });
    }

    return sent;
  } catch (error) {
    logger.error("Failed to send verification email to RabbitMQ", {
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

// 2. SEND NOTIFICATION LOGIN
// Async function untuk memproses email notification login berhasil dari RabbitMQ
async function sendLoginNotification(data) {
  try {
    logger.info("Sending login notification to RabbitMQ", {
      email: data.email,
    });

    // 1. Panggil channel RabbitMQ
    const channel = await getChannel();

    // 2. Pastikanm queue sudah ada, jika belum ada maka buat queue baru, ini untuk memastikan bahwa queue yang kita tuju sudah siap menerima message
    await channel.assertQueue(QUEUE.NOTIFICATION_LOGIN, { durable: true });

    // 3. Buat message yang akan dikirim ke queue, message ini berisi informasi yang dibutuhkan untuk mengirim email notification login berhasil, seperti email user yang login dan timestamp login, nanti di worker kita bisa menggunakan informasi ini untuk mengirim email ke user
    const message = {
      type: "login_notification",
      email: data.email,
      timestamp: new Date(),
      device: data.device,
      ipAddress: data.ipAddress,
    };

    // 4. Kirim message ke queue, kita convert message ke format buffer karena RabbitMQ hanya bisa menerima data dalam format buffer, kita juga set opsi persistent ke true agar message tetap ada di queue meskipun RabbitMQ restart, ini untuk memastikan bahwa email notification tetap terkirim meskipun terjadi masalah pada RabbitMQ
    const sent = channel.sendToQueue(
      QUEUE.NOTIFICATION_LOGIN,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
      },
    );

    if (sent) {
      logger.info("✅ Login notification sent to RabbitMQ", {
        email: data.email,
      });
    } else {
      logger.warn("⚠️ Failed to send login notification to RabbitMQ", {
        email: data.email,
      });
    }

    return sent;
  } catch (error) {
    logger.error("❌ Failed to send login notification to RabbitMQ", {
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

module.exports = {
  sendVerificationEmail,
  sendLoginNotification,
  QUEUE,
};
