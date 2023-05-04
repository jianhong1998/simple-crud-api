import { Router } from "express";
import employeeRouter from "./v1/employee.route";

const apiRouter = Router();

apiRouter.use('/employee', employeeRouter);

export default apiRouter;