import { Router } from "express";
import { deleteUserRequestHandler, getAllUsersRequestHandler, getUserRequestHandler, postUserRequestHandler, updateUserRequestHandler } from "../../../controllers/requestHandlers/userRequestHandler.controller";
import UserRequestMiddleware from "../../../controllers/middlewares/userRequestMiddleware.controller";
import VerifyAuthenticationMiddleware from "../../../controllers/middlewares/verifyAuthenticationMiddleware.controller";

const userRouter = Router();

const { userIdVerificationHandler, requestUserAttributeVerificationHandler } = UserRequestMiddleware;

userRouter.use(VerifyAuthenticationMiddleware.verify());
userRouter.use('/:user_id', userIdVerificationHandler());

userRouter.get('/', getAllUsersRequestHandler);
userRouter.get('/:user_id', getUserRequestHandler);
userRouter.post('/', requestUserAttributeVerificationHandler(), postUserRequestHandler);
userRouter.put('/:user_id', requestUserAttributeVerificationHandler(), updateUserRequestHandler);
userRouter.delete('/:user_id', deleteUserRequestHandler);

export default userRouter;