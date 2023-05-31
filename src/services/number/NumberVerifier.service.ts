export default class NumberVerifier {
    public static isStringValidNumber(numberInString: string): boolean {
        let carry = 0;
        let temp = numberInString;

        if (temp.slice(0, 2) === '-0') {
            carry++;
            temp = numberInString.slice(1, numberInString.length);
        }

        const strings = numberInString.split('.');

        if (strings.length > 2) {
            return false;
        }

        if (strings.length === 2) {
            carry++;

            let numberInSecondString = parseInt(strings[1]);

            if (!isNaN(numberInSecondString)) {
                carry += this.getDigit(numberInSecondString);
            }
        }

        return (
            numberInString.length ===
            this.getDigit(parseInt(strings[0])) + carry
        );
    }

    public static getDigit(integer: number): number {
        if (integer === 0) {
            return 1;
        }

        let carry: number = 0;
        let positive: number = integer;

        if (integer < 0) {
            positive = integer * -1;
            carry++;
        }

        if (positive % 1 > 0) {
            throw new Error('Input must be an integer (no decimal).');
        }

        return Math.floor(Math.log10(positive)) + 1 + carry;
    }
}
