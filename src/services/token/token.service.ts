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

    static decodeToken(token: string): {payload?: jwt.JwtPayload | string, errorMessage: string | null, header?: jwt.JwtHeader} {
        try {
            const verifyResult = jwt.verify(token, JwtConfig.getJwtSecret());
            
            const decoded = jwt.decode(token, {complete: true});

            if (decoded === null) {
                throw new Error('jwt.decode() return a null.');
            }

            const header = decoded.header;

            return {
                payload: verifyResult,
                errorMessage: null,
                header
            };
        } catch(error) {
            return {
                errorMessage: ErrorHandler.handlerUnknownError(error)
            };
        }
    }
}