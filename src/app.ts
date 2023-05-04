import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiRouter from './routes/api/api';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('<h1>Welcome to CRUD REST API</h1>');
});

app.use('/api', apiRouter);

export default app;