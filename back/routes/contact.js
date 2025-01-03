import express from 'express';
import db from '../db/conn.js';
import getAllDocs from '../helpers/getAllDocs.js';

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

export default router;
