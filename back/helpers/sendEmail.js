import nodemailer from 'nodemailer';

const emailService = process.env.EMAIL_SERVICE;
const emailHost = process.env.EMAIL_HOST;
const emailPort = process.env.EMAIL_PORT;
const emailSecure = process.env.EMAIL_SECURE;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailTo = process.env.EMAIL_TO;

export default async function sendEmail(from, name, message) {
  try {
    const transporter = nodemailer.createTransport({
      service: emailService,
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const options = {
      from: `🍕 heydarov.tech <${emailHost}>`,
      to: emailTo,
      subject: `New message from ${name} <${from}>`,
      html: `<p>${message}</p>`,
    };

    const info = await transporter.sendMail(options);

    console.log('Message sent: %s', info.messageId);
  } catch (err) {
    throw new Error(err.message);
  }
}
