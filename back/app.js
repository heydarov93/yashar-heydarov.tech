import './loadEnvironments.js';
import express from 'express';
import menus from './routes/menus.js';

const app = express();

// const hostName = 'localhost';
const port = 3000;

app.use(express.json());

app.use('/menus', menus);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
