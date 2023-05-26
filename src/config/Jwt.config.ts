import dotenv from 'dotenv';

dotenv.config();

export default class JwtConfig {
    static getJwtSecret(): string {
        const secret = process.env.JWT_SECRET;

        return secret || 'TOP_SECRET';
    }

    static getJwtExpireTime(): number {
        // const seconds = 30 * 24 * 60 * 60;
        const seconds = 15;

        return seconds;
    }
}