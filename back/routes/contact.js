import express from 'express';
import getAllDocs from '../helpers/getAllDocs.js';
import sendEmail from '../helpers/sendEmail.js';
import validateEmail from '../helpers/validateEmail.js';

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

    if (!from?.trim() || !name?.trim() || !message?.trim())
      return res.status(400).json('Missing required fields');

    if (!validateEmail(from))
      return res.status(400).json('Invalid email address');

    await sendEmail(from, name, message);

    res.status(200).json('Email sent successfully');
  } catch (err) {
    console.error(err);
    res.status(500).json('Something went wrong during sending email');
  }
});

export default router;
