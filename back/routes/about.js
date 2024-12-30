import express from 'express';
import db from '../db/conn.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const aboutData = db.collection('about');
  const cursor = aboutData.find({});
  const results = await cursor.toArray();

  res.status(200).json(results);
});

export default router;
