export default class NumberVerifier {
    public static isStringValidNumber(numberInString: string): boolean {
        return numberInString.length === this.getDigit(parseInt(numberInString));
    }

    public static getDigit(number: number): number {
        return Math.floor(Math.log(number) / Math.LN10) + 1;
    }
}