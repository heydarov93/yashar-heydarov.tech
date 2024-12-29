import { ObjectId } from 'mongodb';
import express from 'express';
import db from '../db/conn.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const experiences = db.collection('experience');
  const cursor = experiences.find({});
  const results = await cursor.toArray();

  res.status(200).json(results);
});

router.get('/:id', async (req, res) => {
  const experiences = db.collection('experience');
  const results = await experiences.findOne({
    _id: new ObjectId(req.params.id),
  });

  res.status(200).json(results);
});

export default router;
