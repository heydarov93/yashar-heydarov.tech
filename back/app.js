import './loadEnvironments.js';
import express from 'express';
import cors from 'cors';
import menus from './routes/menus.js';
import contact from './routes/contact.js';
import hero from './routes/hero.js';
import about from './routes/about.js';
import techStack from './routes/techStack.js';
import experiences from './routes/experiences.js';
import projects from './routes/projects.js';
import educations from './routes/educations.js';

const app = express();

const port = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT }));

// routing
app.use('/menus', menus);

app.use('/contact', contact);

app.use('/hero', hero);

app.use('/about', about);

app.use('/tech-stack', techStack);

app.use('/experiences', experiences);

app.use('/projects', projects);

app.use('/edu', educations);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
