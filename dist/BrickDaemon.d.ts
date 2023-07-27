import { Device, TFAnyFunction, TFErrorCallback } from './Device.js';
import { IPConnection } from './IPConnection.js';
import { Char } from './Type/Char.js';
/**
 * BrickDaemon
 */
export declare class BrickDaemon extends Device {
    static FUNCTION_GET_AUTHENTICATION_NONCE: number;
    static FUNCTION_AUTHENTICATE: number;
    responseExpected: any[];
    callbackFormats: any[];
    APIVersion: number[];
    /**
     * constructor
     * @param uid
     * @param ipcon
     */
    constructor(uid: string, ipcon: IPConnection);
    /**
     * getAuthenticationNonce
     * @param returnCallback
     * @param errorCallback
     */
    getAuthenticationNonce(returnCallback: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * authenticate
     * @param clientNonce
     * @param digest
     * @param returnCallback
     * @param errorCallback
     */
    authenticate(clientNonce: Char[], digest: Char[], returnCallback: TFAnyFunction, errorCallback?: TFErrorCallback): void;
}
