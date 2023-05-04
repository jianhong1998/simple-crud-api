import Department from "../models/Department.enum";
import NumberVerifier from "../../number/NumberVerifier.service";

export default class EmployeeRequestVerificationService {
    public static verifyDepartment(department: unknown): boolean {
        return typeof department === "string" && Object.values(Department).includes(department as Department);
    }

    public static verifyEmployeeId(employeeId: string) {
        return NumberVerifier.isStringValidNumber(employeeId);
    }
}