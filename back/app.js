import './loadEnvironments.js';
import express from 'express';
import cors from 'cors';
import menus from './routes/menus.js';
import hero from './routes/hero.js';
import about from './routes/about.js';
import techStack from './routes/techStack.js';
import experiences from './routes/experiences.js';

const app = express();

const port = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT }));

// routing
app.use('/menus', menus);

app.use('/hero', hero);

app.use('/about', about);

app.use('/tech-stack', techStack);

app.use('/experiences', experiences);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
