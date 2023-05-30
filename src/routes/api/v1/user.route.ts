import { Router } from 'express';
import {
    deleteUserRequestHandler,
    getAllUsersRequestHandler,
    getUserRequestHandler,
    postUserRequestHandler,
    updateUserRequestHandler,
} from '../../../controllers/requestHandlers/userRequestHandler.controller';
import UserRequestMiddleware from '../../../controllers/middlewares/userRequestMiddleware.controller';
import VerifyAuthenticationMiddleware from '../../../controllers/middlewares/verifyAuthenticationMiddleware.controller';

const userRouter = Router();

const { userIdVerificationHandler, requestUserAttributeVerificationHandler } =
    UserRequestMiddleware;

const verifyAuthenticationHandler = VerifyAuthenticationMiddleware.verify();

userRouter.use('/:user_id', userIdVerificationHandler());

userRouter.get('/', verifyAuthenticationHandler, getAllUsersRequestHandler);
userRouter.get('/:user_id', verifyAuthenticationHandler, getUserRequestHandler);
userRouter.post(
    '/',
    requestUserAttributeVerificationHandler(),
    postUserRequestHandler
);
userRouter.put(
    '/:user_id',
    verifyAuthenticationHandler,
    requestUserAttributeVerificationHandler(),
    updateUserRequestHandler
);
userRouter.delete(
    '/:user_id',
    verifyAuthenticationHandler,
    deleteUserRequestHandler
);

export default userRouter;
