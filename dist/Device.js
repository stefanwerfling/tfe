import { IPConnection } from './IPConnection.js';
import { Utils } from './Utils.js';
/**
 * Device
 */
export class Device {
    /**
     * constructor
     * @param uid
     * @param ipcon
     * @param deviceIdentifier
     * @param deviceDisplayName
     */
    constructor(uid, ipcon, deviceIdentifier, deviceDisplayName) {
        this.replaced = false;
        this.uid = 0;
        this.deviceIdentifier = 0;
        this.deviceDisplayName = '';
        this.deviceIdentifierCheck = 0;
        this.responseExpected = [];
        this.callbackFormats = [];
        this.highLevelCallbacks = [];
        this.streamStateObjects = [];
        this.registeredCallbacks = [];
        this.expectedResponses = [];
        this.deviceOID = 0;
        this.APIVersion = [0, 0, 0];
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
    getDeviceOID() {
        return this.deviceOID;
    }
    /**
     * getAPIVersion
     */
    getAPIVersion() {
        return this.APIVersion;
    }
    /**
     * on
     * @param callbackID
     * @param function_
     * @param errorCallback
     */
    on(callbackID, function_, errorCallback) {
        // Support for 64-bit integers exists only in node 10.4 or higher
        if ((typeof BigInt === 'undefined')
            && ((this.callbackFormats[callbackID].indexOf('q') > -1)
                || (this.callbackFormats[callbackID].indexOf('Q') > -1))) {
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
    getResponseExpected(functionID, errorCallback) {
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
    setResponseExpected(functionID, responseBoolean, errorCallback) {
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
            }
            else {
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
    setResponseExpectedAll(responseBoolean) {
        if (responseBoolean || !responseBoolean) {
            for (const fid in this.responseExpected) {
                if (this.responseExpected[fid] === Device.RESPONSE_EXPECTED_TRUE ||
                    this.responseExpected[fid] === Device.RESPONSE_EXPECTED_FALSE) {
                    if (responseBoolean) {
                        this.responseExpected[fid] = Device.RESPONSE_EXPECTED_TRUE;
                    }
                    else {
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
    resetStreamStateObject(streamStateObject) {
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
    checkValidity(returnCallback, errorCallback) {
        if (this.replaced) {
            if (errorCallback) {
                errorCallback(Device.ERROR_DEVICE_REPLACED);
            }
        }
        else if (this.deviceIdentifierCheck === Device.DEVICE_IDENTIFIER_CHECK_MATCH) {
            if (returnCallback) {
                returnCallback();
            }
        }
        else if (this.deviceIdentifierCheck === Device.DEVICE_IDENTIFIER_CHECK_MISMATCH) {
            if (errorCallback) {
                errorCallback(Device.ERROR_WRONG_DEVICE_TYPE);
            }
        }
        else {
            // Device.DEVICE_IDENTIFIER_CHECK_PENDING
            this.ipcon.sendRequest(this, 255, [], '', 33, 
            // getIdentity
            's8 s8 c B3 B3 H', (_uid, _connectedUid, _position, _hardwareVersion, _firmwareVersion, deviceIdentifier) => {
                if (deviceIdentifier === this.deviceIdentifier) {
                    this.deviceIdentifierCheck = Device.DEVICE_IDENTIFIER_CHECK_MATCH;
                    if (returnCallback) {
                        returnCallback();
                    }
                }
                else {
                    this.deviceIdentifierCheck = Device.DEVICE_IDENTIFIER_CHECK_MISMATCH;
                    if (errorCallback) {
                        errorCallback(Device.ERROR_WRONG_DEVICE_TYPE);
                    }
                }
            }, errorCallback, false, false);
        }
    }
}
// getter
Device.RESPONSE_EXPECTED_ALWAYS_TRUE = 1;
// setter
Device.RESPONSE_EXPECTED_TRUE = 2;
// setter, default
Device.RESPONSE_EXPECTED_FALSE = 3;
// keep in sync with IPConnection.ERROR_INVALID_FUNCTION_ID
Device.ERROR_INVALID_FUNCTION_ID = 21;
// keep in sync with IPConnection.ERROR_WRONG_DEVICE_TYPE
Device.ERROR_WRONG_DEVICE_TYPE = 81;
// keep in sync with IPConnection.ERROR_DEVICE_REPLACED
Device.ERROR_DEVICE_REPLACED = 82;
Device.DEVICE_IDENTIFIER_CHECK_PENDING = 0;
Device.DEVICE_IDENTIFIER_CHECK_MATCH = 1;
Device.DEVICE_IDENTIFIER_CHECK_MISMATCH = 2;
