import ErrorHandler from './ErrorHandler.service';

describe('class ErrorHandler', () => {
    describe('handlerUnknownError()', () => {
        it('should return a string', () => {
            const testError = '';

            const result = ErrorHandler.handleUnknownError(testError);

            expect(typeof result).toEqual('string');
        });

        it('should return the given string input when input is string', () => {
            const testError = 'test string';

            const result = ErrorHandler.handleUnknownError(testError);

            expect(result).toBe(testError);
        });

        it('should return the error.message when input is instance of Error', () => {
            const testErrorMessage = 'test error message';

            const testError = new Error(testErrorMessage);

            const result = ErrorHandler.handleUnknownError(testError);

            expect(result).toBe(testErrorMessage);
        });

        it('should return the input in string format when input is not string and not instance of Error', () => {
            const testError1 = 1;
            const testError2 = [1, 2];
            const testError3 = ['error1', 'error2'];
            const testError4: boolean = true;
            const testError5 = undefined;
            const testError6 = null;

            const result1 = ErrorHandler.handleUnknownError(testError1);
            const result2 = ErrorHandler.handleUnknownError(testError2);
            const result3 = ErrorHandler.handleUnknownError(testError3);
            const result4 = ErrorHandler.handleUnknownError(testError4);
            const result5 = ErrorHandler.handleUnknownError(testError5);
            const result6 = ErrorHandler.handleUnknownError(testError6);

            expect(result1).toBe(String(testError1));
            expect(result2).toBe(String(testError2));
            expect(result3).toBe(String(testError3));
            expect(result4).toBe(String(testError4));
            expect(result5).toBe(String(testError5));
            expect(result6).toBe(String(testError6));
        });

        it('should return json string when input is an object and is not instance of Error', () => {
            const testError = { testKey1: 'testValue1' };

            const result = ErrorHandler.handleUnknownError(testError);

            expect(result).toBe(JSON.stringify(testError));
        });
    });
});
