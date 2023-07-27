/**
 * Char
 */
export class Char {
    /**
     * constructor
     * @param char
     */
    constructor(char) {
        /**
         * value
         * @private
         */
        this._value = 0;
        this.setValue(char);
    }
    /**
     * getValue
     */
    getValue() {
        return String.fromCharCode(this._value);
    }
    /**
     * setValue
     * @param char
     */
    setValue(char) {
        if (typeof char === 'number') {
            this._value = char;
        }
        else {
            this._value = char.charCodeAt(0);
        }
    }
    /**
     * charCodeAt
     */
    charCodeAt() {
        return this._value;
    }
}
