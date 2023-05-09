// import EmployeeDef from "../../models/employee/EmployeeDef.model";

// // No more usage

// export default abstract class EmployeeStorageController {
//     private static employeeMap: Map<number, EmployeeDef> = new Map();

//     public static getAll(): EmployeeDef[] {
//         const resultArray = [] as EmployeeDef[];

//         resultArray.push(...this.employeeMap.values());

//         return resultArray;
//     }

//     public static get(employeeId: number): EmployeeDef | undefined {
//         return this.employeeMap.get(employeeId);
//     }

//     public static has(employeeId: number): boolean {
//         return typeof this.get(employeeId) !== "undefined";
//     }

//     public static size(): number {
//         return this.employeeMap.size;
//     }

//     public static insert(employee: EmployeeDef): EmployeeDef {
//         const employeeId = employee.id;

//         // In case of employeeId is exist in map
//         if (this.has(employeeId)) {
//             const existingEmployeeWithSameId = this.get(employee.id) as EmployeeDef;
            
//             // Same employee
//             if (existingEmployeeWithSameId.compare(employee)) {
//                 throw new Error('EmployeeId Exist: Employee is already exist.');
//             } else {    // Different Employee
//                 throw new Error(`EmployeeId Exist: EmployeeId ${employeeId} is used.`);
//             }
//         }

//         this.employeeMap.set(employeeId, employee);

//         const insertedEmployee = this.employeeMap.get(employeeId);

//         if (typeof insertedEmployee === "undefined") {
//             throw new Error('Insertion Fail: Employee is not inserted.');
//         }

//         if (!employee.compare(insertedEmployee)) {
//             throw new Error('Insertion Fail: Inserted employee is not same with the input employee.');
//         }

//         return insertedEmployee;
//     }

//     public static update(employee: EmployeeDef): EmployeeDef {
//         const employeeId = employee.id;
        
//         let currentEmployee = this.get(employeeId);

//         // In case of employee is not exist
//         if (typeof currentEmployee === "undefined") {
//             throw new Error('Employee Not Found: Employee is not exist.');
//         }

//         // In case of employee data no different
//         if (currentEmployee.compare(employee)) {
//             throw new Error('No Change: Employee data is the same.');
//         }

//         this.employeeMap.set(employeeId, employee);

//         currentEmployee = this.get(employeeId);

//         // In case of employee is not exist
//         if (typeof currentEmployee === "undefined") {
//             throw new Error('Employee Not Found: Employee data loss after update process.');
//         }

//         // In case of updated employee is not same with the input employee
//         if (!currentEmployee.compare(employee)) {
//             throw new Error('Update Fail: Updated employee is not the same with input employee.');
//         }

//         return currentEmployee;
//     }

//     public static delete(employeeId: number): EmployeeDef {
//         const employee = this.get(employeeId);
        
//         if (typeof employee === "undefined") {
//             throw new Error('Employee Not Found: Employee is not exist.');
//         }

//         const deleteResult = this.employeeMap.delete(employeeId);

//         if (!deleteResult) {
//             throw new Error('Delete Fail: Delete process running fail.');
//         }

//         return employee;
//     }
// }