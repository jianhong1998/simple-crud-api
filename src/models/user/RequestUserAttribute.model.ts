import LoginUserAttribute from "./LoginUserAttribute.model";

export default interface RequestUserAttribute extends LoginUserAttribute {
    departmentId: number;
}