import UserRequestVerificationService from './userRequestVerification.service';

describe('class UserRequestVerificationService', () => {
    describe('verifyUsername()', () => {
        const { verifyUsername } = UserRequestVerificationService;

        const testValidUsername = 'testUsername';
        const testInvalidUsernameArray: Array<string> = ['user', 'u s'];
        const testNotStringUsernameArray: Array<any> = [
            undefined,
            null,
            1,
            BigInt(1),
            Symbol('test'),
            true,
            {},
            [] as any[],
        ];

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should return boolean as result', () => {
            const result = typeof verifyUsername(testValidUsername);

            expect(result).toBe('boolean');
        });

        it('should not throw Error in any case', () => {
            const resultFn1 = () =>
                verifyUsername(testNotStringUsernameArray[0]);
            const resultFn2 = () =>
                verifyUsername(testNotStringUsernameArray[1]);
            const resultFn3 = () =>
                verifyUsername(testNotStringUsernameArray[2]);
            const resultFn4 = () =>
                verifyUsername(testNotStringUsernameArray[3]);
            const resultFn5 = () =>
                verifyUsername(testNotStringUsernameArray[4]);
            const resultFn6 = () =>
                verifyUsername(testNotStringUsernameArray[5]);
            const resultFn7 = () =>
                verifyUsername(testNotStringUsernameArray[6]);
            const resultFn8 = () =>
                verifyUsername(testNotStringUsernameArray[7]);

            expect(resultFn1).not.toThrowError();
            expect(resultFn2).not.toThrowError();
            expect(resultFn3).not.toThrowError();
            expect(resultFn4).not.toThrowError();
            expect(resultFn5).not.toThrowError();
            expect(resultFn6).not.toThrowError();
            expect(resultFn7).not.toThrowError();
            expect(resultFn8).not.toThrowError();
        });

        it("should execute String.prototype.split() method once with ' ' (a string contain a space)", () => {
            jest.spyOn(String.prototype, 'split');

            verifyUsername(testValidUsername);

            expect(String.prototype.split).toBeCalledTimes(1);
            expect(String.prototype.split).toBeCalledWith(' ');
        });

        it('should return false if username is not string', () => {
            const result1 = verifyUsername(testNotStringUsernameArray[0]);
            const result2 = verifyUsername(testNotStringUsernameArray[1]);
            const result3 = verifyUsername(testNotStringUsernameArray[2]);
            const result4 = verifyUsername(testNotStringUsernameArray[3]);
            const result5 = verifyUsername(testNotStringUsernameArray[4]);
            const result6 = verifyUsername(testNotStringUsernameArray[5]);
            const result7 = verifyUsername(testNotStringUsernameArray[6]);
            const result8 = verifyUsername(testNotStringUsernameArray[7]);

            expect(result1).toBeFalsy();
            expect(result2).toBeFalsy();
            expect(result3).toBeFalsy();
            expect(result4).toBeFalsy();
            expect(result5).toBeFalsy();
            expect(result6).toBeFalsy();
            expect(result7).toBeFalsy();
            expect(result8).toBeFalsy();
        });

        it('should return false if username contains spaces', () => {
            const testInvalidUsername = testInvalidUsernameArray[1];

            const result = verifyUsername(testInvalidUsername);

            expect(result).toBeFalsy();
        });

        it('should return false if username is less than 5 characters', () => {
            const testInvalidUsername = testInvalidUsernameArray[0];

            const result = verifyUsername(testInvalidUsername);

            expect(result).toBeFalsy();
        });

        it('should return true if username is string, no containing any space and more than 4 characters', () => {
            const result = verifyUsername(testValidUsername);

            expect(result).toBeTruthy();
        });
    });

    describe('verifyPassword()', () => {
        const { verifyPassword } = UserRequestVerificationService;

        const testValidPassword = '12345678';
        const testInvalidPasswordArray: string[] = [
            '123456', // less than 7 characters
            '123456789012345678901', // more than 20 characters
            '1234 5678', // contains space
        ];
        const testNonStringPasswordArray: any[] = [
            undefined,
            null,
            1,
            BigInt(1),
            Symbol('test'),
            true,
            {},
            [] as any[],
        ];

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should return a boolean as the result', () => {
            const result = verifyPassword(testValidPassword);

            expect(typeof result).toBe('boolean');
        });

        it('should not throw Error in any case', () => {
            const resultFn1 = () =>
                verifyPassword(testNonStringPasswordArray[0]);
            const resultFn2 = () =>
                verifyPassword(testNonStringPasswordArray[1]);
            const resultFn3 = () =>
                verifyPassword(testNonStringPasswordArray[2]);
            const resultFn4 = () =>
                verifyPassword(testNonStringPasswordArray[3]);
            const resultFn5 = () =>
                verifyPassword(testNonStringPasswordArray[4]);
            const resultFn6 = () =>
                verifyPassword(testNonStringPasswordArray[5]);
            const resultFn7 = () =>
                verifyPassword(testNonStringPasswordArray[6]);
            const resultFn8 = () =>
                verifyPassword(testNonStringPasswordArray[7]);

            expect(resultFn1).not.toThrowError();
            expect(resultFn2).not.toThrowError();
            expect(resultFn3).not.toThrowError();
            expect(resultFn4).not.toThrowError();
            expect(resultFn5).not.toThrowError();
            expect(resultFn6).not.toThrowError();
            expect(resultFn7).not.toThrowError();
            expect(resultFn8).not.toThrowError();
        });

        it("should execute String.prototype.split() method once with ' ' (string with a space)", () => {
            jest.spyOn(String.prototype, 'split');

            verifyPassword(testValidPassword);

            expect(String.prototype.split).toBeCalledTimes(1);
            expect(String.prototype.split).toBeCalledWith(' ');
        });

        it('should return false if input password is not string', () => {
            const result1 = verifyPassword(testNonStringPasswordArray[0]);
            const result2 = verifyPassword(testNonStringPasswordArray[1]);
            const result3 = verifyPassword(testNonStringPasswordArray[2]);
            const result4 = verifyPassword(testNonStringPasswordArray[3]);
            const result5 = verifyPassword(testNonStringPasswordArray[4]);
            const result6 = verifyPassword(testNonStringPasswordArray[5]);
            const result7 = verifyPassword(testNonStringPasswordArray[6]);
            const result8 = verifyPassword(testNonStringPasswordArray[7]);

            expect(result1).toBeFalsy();
            expect(result2).toBeFalsy();
            expect(result3).toBeFalsy();
            expect(result4).toBeFalsy();
            expect(result5).toBeFalsy();
            expect(result6).toBeFalsy();
            expect(result7).toBeFalsy();
            expect(result8).toBeFalsy();
        });

        it('should return false if input password contains spaces', () => {
            const testInvalidPassword = testInvalidPasswordArray[2];

            const result = verifyPassword(testInvalidPassword);

            expect(result).toBeFalsy();
        });

        it('should return false if input password is less than 7 characters', () => {
            const testInvalidPassword = testInvalidPasswordArray[0];

            const result = verifyPassword(testInvalidPassword);

            expect(result).toBeFalsy();
        });

        it('should return false if input password is more than 20 characters', () => {
            const testInvalidPassword = testInvalidPasswordArray[1];

            const result = verifyPassword(testInvalidPassword);

            expect(result).toBeFalsy();
        });

        it('should return true if input password is string, not containing any space, having 7 to 20 characters', () => {
            const result = verifyPassword(testValidPassword);

            expect(result).toBeTruthy();
        });
    });

    describe('verifyDepartmentId()', () => {
        const { verifyDepartmentId } = UserRequestVerificationService;

        const testValidDepartmentId = 1;

        const testInvalidDepartmentId = [0, -1, 1.1];

        const testNonNumberPasswordArray: any[] = [
            undefined,
            null,
            '1',
            BigInt(1),
            Symbol('test'),
            true,
            {},
            [] as any[],
        ];

        it('should return a boolean as the result', () => {
            const result = verifyDepartmentId(testValidDepartmentId);

            expect(typeof result).toBe('boolean');
        });

        it('should not throw Error in any case', () => {
            const resultFn1 = () =>
                verifyDepartmentId(testNonNumberPasswordArray[0]);
            const resultFn2 = () =>
                verifyDepartmentId(testNonNumberPasswordArray[1]);
            const resultFn3 = () =>
                verifyDepartmentId(testNonNumberPasswordArray[2]);
            const resultFn4 = () =>
                verifyDepartmentId(testNonNumberPasswordArray[3]);
            const resultFn5 = () =>
                verifyDepartmentId(testNonNumberPasswordArray[4]);
            const resultFn6 = () =>
                verifyDepartmentId(testNonNumberPasswordArray[5]);
            const resultFn7 = () =>
                verifyDepartmentId(testNonNumberPasswordArray[6]);
            const resultFn8 = () =>
                verifyDepartmentId(testNonNumberPasswordArray[7]);

            expect(resultFn1).not.toThrowError();
            expect(resultFn2).not.toThrowError();
            expect(resultFn3).not.toThrowError();
            expect(resultFn4).not.toThrowError();
            expect(resultFn5).not.toThrowError();
            expect(resultFn6).not.toThrowError();
            expect(resultFn7).not.toThrowError();
            expect(resultFn8).not.toThrowError();
        });

        it('should return false if input departmentId is not number', () => {
            const result1 = verifyDepartmentId(testNonNumberPasswordArray[0]);
            const result2 = verifyDepartmentId(testNonNumberPasswordArray[1]);
            const result3 = verifyDepartmentId(testNonNumberPasswordArray[2]);
            const result4 = verifyDepartmentId(testNonNumberPasswordArray[3]);
            const result5 = verifyDepartmentId(testNonNumberPasswordArray[4]);
            const result6 = verifyDepartmentId(testNonNumberPasswordArray[5]);
            const result7 = verifyDepartmentId(testNonNumberPasswordArray[6]);
            const result8 = verifyDepartmentId(testNonNumberPasswordArray[7]);

            expect(result1).toBeFalsy();
            expect(result2).toBeFalsy();
            expect(result3).toBeFalsy();
            expect(result4).toBeFalsy();
            expect(result5).toBeFalsy();
            expect(result6).toBeFalsy();
            expect(result7).toBeFalsy();
            expect(result8).toBeFalsy();
        });

        it('should return false if input departmentId is not integer', () => {
            const result1 = verifyDepartmentId(testInvalidDepartmentId[2]);

            expect(result1).toBeFalsy();
        });

        it('should return false if input departmentId is less than 1', () => {
            const result1 = verifyDepartmentId(testInvalidDepartmentId[0]);
            const result2 = verifyDepartmentId(testInvalidDepartmentId[1]);

            expect(result1).toBeFalsy();
            expect(result2).toBeFalsy();
        });

        it('should return true if input departmentId is integer, greater than 0', () => {
            const result = verifyDepartmentId(testValidDepartmentId);

            expect(result).toBeTruthy();
        });
    });

    describe('verifyUserId()', () => {
        const { verifyUserId } = UserRequestVerificationService;

        const testValidUserId = 'abcd-abcd-abcd-abcd';
        const testInvalidUserIdArray = ['a bcd', ' abcd', 'abcd '];
        const testNonStringUserIdArray: any[] = [
            undefined,
            null,
            1,
            BigInt(1),
            Symbol('test'),
            true,
            {},
            [] as any[],
        ];

        it('should return a boolean as the result', () => {
            const result = verifyUserId(testValidUserId);

            expect(typeof result).toBe('boolean');
        });

        it('should not throw Error in any case', () => {
            const resultFn1 = () => verifyUserId(testNonStringUserIdArray[0]);
            const resultFn2 = () => verifyUserId(testNonStringUserIdArray[1]);
            const resultFn3 = () => verifyUserId(testNonStringUserIdArray[2]);
            const resultFn4 = () => verifyUserId(testNonStringUserIdArray[3]);
            const resultFn5 = () => verifyUserId(testNonStringUserIdArray[4]);
            const resultFn6 = () => verifyUserId(testNonStringUserIdArray[5]);
            const resultFn7 = () => verifyUserId(testNonStringUserIdArray[6]);
            const resultFn8 = () => verifyUserId(testNonStringUserIdArray[7]);

            expect(resultFn1).not.toThrowError();
            expect(resultFn2).not.toThrowError();
            expect(resultFn3).not.toThrowError();
            expect(resultFn4).not.toThrowError();
            expect(resultFn5).not.toThrowError();
            expect(resultFn6).not.toThrowError();
            expect(resultFn7).not.toThrowError();
            expect(resultFn8).not.toThrowError();
        });

        it('should return false if input userId is not string', () => {
            const result1 = verifyUserId(testNonStringUserIdArray[0]);
            const result2 = verifyUserId(testNonStringUserIdArray[1]);
            const result3 = verifyUserId(testNonStringUserIdArray[2]);
            const result4 = verifyUserId(testNonStringUserIdArray[3]);
            const result5 = verifyUserId(testNonStringUserIdArray[4]);
            const result6 = verifyUserId(testNonStringUserIdArray[5]);
            const result7 = verifyUserId(testNonStringUserIdArray[6]);
            const result8 = verifyUserId(testNonStringUserIdArray[7]);

            expect(result1).toBeFalsy();
            expect(result2).toBeFalsy();
            expect(result3).toBeFalsy();
            expect(result4).toBeFalsy();
            expect(result5).toBeFalsy();
            expect(result6).toBeFalsy();
            expect(result7).toBeFalsy();
            expect(result8).toBeFalsy();
        });

        it('should return false if input userId contains spaces', () => {
            const result1 = verifyUserId(testInvalidUserIdArray[0]);
            const result2 = verifyUserId(testInvalidUserIdArray[1]);
            const result3 = verifyUserId(testInvalidUserIdArray[2]);

            expect(result1).toBeFalsy();
            expect(result2).toBeFalsy();
            expect(result3).toBeFalsy();
        });

        it('should return true if input userId is string and not containing any space', () => {
            const result = verifyUserId(testValidUserId);

            expect(result).toBeTruthy();
        });
    });
});
