import cors from 'cors';
import express from 'express';

import database from './libs/database.js';
import errors from './middlewares/errors.js';

import accountRoutes from './routes/account.routes.js';

const app = express();

database();

app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => { res.status(200).end(); });
app.head('/status', (req, res) => { res.status(200).end(); });

app.use('/accounts', accountRoutes);

app.use(errors);

export default app;