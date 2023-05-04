import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiRouter from './routes/api/api';
import routes from './routes/routes';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routes);

export default app;