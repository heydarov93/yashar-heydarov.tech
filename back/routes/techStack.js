import express from 'express';
import db from '../db/conn.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const mainTechs = db.collection('main_tech_stack');
  const mainCursor = mainTechs.find({});
  const mainResults = await mainCursor.toArray();

  const secondaryTechs = db.collection('secondary_tech_stack');
  const secondaryCursor = secondaryTechs.find({});
  const secondaryResults = await secondaryCursor.toArray();

  res.status(200).json([...mainResults, ...secondaryResults]);
});

router.get('/main', async (req, res) => {
  const mainTechStack = db.collection('main_tech_stack');
  const cursor = mainTechStack.find({});
  const results = await cursor.toArray();

  res.status(200).json(results);
});

router.get('/secondary', async (req, res) => {
  const secondaryTechStack = db.collection('secondary_tech_stack');
  const cursor = secondaryTechStack.find({});
  const results = await cursor.toArray();

  res.status(200).json(results);
});

export default router;
