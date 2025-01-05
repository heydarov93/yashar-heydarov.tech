import express from 'express';
import getAllDocs from '../helpers/getAllDocs.js';
import db from '../db/conn.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await getAllDocs('project');

  const results = projects.sort((a, b) => a.priority - b.priority);
  res.status(200).json(results);
});

router.get('/:id', async (req, res) => {
  const projects = db.collection('project');
  const results = await projects.findOne({
    _id: new ObjectId(req.params.id),
  });
  res.status(200).json(results);
});

export default router;
