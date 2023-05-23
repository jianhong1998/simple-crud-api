import { RequestHandler } from "express";
import LoginResult from "../../models/login/LoginResult.model";
import LoginUserAttribute from "../../models/user/LoginUserAttribute.model";
import ErrorResponse from "../../models/response/ErrorResponse.model";
import LoginService from "../../services/login/login.service";

const loginRequestHandler: RequestHandler<any, (LoginResult | ErrorResponse), LoginUserAttribute> = async (req, res) => {
    try {
        const inputLoginUser = req.body;

        const { data , statusCode, errorMessage } = await LoginService.login(inputLoginUser);

        if (statusCode === 200) {
            return res.status(statusCode).send(data);
        } else {
            return res.status(statusCode).send(new ErrorResponse(errorMessage));
        }
    } catch (error) {
        res.status(500).send(new ErrorResponse(error));
    }
};

export default loginRequestHandler;