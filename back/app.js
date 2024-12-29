import './loadEnvironments.js';
import express from 'express';
import menus from './routes/menus.js';
import hero from './routes/hero.js';
import about from './routes/about.js';
import techStack from './routes/techStack.js';
import experiences from './routes/experiences.js';

const app = express();

// const hostName = 'localhost';
const port = 3000;

app.use(express.json());

app.use('/menus', menus);

app.use('/hero', hero);

app.use('/about', about);

app.use('/tech-stack', techStack);

app.use('/experiences', experiences);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
