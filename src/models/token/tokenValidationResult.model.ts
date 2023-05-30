import { JwtHeader, JwtPayload } from 'jsonwebtoken';

export default interface TokenVerificationResult {
    isTokenValid: boolean;
    payload?: JwtPayload | string;
    header?: JwtHeader;
    token: string;
    errorMessage?: string;
}
