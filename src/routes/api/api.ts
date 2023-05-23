import { Router } from "express";
import employeeRouter from "./v1/employee.route";
import userRouter from "./v1/user.route";
import loginRouter from "./v1/login.route";

const apiRouter = Router();

apiRouter.use('/employee', employeeRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/login', loginRouter);

export default apiRouter;