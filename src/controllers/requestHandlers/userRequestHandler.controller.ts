import { RequestHandler } from "express";
import ResponseUserAttribute from "../../models/user/ResponseUserAttribute.model";
import RequestUserAttribute from "../../models/user/RequestUserAttribute.model";
import UserService from "../../services/user/user.service";
import ErrorHandler from "../../services/response/ErrorHandler.service";
import FullUserAttribute from "../../models/user/FullUserAttribute.model";

const postUserRequestHandler: RequestHandler<{}, (ResponseUserAttribute | {errorMessage: string}), RequestUserAttribute> = async (req, res) => {
    try {
        const inputRequestUser = req.body;
    
        const { data: createdUser, statusCode } = await UserService.createUser(inputRequestUser);
        
        const responseUser: ResponseUserAttribute = {
            userId: createdUser.userId,
            username: createdUser.username,
            departmentId: createdUser.departmentId
        }
        
        // 200
        return res.status(statusCode).send(responseUser);
    } catch (error) {
        const errorMessage = ErrorHandler.handlerUnknownError(error);
        return res.status(500).send({errorMessage});
    }
};

const getAllUsersRequestHandler: RequestHandler<{}, ({users: ResponseUserAttribute[]} | {errorMessage: string})> = async (req, res) => {
    try {
        const { data: fullUsers, statusCode } = await UserService.getAllUsers();

        const responseUsers: ResponseUserAttribute[] = fullUsers.map(fullUser => {
            const { userId, username, departmentId } = fullUser;
            
            return {
                userId,
                username,
                departmentId
            }
        });

        // 200
        return res.status(statusCode).send({users: responseUsers});
    } catch (error) {
        const errorMessage = ErrorHandler.handlerUnknownError(error);
        return res.status(500).send({errorMessage});
    }
};

const getUserRequestHandler: RequestHandler<{ user_id: string }, (ResponseUserAttribute | {errorMessage: string})> = async (req, res) => {
    try {
        const { user_id: inputUsername } = req.params;
        
        const { data: fullUser, statusCode, errorMessage } = await UserService.getUser(inputUsername);
        
        if (statusCode === 200) {
            const responseUser: ResponseUserAttribute = {
                userId: fullUser.userId,
                username: fullUser.username,
                departmentId: fullUser.departmentId
            };

            // 200
            return res.status(statusCode).send(responseUser);
        } else {
            // 404
            return res.status(statusCode).send({errorMessage});
        }
    } catch (error) {
        const errorMessage = ErrorHandler.handlerUnknownError(error);
        return res.status(500).send({errorMessage});
    }
};

const updateUserRequestHandler: RequestHandler<{ user_id: string }, (ResponseUserAttribute | {errorMessage: string}), RequestUserAttribute> = async (req, res) => {
    try {
        const inputUserId = req.params.user_id;

        const { username: inputUsername, departmentId: inputDepartmentId, password: inputPassword } = req.body;

        const inputFullUser: FullUserAttribute = {
            userId: inputUserId,
            username: inputUsername,
            departmentId: inputDepartmentId,
            password: inputPassword
        };

        const { data: updatedFullUser, statusCode, errorMessage } = await UserService.updateUser(inputFullUser);

        if (statusCode === 200) {
            const responseUser: ResponseUserAttribute = {
                userId: updatedFullUser.userId,
                username: updatedFullUser.username,
                departmentId: updatedFullUser.departmentId
            };
            
            // 200
            return res.status(statusCode).send(responseUser);
        } else {
            // 304, 404
            return res.status(statusCode).send({errorMessage});
        }
    } catch (error) {
        const errorMessage = ErrorHandler.handlerUnknownError(error);
        return res.status(500).send({errorMessage});
    }
};

const deleteUserRequestHandler: RequestHandler<{user_id: string}, ({errorMessage: string})> = async (req, res) => {
    try {
        const userId = req.params.user_id;

        const { statusCode, errorMessage } = await UserService.deleteUser(userId);

        if (statusCode === 204) {
            // 204
            return res.sendStatus(statusCode);
        } else {
            // 404
            return res.status(statusCode).send({errorMessage});
        }
    } catch (error) {
        const errorMessage = ErrorHandler.handlerUnknownError(error);
        return res.status(500).send({errorMessage});
    }
};


export {
    postUserRequestHandler,
    getAllUsersRequestHandler,
    getUserRequestHandler,
    updateUserRequestHandler,
    deleteUserRequestHandler
}