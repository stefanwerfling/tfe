import { IPConnection } from './IPConnection.js';
/**
 * TFErrorCallback
 */
export type TFErrorCallback = (error: number) => void;
/**
 * TFAnyFunction
 */
export type TFAnyFunction = (...args: any[]) => any;
/**
 * TFCallDevice
 */
export type TFCallDevice = <T extends Device>(device: T) => void;
/**
 * TFResponseProperties
 */
export type TFResponseProperties = {
    running: boolean;
    runningSubcall: boolean;
    runningSubcallOOS: boolean;
    waitingFirstChunk: boolean;
    timeout: any;
    data: any[];
    streamInChunkOffset: number;
    streamInChunkLength: number;
    streamInResponseEmpty: boolean;
    streamInWritten: number;
    streamInLLParams: any;
    responseHandler: TFAnyFunction | null;
    packFormatString: string;
    unpackFormatString: string;
    returnCB?: TFAnyFunction;
    errorCB?: TFErrorCallback;
    callQueue: TFCallDevice[];
};
/**
 * TFStreamProperties
 */
export type TFStreamProperties = {
    fixedLength: number | null;
    singleChunk: boolean;
    shortWrite: boolean;
};
/**
 * TFStreamStateObjects
 */
export type TFStreamStateObjects = {
    dataMapping: any[];
    dataMappingStreamIn: any[];
    streamProperties: TFStreamProperties;
    responseProperties: TFResponseProperties;
};
/**
 * Device
 */
export declare class Device {
    static RESPONSE_EXPECTED_ALWAYS_TRUE: number;
    static RESPONSE_EXPECTED_TRUE: number;
    static RESPONSE_EXPECTED_FALSE: number;
    static ERROR_INVALID_FUNCTION_ID: number;
    static ERROR_WRONG_DEVICE_TYPE: number;
    static ERROR_DEVICE_REPLACED: number;
    static DEVICE_IDENTIFIER_CHECK_PENDING: number;
    static DEVICE_IDENTIFIER_CHECK_MATCH: number;
    static DEVICE_IDENTIFIER_CHECK_MISMATCH: number;
    replaced: boolean;
    uid: number;
    deviceIdentifier: number;
    deviceDisplayName: string;
    deviceIdentifierCheck: number;
    responseExpected: any[];
    callbackFormats: any[];
    highLevelCallbacks: any[];
    streamStateObjects: TFStreamStateObjects[];
    registeredCallbacks: any[];
    ipcon: IPConnection;
    expectedResponses: any[];
    deviceOID: number;
    APIVersion: number[];
    /**
     * constructor
     * @param uid
     * @param ipcon
     * @param deviceIdentifier
     * @param deviceDisplayName
     */
    constructor(uid: string, ipcon: IPConnection, deviceIdentifier: number, deviceDisplayName: string);
    /**
     * getDeviceOID
     */
    getDeviceOID(): number;
    /**
     * getAPIVersion
     */
    getAPIVersion(): number[];
    /**
     * on
     * @param callbackID
     * @param function_
     * @param errorCallback
     */
    on(callbackID: number, function_: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * getResponseExpected
     * @param functionID
     * @param errorCallback
     */
    getResponseExpected(functionID: number, errorCallback?: TFErrorCallback): boolean | undefined;
    /**
     * setResponseExpected
     * @param functionID
     * @param responseBoolean
     * @param errorCallback
     */
    setResponseExpected(functionID: number, responseBoolean: boolean, errorCallback?: TFErrorCallback): void;
    /**
     * setResponseExpectedAll
     * @param responseBoolean
     */
    setResponseExpectedAll(responseBoolean: boolean): void;
    /**
     * resetStreamStateObject
     * @param streamStateObject
     */
    resetStreamStateObject(streamStateObject: TFStreamStateObjects): void;
    /**
     * checkValidity
     * @param returnCallback
     * @param errorCallback
     */
    checkValidity(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
}
