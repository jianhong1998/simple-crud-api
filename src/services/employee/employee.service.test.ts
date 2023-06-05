import Department from '../../models/employee/Department.enum';
import EmployeeDataModel from '../../models/employee/EmployeeDataModel.model';
import EmployeeDef, {
    TestEmployee,
} from '../../models/employee/EmployeeDef.model';
import EmployeeRequest from '../../models/request/EmployeeRequest.model';
import DataResponse from '../../models/response/Response.model';
import EmployeeService from './employee.service';

describe('class EmployeeService', () => {
    describe('getAllEmployees()', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should return a DataResponse in promise', async () => {
            try {
                const mockedEmployeeDataModel = jest.spyOn(
                    EmployeeDataModel,
                    'findAll'
                );
                mockedEmployeeDataModel.mockReturnValue(
                    new Promise((resolve) => resolve([]))
                );

                const result = await EmployeeService.getAllEmployees();

                expect(typeof result).toBe('object');
                expect(result).toBeInstanceOf(DataResponse);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('shoud return 200 as statusCode, employee as data and empty string as errorMessage in DataResponse object', async () => {
            try {
                const mockedFindAll = jest
                    .spyOn(EmployeeDataModel, 'findAll')
                    .mockImplementation(jest.fn());

                mockedFindAll.mockReturnValue(
                    new Promise((resolve) => resolve([]))
                );

                const result = await EmployeeService.getAllEmployees();

                expect(Array.isArray(result.data)).toBeTruthy();
                expect(result.statusCode).toEqual(200);
                expect(result.errorMessage).toBe('');
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('should return Promise reject with the error message if EmployeeDataModel.findAll() is throwing error', async () => {
            const testErrorMessage = 'Test Error Message';

            try {
                const mockedFindAll = jest
                    .spyOn(EmployeeDataModel, 'findAll')
                    .mockImplementation(
                        jest.fn(() => {
                            return new Promise((resolve, reject) => {
                                reject(new Error(testErrorMessage));
                            });
                        })
                    );

                const result = EmployeeService.getAllEmployees();

                expect(result).rejects.toBeInstanceOf(Error);
                expect(result).rejects.toThrowError(testErrorMessage);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    });

    describe('getEmployee()', () => {
        const { getEmployee } = EmployeeService;

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should return a DataResponse in promise', async () => {
            try {
                const mockedEmployeeDataModel = jest.spyOn(
                    EmployeeDataModel,
                    'findByPk'
                );

                mockedEmployeeDataModel.mockImplementationOnce(
                    jest.fn(() => {
                        return new Promise((resolve) => {
                            resolve(null);
                        });
                    })
                );

                const testEmployeeId = 1;

                const result = await getEmployee(testEmployeeId);

                expect(typeof result).toBe('object');
                expect(result).toBeInstanceOf(DataResponse);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('should execute EmployeeDataModel.findByPk() once with input employeeId', async () => {
            try {
                const mockedEmployeeDataModel = jest.spyOn(
                    EmployeeDataModel,
                    'findByPk'
                );

                mockedEmployeeDataModel.mockImplementationOnce(
                    jest.fn(() => {
                        return new Promise((resolve) => {
                            resolve(
                                new EmployeeDataModel({
                                    id: 1,
                                    name: 'test',
                                    department: Department.HR,
                                    salary: 1200,
                                })
                            );
                        });
                    })
                );

                const testEmployeeId = 1;

                await getEmployee(testEmployeeId);

                expect(EmployeeDataModel.findByPk).toBeCalled();
                expect(EmployeeDataModel.findByPk).toBeCalledWith(
                    testEmployeeId
                );
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('should return statusCode 404 in DataResponse object if employee is not found', async () => {
            try {
                const mockedEmployeeDataModel = jest.spyOn(
                    EmployeeDataModel,
                    'findByPk'
                );

                mockedEmployeeDataModel.mockImplementationOnce(
                    jest.fn(() => {
                        return new Promise((resolve) => {
                            resolve(null);
                        });
                    })
                );

                const testEmployeeId = 1;

                const result = await getEmployee(testEmployeeId);

                expect(result.statusCode).toEqual(404);
                expect(result.errorMessage).toBe('Employee Not Found.');
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('should return 200 as statusCode and employee as data in DataResponse object if employee is exist', async () => {
            try {
                const mockedEmployeeDataModel = jest.spyOn(
                    EmployeeDataModel,
                    'findByPk'
                );

                const testEmployee = new EmployeeDef(
                    1,
                    'Test employee',
                    1200,
                    Department.HR
                );

                mockedEmployeeDataModel.mockImplementationOnce(
                    jest.fn(() => {
                        return new Promise((resolve) => {
                            return resolve(new EmployeeDataModel(testEmployee));
                        });
                    })
                );

                const result = await getEmployee(testEmployee.id);

                expect(result.data).toBeInstanceOf(EmployeeDef);
                expect(result.data).toEqual(testEmployee);
                expect(result.statusCode).toEqual(200);
                expect(result.errorMessage).toBe('');
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('should return Promise reject with the error message if EmployeeDataModel.findByPk() is throwing error', async () => {
            try {
                const mockedEmployeeDataModel = jest.spyOn(
                    EmployeeDataModel,
                    'findByPk'
                );

                const testErrorMessage = 'Test Error Message';

                mockedEmployeeDataModel.mockImplementationOnce(
                    jest.fn(() => {
                        return new Promise((resolve, reject) => {
                            reject(testErrorMessage);
                        });
                    })
                );

                const testEmployeeId = 1;

                const result = getEmployee(testEmployeeId);

                expect(result).rejects.toBeInstanceOf(Error);
                expect(result).rejects.toThrowError(testErrorMessage);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    });

    describe('createEmployee()', () => {
        const { createEmployee } = EmployeeService;

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should execute EmployeeDataModel.create() once with input EmployeeRequest object', async () => {
            const testEmployeeRequest: EmployeeRequest = {
                name: 'test employee',
                salary: 1000,
                department: Department.HR,
            };

            const mockedEmployeeDataModel = jest.spyOn(
                EmployeeDataModel,
                'create'
            );

            mockedEmployeeDataModel.mockImplementationOnce(
                jest.fn(() => {
                    return new Promise((resolve) => {
                        return resolve(
                            new EmployeeDataModel({
                                id: 1,
                                name: testEmployeeRequest.name,
                                department: testEmployeeRequest.department,
                                salary: testEmployeeRequest.salary,
                            })
                        );
                    });
                })
            );

            await createEmployee(testEmployeeRequest);

            expect(EmployeeDataModel.create).toBeCalled();
            expect(EmployeeDataModel.create).toBeCalledWith({
                name: testEmployeeRequest.name,
                salary: testEmployeeRequest.salary,
                department: testEmployeeRequest.department,
            });
        });

        it('should return 200 as statusCode and employee as data in DataResponse object if employee is created', async () => {
            const testEmployeeRequest: EmployeeRequest = {
                name: 'test employee',
                salary: 1000,
                department: Department.HR,
            };

            const mockedEmployeeDataModel = jest.spyOn(
                EmployeeDataModel,
                'create'
            );

            mockedEmployeeDataModel.mockImplementationOnce(
                jest.fn(() => {
                    return new Promise((resolve) => {
                        return resolve(
                            new EmployeeDataModel({
                                id: 1,
                                name: testEmployeeRequest.name,
                                department: testEmployeeRequest.department,
                                salary: testEmployeeRequest.salary,
                            })
                        );
                    });
                })
            );

            const result = await createEmployee(testEmployeeRequest);

            expect(result.data).toBeInstanceOf(EmployeeDef);
            expect(result.data).toEqual(
                new EmployeeDef(
                    1,
                    testEmployeeRequest.name,
                    testEmployeeRequest.salary,
                    testEmployeeRequest.department
                )
            );
            expect(result.statusCode).toEqual(200);
            expect(result.errorMessage).toBe('');
        });

        it('should return Promise reject with the error message if EmployeeDataModel.create() is throwing error', async () => {
            const testErrorMessage = 'Test Error Message';

            try {
                const testEmployeeRequest: EmployeeRequest = {
                    name: 'test employee',
                    salary: 1000,
                    department: Department.HR,
                };

                const mockedEmployeeDataModel = jest.spyOn(
                    EmployeeDataModel,
                    'create'
                );

                mockedEmployeeDataModel.mockImplementationOnce(
                    jest.fn(() => {
                        return new Promise((resolve, reject) => {
                            reject(testErrorMessage);
                        });
                    })
                );

                await createEmployee(testEmployeeRequest);
            } catch (error) {
                expect(typeof error).toBe('string');
                expect(error).toBe(testErrorMessage);
            }
        });
    });

    describe('updateEmployee()', () => {
        const { updateEmployee } = EmployeeService;

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should execute EmployeeDataModel.findByPk() once with input employeeId', async () => {
            const mockedFindByPk = jest.spyOn(EmployeeDataModel, 'findByPk');
            const mockedSave = jest.spyOn(EmployeeDataModel.prototype, 'save');

            const testEmployee = new EmployeeDef(
                1,
                'Test employee',
                1200,
                Department.HR
            );

            const testEmployeeRequest: EmployeeRequest = {
                name: testEmployee.name,
                salary: testEmployee.salary,
                department: testEmployee.department,
            };

            mockedFindByPk.mockImplementationOnce(async () => {
                return new Promise((resolve) => {
                    return resolve(
                        new EmployeeDataModel({
                            id: testEmployee.id,
                            name: testEmployee.name,
                            department: testEmployee.department,
                            salary: testEmployee.salary,
                        })
                    );
                });
            });

            mockedSave.mockImplementationOnce(
                jest.fn().mockResolvedValueOnce(
                    new EmployeeDataModel({
                        id: testEmployee.id,
                        name: testEmployee.name,
                        department: testEmployee.department,
                        salary: testEmployee.salary,
                    })
                )
            );

            try {
                await updateEmployee(testEmployee.id, testEmployeeRequest);

                expect(EmployeeDataModel.findByPk).toBeCalledTimes(1);
                expect(EmployeeDataModel.findByPk).toBeCalledWith(
                    testEmployee.id
                );
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('should execute EmployeeDataModel.prototype.save() once with updated employee object', async () => {
            const mockedFindByPk = jest.spyOn(EmployeeDataModel, 'findByPk');
            const mockedSave = jest.spyOn(EmployeeDataModel.prototype, 'save');

            const testEmployee = new EmployeeDef(
                1,
                'Test employee',
                1200,
                Department.HR
            );

            const updatedEmployee = new EmployeeDef(
                1,
                'Updated employee',
                1500,
                Department.PS
            );

            const testEmployeeRequest: EmployeeRequest = {
                name: updatedEmployee.name,
                salary: updatedEmployee.salary,
                department: updatedEmployee.department,
            };

            mockedFindByPk.mockImplementationOnce(
                jest.fn(() => {
                    return new Promise((resolve) => {
                        return resolve(
                            new EmployeeDataModel({
                                id: testEmployee.id,
                                name: testEmployee.name,
                                department: testEmployee.department,
                                salary: testEmployee.salary,
                            })
                        );
                    });
                })
            );

            mockedSave.mockImplementationOnce(
                jest.fn(() => {
                    return new Promise((resolve) => {
                        return resolve(
                            new EmployeeDataModel({
                                id: updatedEmployee.id,
                                name: updatedEmployee.name,
                                department: updatedEmployee.department,
                                salary: updatedEmployee.salary,
                            })
                        );
                    });
                })
            );

            try {
                const result = await updateEmployee(
                    testEmployee.id,
                    testEmployeeRequest
                );

                expect(EmployeeDataModel.prototype.save).toBeCalledTimes(1);
                expect(EmployeeDataModel.prototype.save).toBeCalledWith();
                expect(result.data).toEqual(updatedEmployee);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('should return promise reject with error message if EmployeeDataModel.findByPk() is throwing error', async () => {
            const mockedFindByPk = jest.spyOn(EmployeeDataModel, 'findByPk');
            const mockedSave = jest.spyOn(EmployeeDataModel.prototype, 'save');

            const testEmployee = new EmployeeDef(
                1,
                'Test employee',
                1200,
                Department.HR
            );

            const testEmployeeRequest: EmployeeRequest = {
                name: testEmployee.name,
                salary: testEmployee.salary,
                department: testEmployee.department,
            };

            const testErrorMessage = 'Test Error Message 1';

            mockedFindByPk.mockImplementationOnce(
                jest.fn(() => {
                    return new Promise((resolve, reject) => {
                        reject(testErrorMessage);
                    });
                })
            );

            try {
                await updateEmployee(testEmployee.id, testEmployeeRequest);
            } catch (error) {
                expect(error).toBe(testErrorMessage);
            }
        });

        it('should return promise reject with error message if EmployeeDataModel.prototype.save() is throwing error', async () => {
            const mockedFindByPk = jest.spyOn(EmployeeDataModel, 'findByPk');
            const mockedSave = jest.spyOn(EmployeeDataModel.prototype, 'save');

            const testEmployee = new EmployeeDef(
                1,
                'Test employee',
                1200,
                Department.HR
            );

            const testEmployeeRequest: EmployeeRequest = {
                name: testEmployee.name,
                salary: testEmployee.salary,
                department: testEmployee.department,
            };

            const testErrorMessage = 'Test Error Message 2';

            mockedFindByPk.mockImplementationOnce(
                jest.fn(() => {
                    return new Promise((resolve) => {
                        return resolve(
                            new EmployeeDataModel({
                                id: testEmployee.id,
                                name: testEmployee.name,
                                department: testEmployee.department,
                                salary: testEmployee.salary,
                            })
                        );
                    });
                })
            );

            mockedSave.mockImplementationOnce(
                jest.fn(() => {
                    return new Promise((resolve, reject) => {
                        reject(testErrorMessage);
                    });
                })
            );

            try {
                await updateEmployee(testEmployee.id, testEmployeeRequest);
            } catch (error) {
                expect(error).toBe(testErrorMessage);
            }
        });

        it('should return 404 status code with error message if EmployeeDataModel.findByPk() is returning null', async () => {
            const mockedFindByPk = jest.spyOn(EmployeeDataModel, 'findByPk');
            const mockedSave = jest.spyOn(EmployeeDataModel.prototype, 'save');

            const testEmployee = new EmployeeDef(
                1,
                'Test employee',
                1200,
                Department.HR
            );

            const exptedResultEmployee = new TestEmployee();

            const testEmployeeRequest: EmployeeRequest = {
                name: testEmployee.name,
                salary: testEmployee.salary,
                department: testEmployee.department,
            };

            mockedFindByPk.mockImplementationOnce(
                jest.fn(() => {
                    return new Promise((resolve) => {
                        return resolve(null);
                    });
                })
            );

            try {
                const dataResponse = await updateEmployee(
                    testEmployee.id,
                    testEmployeeRequest
                );

                expect(dataResponse.statusCode).toEqual(404);
                expect(dataResponse.errorMessage).toContain(
                    'Employee Not Found'
                );
                expect(dataResponse.data).toEqual(exptedResultEmployee);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('should return 304 status code with error message if employee data is no different with database', async () => {
            const mockedFindByPk = jest.spyOn(EmployeeDataModel, 'findByPk');
            const mockedSave = jest.spyOn(EmployeeDataModel.prototype, 'save');

            const testEmployee = new EmployeeDef(
                1,
                'Test employee',
                1200,
                Department.HR
            );

            const testEmployeeRequest: EmployeeRequest = {
                name: testEmployee.name,
                salary: testEmployee.salary,
                department: testEmployee.department,
            };

            const expectedEmployee = new TestEmployee();

            mockedFindByPk.mockImplementationOnce(
                jest.fn(() => {
                    return new Promise((resolve) => {
                        return resolve(
                            new EmployeeDataModel({
                                id: testEmployee.id,
                                name: testEmployee.name,
                                department: testEmployee.department,
                                salary: testEmployee.salary,
                            })
                        );
                    });
                })
            );

            try {
                const dataResponse = await updateEmployee(
                    testEmployee.id,
                    testEmployeeRequest
                );

                expect(dataResponse.statusCode).toEqual(304);
                expect(dataResponse.errorMessage).toContain('No Change:');
                expect(dataResponse.data).toEqual(expectedEmployee);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('should return 200 status code with employee data and empty error message if employee data is different with database', async () => {
            const mockedFindByPk = jest.spyOn(EmployeeDataModel, 'findByPk');
            const mockedSave = jest.spyOn(EmployeeDataModel.prototype, 'save');

            const currentEmployee = new EmployeeDef(
                1,
                'test employee',
                1700,
                Department.HR
            );
            const updatedEmployee = new EmployeeDef(
                currentEmployee.id,
                currentEmployee.name,
                1500,
                currentEmployee.department
            );

            mockedFindByPk.mockImplementationOnce(
                jest.fn(() => {
                    return new Promise((resolve) => {
                        resolve(
                            new EmployeeDataModel({
                                id: currentEmployee.id,
                                name: currentEmployee.name,
                                department: currentEmployee.department,
                                salary: currentEmployee.salary,
                            })
                        );
                    });
                })
            );

            mockedSave.mockImplementationOnce(
                jest.fn(() => {
                    return new Promise((resolve) => {
                        resolve(
                            new EmployeeDataModel({
                                id: updatedEmployee.id,
                                name: updatedEmployee.name,
                                salary: updatedEmployee.salary,
                                department: updatedEmployee.department,
                            })
                        );
                    });
                })
            );

            try {
                const { data, errorMessage, statusCode } = await updateEmployee(
                    currentEmployee.id,
                    updatedEmployee
                );

                expect(data).toEqual(updatedEmployee);
                expect(errorMessage).toBe('');
                expect(statusCode).toEqual(200);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    });

    describe('deleteEmployee()', () => {
        const testEmployeeId = 1;
        const testErrorMessage = 'Test Error Message';
        const testEmployee = new EmployeeDef(
            testEmployeeId,
            'Test employee',
            1200,
            Department.HR
        );

        const { deleteEmployee } = EmployeeService;

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should execute EmployeeDataModel.findByPk() with employeeId', async () => {
            const mockedFindByPk = jest.spyOn(EmployeeDataModel, 'findByPk');
            const mockedDestroy = jest.spyOn(
                EmployeeDataModel.prototype,
                'destroy'
            );

            mockedFindByPk.mockResolvedValueOnce(
                new EmployeeDataModel({
                    id: testEmployee.id,
                    name: testEmployee.name,
                    salary: testEmployee.salary,
                    department: testEmployee.department,
                })
            );

            mockedFindByPk.mockResolvedValueOnce(null);

            mockedDestroy.mockResolvedValueOnce();

            try {
                await deleteEmployee(testEmployeeId);
            } catch (error) {
                expect(error).toBeUndefined();
            }

            expect(EmployeeDataModel.findByPk).toBeCalledTimes(2);
            expect(EmployeeDataModel.findByPk).toBeCalledWith(testEmployeeId);
        });

        it('should return promise reject with error message if EmployeeDataModel.findByPk() is throwing error', async () => {
            const mockedFindByPk = jest.spyOn(EmployeeDataModel, 'findByPk');

            mockedFindByPk.mockImplementationOnce(
                jest.fn(() => {
                    return new Promise((resolve, reject) => {
                        reject(testErrorMessage);
                    });
                })
            );

            try {
                const result = deleteEmployee(testEmployeeId);

                await expect(result).rejects.toEqual(testErrorMessage);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('should execute EmployeeDataModel.destroy() once without any param', async () => {
            const mockedFindByPk = jest.spyOn(EmployeeDataModel, 'findByPk');
            const mockedDestroy = jest.spyOn(
                EmployeeDataModel.prototype,
                'destroy'
            );

            mockedFindByPk.mockResolvedValueOnce(
                new EmployeeDataModel({
                    id: testEmployee.id,
                    name: testEmployee.name,
                    department: testEmployee.department,
                    salary: testEmployee.salary,
                })
            );

            mockedFindByPk.mockResolvedValueOnce(null);

            mockedDestroy.mockImplementationOnce(
                jest.fn(() => {
                    return new Promise((resolve) => {
                        return resolve();
                    });
                })
            );

            try {
                await deleteEmployee(testEmployeeId);
            } catch (error) {
                expect(error).toBeUndefined();
            }

            expect(EmployeeDataModel.prototype.destroy).toBeCalledTimes(1);
            expect(EmployeeDataModel.prototype.destroy).toBeCalledWith();
        });

        it('should return 404 status code with error message if the employee is not exist in database', async () => {
            const mockedFindByPk = jest.spyOn(EmployeeDataModel, 'findByPk');

            mockedFindByPk.mockResolvedValue(null);

            const expectedResult = new DataResponse(
                new TestEmployee(),
                404,
                'Employee Not Found'
            );

            try {
                const result = await deleteEmployee(testEmployeeId);

                expect(result.statusCode).toEqual(expectedResult.statusCode);
                expect(result.errorMessage).toContain(
                    expectedResult.errorMessage
                );
                expect(result.data).toEqual(expectedResult.data);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('should return 204 status code with empty error message if the employee is exist in database', async () => {
            const mockedFindByPk = jest.spyOn(EmployeeDataModel, 'findByPk');
            const mockedDestroy = jest.spyOn(
                EmployeeDataModel.prototype,
                'destroy'
            );

            mockedFindByPk.mockResolvedValueOnce(
                new EmployeeDataModel({
                    id: testEmployee.id,
                    name: testEmployee.name,
                    department: testEmployee.department,
                    salary: testEmployee.salary,
                })
            );

            mockedFindByPk.mockResolvedValueOnce(null);

            mockedDestroy.mockResolvedValueOnce();

            const expectedResult = new DataResponse(
                new TestEmployee(),
                204,
                ''
            );

            try {
                const result = await deleteEmployee(testEmployeeId);

                expect(result.data).toEqual(expectedResult.data);
                expect(result.errorMessage).toBe(expectedResult.errorMessage);
                expect(result.statusCode).toEqual(expectedResult.statusCode);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    });
});
