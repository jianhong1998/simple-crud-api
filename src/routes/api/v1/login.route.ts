import { Router } from "express";
import loginRequestHandler from "../../../controllers/requestHandlers/loginRequestHandler.controller";

const loginRouter = Router();

loginRouter.post('/', loginRequestHandler);

export default loginRouter;