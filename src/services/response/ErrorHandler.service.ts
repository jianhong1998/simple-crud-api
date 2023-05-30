export default class ErrorHandler {
    public static handleUnknownError(error: unknown): string {
        if (error instanceof Error) {
            return error.message;
        }

        if (
            typeof error === 'object' &&
            error !== null &&
            !Array.isArray(error)
        ) {
            return JSON.stringify(error);
        }

        return String(error);
    }
}
