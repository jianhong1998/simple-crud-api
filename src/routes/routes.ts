import { Router, Response, Request } from 'express';
import apiRouter from './api/api';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.status(200).send('<h1>Welcome to CRUD REST API</h1>');
});

routes.use('/api', apiRouter);

export default routes;
