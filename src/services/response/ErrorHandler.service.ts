export default class ErrorHandler {
    public static handleUnknownError(error: unknown): string {
        if (error instanceof Error) {
            return error.message;
        }

        return String(error);
    }
}
