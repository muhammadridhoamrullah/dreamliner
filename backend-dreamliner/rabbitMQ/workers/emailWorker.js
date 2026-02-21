const { logger } = require("../../config/logger");
const { transporter } = require("../../config/nodemailer");
const { getChannel } = require("../../config/rabbitmq");

const QUEUE = {
  EMAIL: "email_queue",
  NOTIFICATION_LOGIN: "notification_login_queue",
};

// Buat async function untuk memproses email dari RabbitMQ

async function processVerificationEmail(data) {
  try {
    logger.info("Processing verification email", {
      email: data.email,
      UserId: data.UserId,
    });

    const mailOptions = {
      from: '"Dreamliner" <noreply@dreamliner.com>',
      to: data.email,
      subject: "Email Verification",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1>Hi ${data.username}!</h1>
          <p>Thank you for registering on Dreamliner.</p>
          <p>Please verify your email by clicking the button below:</p>
          <a href="${data.link}"
             style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Verify Email
          </a>

          <p>Thanks,<br>Dreamliner Team</p>

            <div style="margin-top: 20px; font-size: 12px; color: #888;">
            If you did not create an account, no further action is required.
            </div>

        </div>
        `,
    };

    // Kirim email menggunakan transporter
    await transporter.sendMail(mailOptions);

    logger.info("Verification email sent successfully", {
      email: data.email,
      UserId: data.UserId,
    });
  } catch (error) {
    logger.error("Failed to process verification email", {
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

// Buat async function untuk memproses email notification login berhasil dari RabbitMQ
async function processLoginNotification(data) {
  try {
    logger.info("Processing login notification email", {
      email: data.email,
    });

    const mailOptions = {
      from: '"Dreamliner" <noreply@dreamliner.com>',
      to: data.email,
      subject: "Login Notification",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <!-- HEADER -->
          <div style="background-color: #2196F3; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
            <h1 style="color: white; margin: 0;">🔒 Security Alert</h1>
          </div>
          
          <!-- BODY -->
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px;">
            <h2>New Login Detected</h2>
            <p style="font-size: 16px; line-height: 1.6;">
              We detected a new login to your Dreamliner account.
            </p>
            
            <!-- LOGIN INFO -->
            <div style="background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Time:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
              <p style="margin: 5px 0;"><strong>Device:</strong> ${data.device}</p>
              <p style="margin: 5px 0;"><strong>IP Address:</strong> ${data.ipAddress}</p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6;">
              ✅ If this was you, you can safely ignore this email.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #f44336;">
              ❌ If this wasn't you, please secure your account immediately by changing your password.
            </p>
            
            <!-- FOOTER -->
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #999;">
              Thanks,<br>
              <strong>Dreamliner Security Team</strong>
            </p>
          </div>
        </div>
      `,
    };

    // Kirim email menggunakan transporter
    await transporter.sendMail(mailOptions);

    logger.info("Login notification email sent successfully", {
      email: data.email,
    });

    return true;
  } catch (error) {
    logger.error("Failed to process login notification email", {
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

// Buat start email worker untuk consume email dari RabbitMQ
async function startEmailWorker() {
  try {
    logger.info("Starting email worker...");

    // 1. Panggil channel RabbitMQ
    const channel = await getChannel();

    // 2. Assert queue untuk email verification
    await channel.assertQueue(QUEUE.EMAIL, { durable: true });

    // 2. Assert queue untuk login notification
    await channel.assertQueue(QUEUE.NOTIFICATION_LOGIN, { durable: true });

    // 3. Set Prefetch count untuk memastikan worker hanya memproses 1 message dalam satu waktu
    channel.prefetch(1);

    logger.info("✅ Email worker started successfully");
    logger.info("👂 Listening for messages...");

    // CONSUMER 1: Email Verification
    // Consumer ini akan mendengarkan terus menerus ke queue EMAIL, jika ada message masuk, maka akan memanggil function processVerificationEmail untuk memproses email verification

    // Consumer 1 untuk verification email
    channel.consume(
      QUEUE.EMAIL,
      async (msg) => {
        if (msg !== null) {
          try {
            // 1. Parse message dari RabbitMQ, message ini berisi informasi yang dibutuhkan untuk mengirim email verification, seperti email user yang mendaftar, username, UserId, dan link verifikasi, nanti di function processVerificationEmail kita bisa menggunakan informasi ini untuk mengirim email ke user
            const data = JSON.parse(msg.content.toString());

            logger.info("Received verification email from RabbitMQ", {
              email: data.email,
            });

            // 2. Panggil function processVerificationEmail untuk memproses email verification, jika berhasil maka akan mengirim email ke user, jika gagal maka akan masuk ke catch block dan melakukan nack message dengan requeue true, sehingga message akan dikirim ulang ke queue untuk diproses kembali
            await processVerificationEmail(data);

            // 3. Ack message jika berhasil diproses
            // Beritahu RabbitMQ bahwa message sudah selesai diproses
            // Message akan dihapus dari queue
            channel.ack(msg);
            logger.info("Verification email processed successfully", {
              email: data.email,
            });
          } catch (error) {
            logger.error("Failed to process verification email", {
              error: error.message,
              stack: error.stack,
            });

            // Nack message dengan requeue true
            channel.nack(msg, false, true);
          }
        }
      },
      {
        noAck: false,
      },
    );

    // Consumer 2 untuk login notification
    channel.consume(
      QUEUE.NOTIFICATION_LOGIN,
      async (msg) => {
        if (msg !== null) {
          try {
            // 1. Parse message dari RabbitMQ, message ini berisi informasi yang dibutuhkan untuk mengirim email notification login berhasil, seperti email user yang login dan timestamp login, nanti di function processLoginNotification kita bisa menggunakan informasi ini untuk mengirim email ke user
            const data = JSON.parse(msg.content.toString());

            logger.info("Received login notification email from RabbitMQ", {
              email: data.email,
            });

            // 2. Panggil function processLoginNotification untuk memproses email notification login berhasil, jika berhasil maka akan mengirim email ke user, jika gagal maka akan masuk ke catch block dan melakukan nack message dengan requeue true, sehingga message akan dikirim ulang ke queue untuk diproses kembali
            await processLoginNotification(data);

            // 3. Ack message jika berhasil diproses
            // Beritahu RabbitMQ bahwa message sudah selesai diproses
            // Message akan dihapus dari queue
            channel.ack(msg);
            logger.info("Login notification email processed successfully", {
              email: data.email,
            });
          } catch (error) {
            logger.error("Failed to process login notification email", {
              error: error.message,
              stack: error.stack,
            });

            // Nack message dengan requeue true
            channel.nack(msg, false, true);
          }
        }
      },
      {
        noAck: false,
      },
    );
  } catch (error) {
    logger.error("Failed to start email worker", {
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

module.exports = {
  startEmailWorker,
  processLoginNotification,
  processVerificationEmail,
};
