export default class ErrorResponse {
    errorMessage: string;

    constructor(errorMessage: any) {
        if (typeof errorMessage !== "string") {
            this.errorMessage = String(errorMessage);
        } else {
            this.errorMessage = errorMessage;
        }
    }
}