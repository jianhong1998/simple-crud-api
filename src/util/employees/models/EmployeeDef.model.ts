import Department from './Department.enum';
import EmployeeRequest from './EmployeeRequest.model';

export default class EmployeeDef extends EmployeeRequest {
    public readonly id: number;
    
    constructor(id: number, name: string, salary: number, department: Department) {
        super(name, salary, department);

        this.id = id;
    }

    // public getId(): number {
    //     return this.id;
    // }

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

    compare(employee: EmployeeDef): boolean {
        return  this.id === employee.id &&
                this.name === employee.name &&
                this.salary === employee.salary &&
                this.department === employee.department
        ;
    }
}

export class TestEmployee extends EmployeeDef {
    constructor() {
        super(-1, "", -1, "" as Department);
    }
}