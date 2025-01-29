import express from 'express';
import getAllDocs from '../helpers/getAllDocs.js';
import nodemailer from 'nodemailer';

const emailHost = process.env.EMAIL_HOST;
const emailPort = process.env.EMAIL_PORT;
const emailSecure = process.env.EMAIL_SECURE;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

async function sendEmail(from, name, message) {
  try {
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort, // port for tls
      secure: emailSecure, // uses tls for secure connection
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });

    const options = {
      from: from,
      to: emailUser,
      subject: `Message from ${name} via portfolio website`,
      text: message,
    };

    const info = await transporter.sendMail(options);

    console.log('Message sent: %s', info.messageId);
  } catch (err) {
    throw new Error(err.message);
  }
}

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const results = await getAllDocs('contact');

    res.status(200).json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json('Something went wrong during getting contact data');
  }
});

router.post('/send-email', async (req, res) => {
  try {
    const { from, name, message } = req.body;

    await sendEmail(from, name, message);

    res.status(200).json('Email sent successfully');
  } catch (err) {
    console.error(err);
    res.status(500).json('Something went wrong during sending email');
  }
});

export default router;
