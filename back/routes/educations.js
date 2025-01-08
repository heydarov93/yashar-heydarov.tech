import express from 'express';
import getAllDocs from '../helpers/getAllDocs.js';
import { ObjectId } from 'mongodb';
import db from '../db/conn.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const educations = await getAllDocs('education');
    res.status(200).json(educations);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong during getting education data');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const educations = db.collection('education');
    const results = await educations.findOne({
      _id: new ObjectId(req.params.id),
    });

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong during getting education data');
  }
});

export default router;
