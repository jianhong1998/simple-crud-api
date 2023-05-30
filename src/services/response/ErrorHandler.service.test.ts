import ErrorHandler from './ErrorHandler.service';

describe('class ErrorHandler', () => {
    describe('handlerUnknownError()', () => {
        it('should return string', () => {
            const testError = '';

            const result = ErrorHandler.handleUnknownError(testError);

            expect(typeof result).toEqual('string');
        });
    });
});
