import express from 'express';
import getAllDocs from '../helpers/getAllDocs.js';
import sendEmail from '../helpers/sendEmail.js';
import validateEmail from '../helpers/validateEmail.js';
import { sanitizeEmailSending } from '../helpers/sanitizeEmailSending.js';
import { validationResult } from 'express-validator';

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

// validate inputs with
router.post('/send-email', sanitizeEmailSending(), async (req, res) => {
  try {
    // get all errors with messages from validation result
    const errors = validationResult(req);

    // if there is an error return 400 status code and error messages
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => {
          // only send array of object with the input name and relative error message
          return {
            inputName: err.path,
            message: err.msg,
          };
        }),
      });
    }

    // send email if everything is ok
    const { from, name, message } = req.body;

    await sendEmail(from, name, message);

    res.status(200).json('Email sent successfully');
  } catch (err) {
    console.error(err);
    res.status(500).json('Something went wrong during sending email');
  }
});

export default router;
