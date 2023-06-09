import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/routes';
import getSequelize from './services/sequelize/sequelize.service';
import { initDataModelsRelationship } from './models/index.model';

const app = express();

initDataModelsRelationship();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

app.listen({ port: 8000 }, async () => {
    console.log('Server up!');
    await getSequelize().authenticate();
    console.log('Database Connected.');
});
