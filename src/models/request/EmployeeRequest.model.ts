import Department from "../employee/Department.enum";

export default class EmployeeRequest {
    public name: string;
    public salary: number;
    public department: Department;

    constructor(name: string, salary: number, department: Department) {
        this.name = name;
        this.salary = salary;
        this.department = department;
    }

    // public getName(): string {
    //     return this.name;
    // }

    // public getSalary(): number {
    //     return this.salary;
    // }

    // public getDepartment(): Department {
    //     return this.department;
    // }

    // public setName(name: string): string {
    //     this.name = name;
        
    //     return this.name;
    // }

    // public setSalary(salary: number): number {
    //     this.salary = salary;
        
    //     return this.salary;
    // }

    // public setDepartment(department: Department): Department {
    //     this.department = department;
        
    //     return this.department;
    // }
}

export class TestEmployeeRequest extends EmployeeRequest {
    constructor() {
        super("", -1, "" as Department);
    }
}