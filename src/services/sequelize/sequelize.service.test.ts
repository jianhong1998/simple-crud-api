import getSequelize, { nodeEnv } from './sequelize.service';

describe('Test nodeEnv', () => {
    it.concurrent('should be defined', () => {
        expect(nodeEnv).toBeDefined();
        expect(nodeEnv).not.toBe('');
    });

    it.concurrent('should be set to "test"', () => {
        expect(nodeEnv).toBe('test');
    });
});

describe('getSequelize()', () => {
    it.concurrent('should not throw error', async () => {
        try {
            await getSequelize().authenticate();
        } catch (error) {
            expect(error).toBeUndefined();
        }
    });
});
