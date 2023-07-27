import {IPConnection} from './IPConnection.js';
import {Utils} from './Utils.js';

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
    responseHandler: TFAnyFunction|null;
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
    fixedLength: number|null;
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
export class Device {

    // getter
    public static RESPONSE_EXPECTED_ALWAYS_TRUE = 1;
    // setter
    public static RESPONSE_EXPECTED_TRUE = 2;
    // setter, default
    public static RESPONSE_EXPECTED_FALSE = 3;

    // keep in sync with IPConnection.ERROR_INVALID_FUNCTION_ID
    public static ERROR_INVALID_FUNCTION_ID = 21;
    // keep in sync with IPConnection.ERROR_WRONG_DEVICE_TYPE
    public static ERROR_WRONG_DEVICE_TYPE = 81;
    // keep in sync with IPConnection.ERROR_DEVICE_REPLACED
    public static ERROR_DEVICE_REPLACED = 82;

    public static DEVICE_IDENTIFIER_CHECK_PENDING = 0;
    public static DEVICE_IDENTIFIER_CHECK_MATCH = 1;
    public static DEVICE_IDENTIFIER_CHECK_MISMATCH = 2;

    public replaced: boolean = false;
    public uid: number = 0;
    public deviceIdentifier: number = 0;
    public deviceDisplayName: string = '';
    public deviceIdentifierCheck: number = 0;
    public responseExpected: any[] = [];
    public callbackFormats: any[] = [];
    public highLevelCallbacks: any[] = [];
    public streamStateObjects: TFStreamStateObjects[] = [];
    public registeredCallbacks: any[] = [];
    public ipcon: IPConnection;
    public expectedResponses: any[] = [];
    public deviceOID = 0;
    public APIVersion: number[] = [0, 0, 0];

    /**
     * constructor
     * @param uid
     * @param ipcon
     * @param deviceIdentifier
     * @param deviceDisplayName
     */
    public constructor(uid: string, ipcon: IPConnection, deviceIdentifier: number, deviceDisplayName: string) {
        this.replaced = false;
        this.uid = Utils.base58Decode(uid);

        if (this.uid === 0) {
            throw new Error(`UID "${uid}" is empty or maps to zero`);
        }

        this.deviceIdentifier = deviceIdentifier;
        this.deviceDisplayName = deviceDisplayName;
        this.deviceIdentifierCheck = Device.DEVICE_IDENTIFIER_CHECK_PENDING;
        this.ipcon = ipcon;
    }

    /**
     * getDeviceOID
     */
    public getDeviceOID(): number {
        return this.deviceOID;
    }

    /**
     * getAPIVersion
     */
    public getAPIVersion(): number[] {
        return this.APIVersion;
    }

    /**
     * on
     * @param callbackID
     * @param function_
     * @param errorCallback
     */
    public on(callbackID: number, function_: TFAnyFunction, errorCallback?: TFErrorCallback): void {
        // Support for 64-bit integers exists only in node 10.4 or higher
        if ((typeof BigInt === 'undefined')
            && ((this.callbackFormats[callbackID].indexOf('q') > -1)
            || (this.callbackFormats[callbackID].indexOf('Q') > -1))
        ) {
            if (errorCallback) {
                errorCallback(IPConnection.ERROR_INT64_NOT_SUPPORTED);
            }

            return;
        }

        this.registeredCallbacks[callbackID] = function_;
    }

    /**
     * getResponseExpected
     * @param functionID
     * @param errorCallback
     */
    public getResponseExpected(functionID: number, errorCallback?: TFErrorCallback): boolean|undefined {
        if (this.responseExpected[functionID] === undefined) {
            if (errorCallback) {
                errorCallback(Device.ERROR_INVALID_FUNCTION_ID);
            }

            return undefined;
        }

        return this.responseExpected[functionID] === Device.RESPONSE_EXPECTED_TRUE ||
            this.responseExpected[functionID] === Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
    }

    /**
     * setResponseExpected
     * @param functionID
     * @param responseBoolean
     * @param errorCallback
     */
    public setResponseExpected(functionID: number, responseBoolean: boolean, errorCallback?: TFErrorCallback): void {
        if (this.responseExpected[functionID] === undefined) {
            if (errorCallback) {
                errorCallback(Device.ERROR_INVALID_FUNCTION_ID);
            }

            return;
        }

        if (this.responseExpected[functionID] === Device.RESPONSE_EXPECTED_TRUE ||
            this.responseExpected[functionID] === Device.RESPONSE_EXPECTED_FALSE) {
            if (responseBoolean) {
                this.responseExpected[functionID] = Device.RESPONSE_EXPECTED_TRUE;
            } else {
                this.responseExpected[functionID] = Device.RESPONSE_EXPECTED_FALSE;
            }

            return;
        }

        if (errorCallback) {
            errorCallback(Device.ERROR_INVALID_FUNCTION_ID);
        }
    }

    /**
     * setResponseExpectedAll
     * @param responseBoolean
     */
    public setResponseExpectedAll(responseBoolean: boolean): void {
        if (responseBoolean || !responseBoolean) {
            for (const fid in this.responseExpected) {
                if (this.responseExpected[fid] === Device.RESPONSE_EXPECTED_TRUE ||
                    this.responseExpected[fid] === Device.RESPONSE_EXPECTED_FALSE) {
                    if (responseBoolean) {
                        this.responseExpected[fid] = Device.RESPONSE_EXPECTED_TRUE;
                    } else {
                        this.responseExpected[fid] = Device.RESPONSE_EXPECTED_FALSE;
                    }
                }
            }
        }
    }

    /**
     * resetStreamStateObject
     * @param streamStateObject
     */
    public resetStreamStateObject(streamStateObject: TFStreamStateObjects): void {
        streamStateObject.responseProperties.running = false;
        streamStateObject.responseProperties.runningSubcall = false;
        streamStateObject.responseProperties.runningSubcallOOS = false;
        streamStateObject.responseProperties.waitingFirstChunk = true;

        if (streamStateObject.responseProperties.timeout !== null) {
            clearTimeout(streamStateObject.responseProperties.timeout);
            streamStateObject.responseProperties.timeout = null;
        }

        streamStateObject.responseProperties.data.length = 0;
        streamStateObject.responseProperties.streamInChunkOffset = 0;
        streamStateObject.responseProperties.streamInChunkLength = 0;
        streamStateObject.responseProperties.streamInWritten = 0;
        streamStateObject.responseProperties.streamInLLParams = null;
        streamStateObject.responseProperties.returnCB = undefined;
        streamStateObject.responseProperties.errorCB = undefined;
    }

    /**
     * checkValidity
     * @param returnCallback
     * @param errorCallback
     */
    public checkValidity(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {
        if (this.replaced) {
            if (errorCallback) {
                errorCallback(Device.ERROR_DEVICE_REPLACED);
            }
        } else if (this.deviceIdentifierCheck === Device.DEVICE_IDENTIFIER_CHECK_MATCH) {
            if (returnCallback) {
                returnCallback();
            }
        } else if (this.deviceIdentifierCheck === Device.DEVICE_IDENTIFIER_CHECK_MISMATCH) {
            if (errorCallback) {
                errorCallback(Device.ERROR_WRONG_DEVICE_TYPE);
            }
        } else {

            // Device.DEVICE_IDENTIFIER_CHECK_PENDING
            this.ipcon.sendRequest(
                this,
                255,
                [],
                '',
                33,
                // getIdentity
                's8 s8 c B3 B3 H',
                (
                    _uid,
                    _connectedUid,
                    _position,
                    _hardwareVersion,
                    _firmwareVersion,
                    deviceIdentifier
                ): void => {
                    if (deviceIdentifier === this.deviceIdentifier) {
                        this.deviceIdentifierCheck = Device.DEVICE_IDENTIFIER_CHECK_MATCH;

                        if (returnCallback) {
                            returnCallback();
                        }
                    } else {
                        this.deviceIdentifierCheck = Device.DEVICE_IDENTIFIER_CHECK_MISMATCH;

                        if (errorCallback) {
                            errorCallback(Device.ERROR_WRONG_DEVICE_TYPE);
                        }
                    }
                },
                errorCallback,
                false,
                false
            );
        }
    }

}