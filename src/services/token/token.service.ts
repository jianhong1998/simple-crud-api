import jwt from 'jsonwebtoken';
import JwtConfig from '../../config/JwtConfig.config';
import ErrorHandler from '../response/ErrorHandler.service';

export default class TokenService {
    static generateToken(payload: string | Object | Buffer): string {
        return jwt.sign(payload, JwtConfig.getJwtSecret());
    }

    static isTokenValid(token: string): boolean {
        try {
            jwt.verify(token, JwtConfig.getJwtSecret());

            return true;
        } catch(error) {
            return false;
        }
    }

    static decodeToken(token: string): {decoded?: jwt.JwtPayload | string, errorMessage: string | null} {
        try {
            const decoded = jwt.verify(token, JwtConfig.getJwtSecret());

            return {
                decoded,
                errorMessage: null
            };
        } catch(error) {
            return {
                errorMessage: ErrorHandler.handlerUnknownError(error)
            };
        }
    }
}