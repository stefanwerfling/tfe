/**
 * Char
 */
export declare class Char {
    /**
     * value
     * @private
     */
    private _value;
    /**
     * constructor
     * @param char
     */
    constructor(char: number | string);
    /**
     * getValue
     */
    getValue(): string;
    /**
     * setValue
     * @param char
     */
    setValue(char: number | string): void;
    /**
     * charCodeAt
     */
    charCodeAt(): number;
}
