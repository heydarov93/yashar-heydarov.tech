import express from 'express';
import db from '../db/conn.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const heroData = db.collection('hero');
  const cursor = heroData.find({});
  const results = await cursor.toArray();

  res.json(results).status(200);
});

export default router;
