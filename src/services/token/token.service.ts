import jwt from 'jsonwebtoken';
import JwtConfig from '../../config/Jwt.config';
import ErrorHandler from '../response/ErrorHandler.service';

export default class TokenService {
    static generateToken(payload: string | Object | Buffer): string {
        return jwt.sign(payload, JwtConfig.getJwtSecret(), {
            expiresIn: JwtConfig.getJwtExpireTime(),
        });
    }

    static isTokenValid(token: string): boolean {
        try {
            jwt.verify(token, JwtConfig.getJwtSecret(), {
                complete: true,
                ignoreExpiration: false,
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    static decodeToken(token: string): {
        payload?: jwt.JwtPayload | string;
        errorMessage: string | null;
        header?: jwt.JwtHeader;
    } {
        try {
            const decoded = jwt.verify(token, JwtConfig.getJwtSecret(), {
                complete: true,
                ignoreExpiration: false,
            });

            if (decoded === null) {
                throw new Error('jwt.decode() return a null.');
            }

            return {
                header: decoded.header,
                payload: decoded.payload,
                errorMessage: null,
            };
        } catch (error) {
            return {
                errorMessage: ErrorHandler.handleUnknownError(error),
            };
        }
    }
}
