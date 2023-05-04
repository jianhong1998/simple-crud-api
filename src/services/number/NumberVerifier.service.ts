export default class NumberVerifier {
    public static isStringValidNumber(numberInString: string): boolean {
        return numberInString.length === this.getDigit(parseInt(numberInString));
    }

    public static getDigit(number: number): number {
        if (number < 0) {
            number = number * -1;
        }
        
        return Math.floor(Math.log(number) / Math.LN10) + 1;
    }
}