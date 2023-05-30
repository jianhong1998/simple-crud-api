import Department from '../../models/employee/Department.enum';
import NumberVerifier from '../number/NumberVerifier.service';

export default class EmployeeRequestVerificationService {
    public static verifyDepartment(department: unknown): boolean {
        return (
            typeof department === 'string' &&
            Object.values(Department).includes(
                department.toUpperCase() as Department
            )
        );
    }

    public static verifyEmployeeId(employeeId: unknown): boolean {
        return (
            typeof employeeId === 'string' &&
            NumberVerifier.isStringValidNumber(employeeId) &&
            parseInt(employeeId) > 0
        );
    }

    public static verifyName(name: unknown): boolean {
        return typeof name === 'string';
    }

    public static verifySalary(salary: unknown): boolean {
        return typeof salary === 'number' && salary > 0;
    }
}
