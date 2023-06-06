import JwtConfig from '../../config/Jwt.config';
import jwt from 'jsonwebtoken';
import TokenService, { TokenDecodeResult } from './token.service';

describe('class TokenService', () => {
    describe('generateToken()', () => {
        const { generateToken } = TokenService;

        const testPayload = { value: 'test' };

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should execute jwt.sign() once with payload, secretCode and signOptions', () => {
            const testExpireTime = new Date().getMilliseconds();
            const testJwtSecret = 'test_secret';
            const testJwtToken = 'test.jwt.token';

            const mockedJwtSign = jest.spyOn(jwt, 'sign');
            const mockedGetJwtSecret = jest.spyOn(JwtConfig, 'getJwtSecret');
            const mockedGetJwtExpireTime = jest.spyOn(
                JwtConfig,
                'getJwtExpireTime'
            );

            mockedGetJwtSecret.mockReturnValueOnce(testJwtSecret);
            mockedGetJwtExpireTime.mockReturnValueOnce(testExpireTime);
            mockedJwtSign.mockImplementationOnce(
                jest.fn(() => {
                    return testJwtToken;
                })
            );

            try {
                generateToken(testPayload);

                expect(jwt.sign).toBeCalledTimes(1);
                expect(jwt.sign).toBeCalledWith(testPayload, testJwtSecret, {
                    expiresIn: testExpireTime,
                });
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('should execute JwtConfig.getJwtSecret() once to get JWT secret code', () => {
            jest.spyOn(jwt, 'sign');
            jest.spyOn(JwtConfig, 'getJwtSecret');
            jest.spyOn(JwtConfig, 'getJwtExpireTime');

            try {
                generateToken(testPayload);
            } catch (error) {
                expect(error).toBeUndefined();
            }

            expect(JwtConfig.getJwtSecret).toBeCalledTimes(1);
            expect(JwtConfig.getJwtSecret).toBeCalledWith();
        });

        it('should execute JwtConfig.getJwtExpireTime() once to get JWT expire time', () => {
            jest.spyOn(JwtConfig, 'getJwtSecret');
            jest.spyOn(JwtConfig, 'getJwtExpireTime');
            jest.spyOn(jwt, 'sign');

            try {
                generateToken(testPayload);
            } catch (error) {
                expect(error).toBeUndefined();
            }

            expect(JwtConfig.getJwtExpireTime).toBeCalledTimes(1);
            expect(JwtConfig.getJwtExpireTime).toBeCalledWith();
        });

        it('should return string as result', () => {
            const expectedToken = 'test_token_result';

            jest.spyOn(JwtConfig, 'getJwtExpireTime');
            jest.spyOn(JwtConfig, 'getJwtSecret');
            const mockedJwtSign = jest.spyOn(jwt, 'sign');

            mockedJwtSign.mockImplementationOnce(
                jest.fn(() => {
                    return expectedToken;
                })
            );

            try {
                const result = generateToken(testPayload);

                expect(typeof result).toBe('string');
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('should throw error if input invalid payload', () => {
            const testInputPayload1: number = 1;
            const testInputPayload2: boolean = false;
            const testInputPayload3: bigint = BigInt(12);
            const testInputPayload4: Function = () => {};
            const testInputPayload5: symbol = Symbol('test');
            const testInputPayload6: undefined = undefined;
            const testInputPayload7: null = null;

            let error1: unknown;
            let error2: unknown;
            let error3: unknown;
            let error4: unknown;
            let error5: unknown;
            let error6: unknown;
            let error7: unknown;

            try {
                generateToken(testInputPayload1);
            } catch (error) {
                error1 = error;
            }

            try {
                generateToken(testInputPayload2);
            } catch (error) {
                error2 = error;
            }

            try {
                generateToken(testInputPayload3);
            } catch (error) {
                error3 = error;
            }

            try {
                generateToken(testInputPayload4);
            } catch (error) {
                error4 = error;
            }

            try {
                generateToken(testInputPayload5);
            } catch (error) {
                error5 = error;
            }

            try {
                // @ts-ignore
                generateToken(testInputPayload6);
            } catch (error) {
                error6 = error;
            }

            try {
                // @ts-ignore
                generateToken(testInputPayload7);
            } catch (error) {
                error7 = error;
            }

            expect(error1).toBeDefined();
            expect(error1).toBeInstanceOf(Error);

            expect(error2).toBeDefined();
            expect(error2).toBeInstanceOf(Error);

            expect(error3).toBeDefined();
            expect(error3).toBeInstanceOf(Error);

            expect(error4).toBeDefined();
            expect(error4).toBeInstanceOf(Error);

            expect(error5).toBeDefined();
            expect(error5).toBeInstanceOf(Error);

            expect(error6).toBeDefined();
            expect(error6).toBeInstanceOf(Error);

            expect(error7).toBeDefined();
            expect(error7).toBeInstanceOf(Error);
        });

        it('should return a token if input valid payload', () => {
            const testPayload1 = testPayload;
            const testPayload2 = {};

            const result1 = () => generateToken(testPayload1);
            const result2 = () => generateToken(testPayload2);

            expect(result1).not.toThrowError();
            expect(result2).not.toThrowError();
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
    });

    describe('isTokenValid()', () => {
        const { isTokenValid, generateToken } = TokenService;

        const testValidToken = generateToken({ value: 'test value' });

        it('should return boolean as result', () => {
            const result = isTokenValid(testValidToken);

            expect(typeof result).toBe('boolean');
        });

        it('should not throw error', () => {
            const testInvalidToken = undefined;

            // @ts-ignore
            const resultFn = () => isTokenValid(testInvalidToken);

            expect(resultFn).not.toThrowError();
        });

        it('should return false if input token is invalid', () => {
            const testInvalidToken1 = testValidToken.slice(
                0,
                testValidToken.length - 1
            );

            const testInvalidToken2 = 'invalid.token.2';

            const result1 = isTokenValid(testInvalidToken1);
            const result2 = isTokenValid(testInvalidToken2);

            expect(result1).toBeFalsy();
            expect(result2).toBeFalsy();
        });

        it('should return false if input is not string', () => {
            const testInvalidToken1: number = 1;
            const testInvalidToken2: boolean = false;
            const testInvalidToken3: bigint = BigInt(12);
            const testInvalidToken4: Function = () => {};
            const testInvalidToken5: symbol = Symbol('test');
            const testInvalidToken6: undefined = undefined;
            const testInvalidToken7: null = null;

            // @ts-ignore
            const result1 = () => isTokenValid(testInvalidToken1);
            // @ts-ignore
            const result2 = () => isTokenValid(testInvalidToken2);
            // @ts-ignore
            const result3 = () => isTokenValid(testInvalidToken3);
            // @ts-ignore
            const result4 = () => isTokenValid(testInvalidToken4);
            // @ts-ignore
            const result5 = () => isTokenValid(testInvalidToken5);
            // @ts-ignore
            const result6 = () => isTokenValid(testInvalidToken6);
            // @ts-ignore
            const result7 = () => isTokenValid(testInvalidToken7);

            expect(result1()).toBeFalsy();
            expect(result2()).toBeFalsy();
            expect(result3()).toBeFalsy();
            expect(result4()).toBeFalsy();
            expect(result5()).toBeFalsy();
            expect(result6()).toBeFalsy();
            expect(result7()).toBeFalsy();
        });
    });

    describe('decodeToken()', () => {
        const { decodeToken, generateToken } = TokenService;

        const testValidToken = generateToken({ value: 'test value' });
        const testInvalidToken = 'abc.def.ghi';

        it('should return an object which instance of TokenDecodeResult as the result', () => {
            const result = decodeToken(testValidToken);

            expect(typeof result).toBe('object');
            expect(result).toBeInstanceOf(TokenDecodeResult);
        });

        it('should not throw Error in any case', () => {
            const resultFn1 = () => decodeToken(testValidToken);
            const resultFn2 = () => decodeToken(testInvalidToken);

            expect(resultFn1).not.toThrowError();
            expect(resultFn2).not.toThrowError();
        });

        it('should return null as errorMessage, defined payload and header in the TokenDecodeResult object if input is valid token', () => {
            const result = decodeToken(testValidToken);

            expect(result.errorMessage).toBeNull();
            expect(result.header).toBeDefined();
            expect(result.payload).toBeDefined();
        });

        it('should return a string as errorMessage, undefined payload and header in the TokenDecodeResult object if input is invalid token', () => {
            const result = decodeToken(testInvalidToken);

            expect(result.errorMessage).not.toBeNull();
            expect(typeof result.errorMessage).toBe('string');
            expect(result.header).toBeUndefined();
            expect(result.payload).toBeUndefined();
        });
    });
});
