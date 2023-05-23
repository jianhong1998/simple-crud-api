import RequestUserAttribute from "./RequestUserAttribute.model";

export default interface FullUserAttribute extends RequestUserAttribute {
    userId: string;
}