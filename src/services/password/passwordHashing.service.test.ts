import PasswordService from './passwordHashing.service';
import { hash, compare } from 'bcryptjs';

// Mock
jest.mock('bcryptjs');

describe('class PasswordService', () => {
    describe('hashPassword()', () => {
        afterEach(() => {
            (hash as jest.Mock).mockReset();
            (compare as jest.Mock).mockReset();
        });

        it.concurrent(
            'should execute bcrypt.hash() with testPassword',
            async () => {
                try {
                    const testPassword = 'test';

                    await PasswordService.hashPassword(testPassword);

                    expect(hash).toBeCalledWith(testPassword, 15);
                } catch (error) {
                    expect(error).toBeUndefined();
                }
            }
        );

        it.concurrent('should return a string', async () => {
            try {
                const testPassword = 'test';
                const mockedHashedPassword = 'mockedHashedPassword';

                (hash as jest.Mock).mockResolvedValueOnce(mockedHashedPassword);

                const result = await PasswordService.hashPassword(testPassword);

                expect(typeof result).toBe('string');
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    });

    describe('comparePassword()', () => {
        it.concurrent(
            'should execute bcrypt.compare() with testPassword and hashedPassword',
            async () => {
                try {
                    const testPassword = 'test';
                    const hashedPassword = 'hashedPassword';

                    const result = await PasswordService.comparePassword(
                        testPassword,
                        hashedPassword
                    );

                    expect(compare).toBeCalledWith(
                        testPassword,
                        hashedPassword
                    );
                } catch (error) {
                    expect(error).toBeUndefined();
                }
            }
        );

        it.concurrent('should return a boolean', async () => {
            try {
                const testPassword = 'test';
                const hashedPassword = 'hashedPassword';

                (compare as jest.Mock).mockResolvedValueOnce(true);

                const result = await PasswordService.comparePassword(
                    testPassword,
                    hashedPassword
                );

                expect(typeof result).toBe('boolean');
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    });
});
