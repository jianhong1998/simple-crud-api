import dotenv from 'dotenv';

dotenv.config();

export default class JwtConfig {
    static getJwtSecret(): string {
        const secret = process.env.JWT_SECRET;

        return secret || 'TOP_SECRET';
    }
}