import NumberVerifier from './NumberVerifier.service';

describe('class NumberVerifier', () => {
    describe('isStringValidNumber()', () => {
        it.concurrent('should return boolean as result', () => {
            const testString = '';

            const result = NumberVerifier.isStringValidNumber(testString);

            expect(typeof result).toBe('boolean');
        });

        it.concurrent(
            'should return true if input string contains valid number',
            () => {
                const testString = '123';

                const result = NumberVerifier.isStringValidNumber(testString);

                expect(result).toBeTruthy();
            }
        );

        it.concurrent(
            'should return true if input string contains valid decimal number',
            () => {
                const testString1 = '123.';
                const testString2 = '123.0';
                const testString3 = '123.1';

                const result1 = NumberVerifier.isStringValidNumber(testString1);
                const result2 = NumberVerifier.isStringValidNumber(testString2);
                const result3 = NumberVerifier.isStringValidNumber(testString3);

                expect(result1).toBeTruthy();
                expect(result2).toBeTruthy();
                expect(result3).toBeTruthy();
            }
        );

        it.concurrent(
            'should return true if input string contains valid negative number',
            () => {
                const testString1 = '-1';
                const testString2 = '-0.4';
                const testString3 = '-10.12';

                const result1 = NumberVerifier.isStringValidNumber(testString1);
                const result2 = NumberVerifier.isStringValidNumber(testString2);
                const result3 = NumberVerifier.isStringValidNumber(testString3);

                expect(result1).toBeTruthy();
                expect(result2).toBeTruthy();
                expect(result3).toBeTruthy();
            }
        );

        it.concurrent(
            'should return false if input string contains non-numeric characters',
            () => {
                const testString1 = '123a';
                const testString2 = 'a123';
                const testString3 = '1a23';
                const testString4 = 'abc';
                const testString5 = '123@';

                const result1 = NumberVerifier.isStringValidNumber(testString1);
                const result2 = NumberVerifier.isStringValidNumber(testString2);
                const result3 = NumberVerifier.isStringValidNumber(testString3);
                const result4 = NumberVerifier.isStringValidNumber(testString4);
                const result5 = NumberVerifier.isStringValidNumber(testString5);

                expect(result1).toBeFalsy();
                expect(result2).toBeFalsy();
                expect(result3).toBeFalsy();
                expect(result4).toBeFalsy();
                expect(result5).toBeFalsy();
            }
        );
    });

    describe('getDigit()', () => {
        it.concurrent(
            'should return the number of numeric characters if input number is a positive integer',
            () => {
                const testNumber = 123;

                const result = NumberVerifier.getDigit(testNumber);

                expect(result).toEqual(3);
            }
        );

        it.concurrent('should throw error if input number is a decimal', () => {
            const testNumber1 = 123.45;
            const testNumber2 = -123.12;

            const resultFn1 = () => NumberVerifier.getDigit(testNumber1);
            const resultFn2 = () => NumberVerifier.getDigit(testNumber2);

            expect(resultFn1).toThrowError(
                'Input must be an integer (no decimal).'
            );
            expect(resultFn2).toThrowError(
                'Input must be an integer (no decimal).'
            );
        });

        it.concurrent('should return 1 if input number is 0', () => {
            const testNumber = 0;

            const result = NumberVerifier.getDigit(testNumber);

            expect(result).toEqual(testNumber.toString().length);
        });

        it.concurrent(
            'should return the number of numeric characters plus 1 if input number is a negative integer',
            () => {
                const testNumber1 = -1;

                const result1 = NumberVerifier.getDigit(testNumber1);

                expect(result1).toEqual(2);
            }
        );
    });
});
