import { RequestHandler } from 'express';
import TokenVerificationResult from '../../models/token/tokenValidationResult.model';
import VerifyAuthorizationService from '../../services/login/verifyAuthorization.service';
import ErrorResponse from '../../models/response/ErrorResponse.model';

export default class VerifyAuthenticationMiddleware {
    public static verify(): RequestHandler<any, ErrorResponse> {
        return (req, res, next) => {
            try {
                const authorization = req.headers.authorization;

                if (typeof authorization === 'undefined') {
                    // 401 - Unauthorized
                    return res
                        .status(401)
                        .send(
                            new ErrorResponse(
                                'Authorization is undefined in request headers.'
                            )
                        );
                }

                if (authorization.split(' ').length < 2) {
                    return res
                        .status(401)
                        .send(
                            new ErrorResponse(
                                'Authorization does not contain token.'
                            )
                        );
                }

                const inputToken = authorization.split(' ')[1];

                const { isTokenValid } =
                    VerifyAuthorizationService.decodeLoginToken(inputToken);

                if (!isTokenValid) {
                    return res
                        .status(401)
                        .send(new ErrorResponse('Token is invalid.'));
                }

                next();
            } catch (error) {
                return res.status(500).send(new ErrorResponse(error));
            }
        };
    }
}
