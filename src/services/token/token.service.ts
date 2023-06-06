import jwt from 'jsonwebtoken';
import JwtConfig from '../../config/Jwt.config';
import ErrorHandler from '../response/ErrorHandler.service';

export interface ITokenDecodeResult {
    payload?: jwt.JwtPayload | string;
    errorMessage: string | null;
    header?: jwt.JwtHeader;
}

export class TokenDecodeResult implements ITokenDecodeResult {
    payload: string | jwt.JwtPayload | undefined;
    errorMessage: string | null;
    header: jwt.JwtHeader | undefined;

    constructor(
        errorMessage: string | null,
        payload?: string | jwt.JwtPayload,
        header?: jwt.JwtHeader
    ) {
        this.errorMessage = errorMessage;
        this.payload = payload;
        this.header = header;
    }
}

export default class TokenService {
    static generateToken(payload: Object): string {
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

    static decodeToken(token: string): TokenDecodeResult {
        try {
            const decoded = jwt.verify(token, JwtConfig.getJwtSecret(), {
                complete: true,
                ignoreExpiration: false,
            });

            if (decoded === null) {
                throw new Error('jwt.decode() return a null.');
            }

            return new TokenDecodeResult(null, decoded.payload, decoded.header);
        } catch (error) {
            return new TokenDecodeResult(
                ErrorHandler.handleUnknownError(error)
            );
        }
    }
}
