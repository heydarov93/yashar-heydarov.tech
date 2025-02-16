import { body } from 'express-validator';

const sanitizeEmailSending = () => {
  return [
    body('name')
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Name should be between 3 and 30 characters!')
      .custom((value) => {
        // allow letters and whitespace, but not whitespace-only
        if (!/^[A-Za-z\s]+$/.test(value)) {
          throw new Error('Name should contain only letters and spaces!');
        }

        return true;
      })
      .escape(),
    body('from')
      .trim()
      .isEmail()
      .withMessage('Invalid email address.')
      .normalizeEmail(),
    body('message')
      .trim()
      .isLength({ min: 10, max: 2500 })
      .withMessage('Message should be between 10 and 2500 characters!')
      .escape(),
  ];
};

export { sanitizeEmailSending };
