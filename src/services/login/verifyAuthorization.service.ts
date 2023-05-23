import TokenVerificationResult from "../../models/token/tokenValidationResult.model";
import TokenService from "../token/token.service";

export default class VerifyAuthorizationService {
    public static verifyLoginToken(token: string): TokenVerificationResult {
        const decodedToken = TokenService.decodeToken(token);

        if (decodedToken.errorMessage !== null) {
            return {
                isTokenValid: false,
                errorMessage: decodedToken.errorMessage,
                token
            }
        }

        if (typeof decodedToken.header === 'undefined' || typeof decodedToken.payload === 'undefined') {
            return {
                isTokenValid: false,
                errorMessage: 'header or payload is undefined',
                token
            };
        }

        return {
            isTokenValid: true,
            payload: decodedToken.payload,
            header: decodedToken.header,
            token
        }
    }
}