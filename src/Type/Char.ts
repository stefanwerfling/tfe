/**
 * Char
 */
export class Char {

    /**
     * value
     * @private
     */
    private _value: number = 0;

    /**
     * constructor
     * @param char
     */
    public constructor(char: number | string) {
        this.setValue(char);
    }

    /**
     * getValue
     */
    public getValue(): string {
        return String.fromCharCode(this._value);
    }

    /**
     * setValue
     * @param char
     */
    public setValue(char: number | string): void {
        if (typeof char === 'number') {
            this._value = char;
        } else {
            this._value = char.charCodeAt(0);
        }
    }

    /**
     * charCodeAt
     */
    public charCodeAt(): number {
        return this._value;
    }

}