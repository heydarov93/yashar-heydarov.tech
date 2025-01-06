import express from 'express';
import getAllDocs from '../helpers/getAllDocs.js';
import db from '../db/conn.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const techs = await getAllDocs('tech_stack');

    const mainResults = techs.filter((tech) => tech.category === 1);
    const secondaryResults = techs.filter((tech) => tech.category === 2);

    res.status(200).json({ main: mainResults, secondary: secondaryResults });
  } catch (err) {
    console.error(err);
    res.status(500).json('Something went wrong during getting tech stack data');
  }
});

router.get('/main', async (req, res) => {
  try {
    const techs = await getAllDocs('tech_stack');
    const results = techs.filter((tech) => tech.category === 1);

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json('Something went wrong during getting main tech stack data');
  }
});

router.get('/secondary', async (req, res) => {
  try {
    const techs = await getAllDocs('tech_stack');
    const results = techs.filter((tech) => tech.category === 2);

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json('Something went wrong during getting secondary tech stack data');
  }
});

export default router;
