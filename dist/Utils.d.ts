/// <reference types="node" resolution-mode="require"/>
/**
 * Utils
 */
export declare class Utils {
    /**
     * base58Decode
     * @param str
     */
    static base58Decode(str: string): number;
    static buffer_wrapper(size_or_array: number | any, encoding?: BufferEncoding): Buffer;
    /**
     * bufferConcat
     * @param arrayOfBuffers
     */
    static bufferConcat(arrayOfBuffers: Buffer[]): Buffer;
    /**
     * toHex
     * @param str
     */
    static toHex(str: string): string;
    /**
     * hex2a
     * @param hex
     */
    static hex2a(hex: string): string;
}
