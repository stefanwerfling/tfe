/**
 * Utils
 */
export class Utils {
    /**
     * base58Decode
     * @param str
     */
    static base58Decode(str) {
        const alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
        const base = alphabet.length;
        let char;
        let char_index;
        let index = 0;
        let num = 0;
        const ref = str.split(/(?:)/u).reverse();
        for (let i = 0, len = ref.length; i < len; index = ++i) {
            char = ref[index];
            if ((char_index = alphabet.indexOf(char)) === -1) {
                throw new Error(`UID "${str}" contains invalid character`);
            }
            num += char_index * (base ** index);
            if (!Number.isSafeInteger(num) || num > 0xFFFFFFFF) {
                throw new Error(`UID "${str}" is too big`);
            }
        }
        return num;
    }
    // eslint-disable-next-line no-undef
    static buffer_wrapper(size_or_array, encoding) {
        let result;
        if (typeof size_or_array === 'number') {
            if (Buffer.alloc) {
                result = Buffer.alloc(size_or_array);
            }
            else {
                const buf = new Buffer(size_or_array);
                buf.fill(0);
                result = buf;
            }
        }
        else if (Buffer.from && Buffer.from !== Uint8Array.from) {
            result = Buffer.from(size_or_array, encoding);
        }
        else {
            result = new Buffer(size_or_array, encoding);
        }
        return result;
    }
    /**
     * bufferConcat
     * @param arrayOfBuffers
     */
    static bufferConcat(arrayOfBuffers) {
        let newBufferSize = 0;
        let targetStart = 0;
        for (const item of arrayOfBuffers) {
            newBufferSize += item.length;
        }
        const returnBufferConcat = Utils.buffer_wrapper(newBufferSize);
        for (const item of arrayOfBuffers) {
            item.copy(returnBufferConcat, targetStart);
            targetStart += item.length;
        }
        return returnBufferConcat;
    }
    /**
     * toHex
     * @param str
     */
    static toHex(str) {
        let hex = '';
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            let hexValue = charCode.toString(16);
            if (hexValue.length < 2) {
                hexValue = `0${hexValue}`;
            }
            hex += hexValue;
        }
        return hex;
    }
    /**
     * hex2a
     * @param hex
     */
    static hex2a(hex) {
        let str = '';
        for (let i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str;
    }
}
