import { RequestHandler } from 'express';
import UserRequestVerificationService from '../../services/user/userRequestVerification.service';
import RequestUserAttribute from '../../models/user/RequestUserAttribute.model';

export default class UserRequestMiddleware {
    public static userIdVerificationHandler(): RequestHandler<
        { user_id: string },
        { errorMessage: string }
    > {
        return (req, res, next) => {
            const userId = req.params.user_id;

            if (!UserRequestVerificationService.verifyUserId(userId)) {
                return res.status(400).send({
                    errorMessage:
                        'user_id in request params must be string with no spaces.',
                });
            }

            next();
        };
    }

    public static requestUserAttributeVerificationHandler(): RequestHandler<
        any,
        { errorMessage: string },
        RequestUserAttribute
    > {
        return (req, res, next) => {
            const { username, password, departmentId } = req.body;

            if (!UserRequestVerificationService.verifyUsername(username)) {
                return res.status(400).send({
                    errorMessage:
                        'Username must be string with no space and more than 4 characters',
                });
            }

            if (!UserRequestVerificationService.verifyPassword(password)) {
                return res.status(400).send({
                    errorMessage:
                        'Password must be string with no space and 8-20 characters',
                });
            }

            if (
                !UserRequestVerificationService.verifyDepartmentId(departmentId)
            ) {
                return res.status(400).send({
                    errorMessage: 'Department Id must be a positive integer.',
                });
            }

            return next();
        };
    }
}
