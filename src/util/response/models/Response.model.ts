export default class DataResponse<T> {
    data: T;
    statusCode: number;
    errorMessage: string;

    constructor(data: T, statusCode: number, errorMessage: string) {
        this.data = data;
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
    }
}