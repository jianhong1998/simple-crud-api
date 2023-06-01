import Department from '../../models/employee/Department.enum';
import NumberVerifier from '../number/NumberVerifier.service';
import EmployeeRequestVerificationService from './employeeRequestVerification.service';

describe('class EmployeeRequestVerificationService', () => {
    describe('verifyDepartment()', () => {
        const { verifyDepartment } = EmployeeRequestVerificationService;

        it.concurrent('should return boolean as result', () => {
            const testDepartment = Department.HR;

            const result = verifyDepartment(testDepartment);

            expect(typeof result).toBe('boolean');
        });

        it.concurrent('should return true if input is valid department', () => {
            const testDepartment1 = Department.PS;
            const testDepartment2 = Department.HR;
            const testDepartment3 = 'PS';
            const testDepartment4 = 'HR';

            const result1 = verifyDepartment(testDepartment1);
            const result2 = verifyDepartment(testDepartment2);
            const result3 = verifyDepartment(testDepartment3);
            const result4 = verifyDepartment(testDepartment4);

            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
            expect(result3).toBeTruthy();
            expect(result4).toBeTruthy();
        });

        it.concurrent('should return false if input is not a string', () => {
            const testDepartment1: number = 1;
            const testDepartment2: boolean = false;
            const testDepartment3: any[] = [];
            const testDepartment4: object = {};
            const testDepartment5: undefined = undefined;
            const testDepartment6: null = null;
            const testDepartment7: () => void = () => {};
            const testDepartment8: bigint = BigInt(1000000000000000);
            const testDepartment9: symbol = Symbol('test');

            const result1 = verifyDepartment(testDepartment1);
            const result2 = verifyDepartment(testDepartment2);
            const result3 = verifyDepartment(testDepartment3);
            const result4 = verifyDepartment(testDepartment4);
            const result5 = verifyDepartment(testDepartment5);
            const result6 = verifyDepartment(testDepartment6);
            const result7 = verifyDepartment(testDepartment7);
            const result8 = verifyDepartment(testDepartment8);
            const result9 = verifyDepartment(testDepartment9);

            expect(result1).toBeFalsy();
            expect(result2).toBeFalsy();
            expect(result3).toBeFalsy();
            expect(result4).toBeFalsy();
            expect(result5).toBeFalsy();
            expect(result6).toBeFalsy();
            expect(result7).toBeFalsy();
            expect(result8).toBeFalsy();
            expect(result9).toBeFalsy();
        });

        it.concurrent(
            'should return false if input is a string but not a valid department',
            () => {
                const testDepartment1 = 'HR123';

                const result = verifyDepartment(testDepartment1);

                expect(result).toBeFalsy();
            }
        );

        it.concurrent('should not throwing any error', () => {
            try {
                const testDepartment1: number = 1;
                const testDepartment2: boolean = false;
                const testDepartment3: any[] = [];
                const testDepartment4: object = {};
                const testDepartment5: undefined = undefined;
                const testDepartment6: null = null;
                const testDepartment7: () => void = () => {};
                const testDepartment8: bigint = BigInt(1000000000000000);
                const testDepartment9: symbol = Symbol('test');
                const testDepartment10: string = '';

                const result1 = verifyDepartment(testDepartment1);
                const result2 = verifyDepartment(testDepartment2);
                const result3 = verifyDepartment(testDepartment3);
                const result4 = verifyDepartment(testDepartment4);
                const result5 = verifyDepartment(testDepartment5);
                const result6 = verifyDepartment(testDepartment6);
                const result7 = verifyDepartment(testDepartment7);
                const result8 = verifyDepartment(testDepartment8);
                const result9 = verifyDepartment(testDepartment9);
                const result10 = verifyDepartment(testDepartment10);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    });

    describe('verifyEmployeeId()', () => {
        const { verifyEmployeeId } = EmployeeRequestVerificationService;

        it.concurrent('should return boolean as result', () => {
            const testEmployeeId = '1';

            const result = verifyEmployeeId(testEmployeeId);

            expect(typeof result).toBe('boolean');
        });

        it.concurrent(
            'should return true if input is valid employee ID',
            () => {
                const testEmployeeId = '100';

                const result = verifyEmployeeId(testEmployeeId);

                expect(result).toBeTruthy();
            }
        );

        it.concurrent('should return false if input is not string', () => {
            const testEmployeeId1: number = 1;
            const testEmployeeId2: boolean = false;
            const testEmployeeId3: Array<any> = [];
            const testEmployeeId4: object = {};
            const testEmployeeId5: undefined = undefined;
            const testEmployeeId6: null = null;
            const testEmployeeId7: Function = () => {};
            const testEmployeeId8: bigint = BigInt(1);
            const testEmployeeId9: symbol = Symbol('test');

            const result1 = verifyEmployeeId(testEmployeeId1);
            const result2 = verifyEmployeeId(testEmployeeId2);
            const result3 = verifyEmployeeId(testEmployeeId3);
            const result4 = verifyEmployeeId(testEmployeeId4);
            const result5 = verifyEmployeeId(testEmployeeId5);
            const result6 = verifyEmployeeId(testEmployeeId6);
            const result7 = verifyEmployeeId(testEmployeeId7);
            const result8 = verifyEmployeeId(testEmployeeId8);
            const result9 = verifyEmployeeId(testEmployeeId9);

            expect(result1).toBeFalsy();
            expect(result2).toBeFalsy();
            expect(result3).toBeFalsy();
            expect(result4).toBeFalsy();
            expect(result5).toBeFalsy();
            expect(result6).toBeFalsy();
            expect(result7).toBeFalsy();
            expect(result8).toBeFalsy();
            expect(result9).toBeFalsy();
        });

        it.concurrent(
            'should return false if input is string but is invalid employee ID',
            () => {
                const testInvalidEmployeeId1 = '123a';
                const testInvalidEmployeeId2 = 'a123';
                const testInvalidEmployeeId3 = '1a23';
                const testInvalidEmployeeId4 = '123.1';
                const testInvalidEmployeeId5 = 'abc';

                const result1 = verifyEmployeeId(testInvalidEmployeeId1);
                const result2 = verifyEmployeeId(testInvalidEmployeeId2);
                const result3 = verifyEmployeeId(testInvalidEmployeeId3);
                const result4 = verifyEmployeeId(testInvalidEmployeeId4);
                const result5 = verifyEmployeeId(testInvalidEmployeeId5);

                expect(result1).toBeFalsy();
                expect(result2).toBeFalsy();
                expect(result3).toBeFalsy();
                expect(result4).toBeFalsy();
                expect(result5).toBeFalsy();
            }
        );

        it.concurrent(
            'should execute NumberVerifier.isStringValidNumber() with employeeId in string format',
            () => {
                const mockIsStringValidNumber = jest.spyOn(
                    NumberVerifier,
                    'isStringValidNumber'
                );
                mockIsStringValidNumber.mockReturnValueOnce(true);

                const testEmployeeId = '1234';

                const result = verifyEmployeeId(testEmployeeId);

                expect(NumberVerifier.isStringValidNumber).toBeCalledTimes(1);
                expect(NumberVerifier.isStringValidNumber).toBeCalledWith(
                    testEmployeeId
                );
            }
        );
    });

    describe('verifyName()', () => {
        const { verifyName } = EmployeeRequestVerificationService;

        it.concurrent('should return boolean as result', () => {
            const testName = 'test';

            const result = verifyName(testName);

            expect(typeof result).toBe('boolean');
        });

        it.concurrent('should return true if input is a string', () => {
            const testName = 'test string';

            const result = verifyName(testName);

            expect(result).toBeTruthy();
        });

        it.concurrent('should return false if input is not a string', () => {
            const testName1: number = 1;
            const testName2: boolean = false;
            const testName3: Array<any> = [];
            const testName4: object = {};
            const testName5: Function = () => {};
            const testName6: undefined = undefined;
            const testName7: null = null;
            const testName8: bigint = BigInt(1);
            const testName9: symbol = Symbol('test');

            const result1 = verifyName(testName1);
            const result2 = verifyName(testName2);
            const result3 = verifyName(testName3);
            const result4 = verifyName(testName4);
            const result5 = verifyName(testName5);
            const result6 = verifyName(testName6);
            const result7 = verifyName(testName7);
            const result8 = verifyName(testName8);
            const result9 = verifyName(testName9);

            expect(result1).toBeFalsy();
            expect(result2).toBeFalsy();
            expect(result3).toBeFalsy();
            expect(result4).toBeFalsy();
            expect(result5).toBeFalsy();
            expect(result6).toBeFalsy();
            expect(result7).toBeFalsy();
            expect(result8).toBeFalsy();
            expect(result9).toBeFalsy();
        });
    });

    describe('verifySalary()', () => {
        const { verifySalary } = EmployeeRequestVerificationService;

        it.concurrent('should return boolean as result', () => {
            const testSalary = 1;

            const result = verifySalary(testSalary);

            expect(typeof result).toBe('boolean');
        });

        it.concurrent(
            'should return true if input is number and greater than positive number',
            () => {
                const testSalary1 = 1;
                const testSalary2 = 0.001;
                const testSalary3 = 112.12;

                const result1 = verifySalary(testSalary1);
                const result2 = verifySalary(testSalary2);
                const result3 = verifySalary(testSalary3);

                expect(result1).toBeTruthy();
                expect(result2).toBeTruthy();
                expect(result3).toBeTruthy();
            }
        );

        it.concurrent('should return false if input is not number', () => {
            const testSalary1: string = '1';
            const testSalary2: boolean = false;
            const testSalary3: Array<any> = [];
            const testSalary4: object = {};
            const testSalary5: Function = () => {};
            const testSalary6: undefined = undefined;
            const testSalary7: null = null;
            const testSalary8: bigint = BigInt(1);
            const testSalary9: symbol = Symbol('1');

            const result1 = verifySalary(testSalary1);
            const result2 = verifySalary(testSalary2);
            const result3 = verifySalary(testSalary3);
            const result4 = verifySalary(testSalary4);
            const result5 = verifySalary(testSalary5);
            const result6 = verifySalary(testSalary6);
            const result7 = verifySalary(testSalary7);
            const result8 = verifySalary(testSalary8);
            const result9 = verifySalary(testSalary9);

            expect(result1).toBeFalsy();
            expect(result2).toBeFalsy();
            expect(result3).toBeFalsy();
            expect(result4).toBeFalsy();
            expect(result5).toBeFalsy();
            expect(result6).toBeFalsy();
            expect(result7).toBeFalsy();
            expect(result8).toBeFalsy();
            expect(result9).toBeFalsy();
        });

        it.concurrent(
            'should return false if input is less than or equal to 0',
            () => {
                const testSalary1 = 0;
                const testSalary2 = -0.0001;
                const testSalary3 = -1;

                const result1 = verifySalary(testSalary1);
                const result2 = verifySalary(testSalary2);
                const result3 = verifySalary(testSalary3);

                expect(result1).toBeFalsy();
                expect(result2).toBeFalsy();
                expect(result3).toBeFalsy();
            }
        );
    });
});
