/// <reference types="node" resolution-mode="require"/>
import { BrickDaemon } from './BrickDaemon.js';
import { Device, TFAnyFunction, TFErrorCallback } from './Device.js';
import { TFSocket } from './TFSocket.js';
import { Char } from './Type/Char.js';
/**
 * CallbackConnected
 */
export type CallbackConnected = (connectReason: number) => void;
/**
 * CallbackEnumerate
 */
export type CallbackEnumerate = (uid: string, connectedUid: string, position: Char, hardwareVersion: number[], firmwareVersion: number[], deviceIdentifier: number, enumerationType: number) => void;
/**
 * CallbackDisconnected
 */
export type CallbackDisconnected = (disconnectReason: number) => void;
/**
 * TaskQueue
 */
export type TaskQueue = {
    handler: TFAnyFunction;
    kind: number;
};
/**
 * IPConnection
 */
export declare class IPConnection {
    static FUNCTION_ENUMERATE: number;
    static FUNCTION_DISCONNECT_PROBE: number;
    static CALLBACK_ENUMERATE: number;
    static CALLBACK_CONNECTED: number;
    static CALLBACK_DISCONNECTED: number;
    static BROADCAST_UID: number;
    static ENUMERATION_TYPE_AVAILABLE: number;
    static ENUMERATION_TYPE_CONNECTED: number;
    static ENUMERATION_TYPE_DISCONNECTED: number;
    static CONNECT_REASON_REQUEST: number;
    static CONNECT_REASON_AUTO_RECONNECT: number;
    static DISCONNECT_REASON_REQUEST: number;
    static DISCONNECT_REASON_ERROR: number;
    static DISCONNECT_REASON_SHUTDOWN: number;
    static CONNECTION_STATE_DISCONNECTED: number;
    static CONNECTION_STATE_CONNECTED: number;
    static CONNECTION_STATE_PENDING: number;
    static DISCONNECT_PROBE_INTERVAL: number;
    static RETRY_CONNECTION_INTERVAL: number;
    static ERROR_ALREADY_CONNECTED: number;
    static ERROR_NOT_CONNECTED: number;
    static ERROR_CONNECT_FAILED: number;
    static ERROR_INVALID_FUNCTION_ID: number;
    static ERROR_TIMEOUT: number;
    static ERROR_INVALID_PARAMETER: number;
    static ERROR_FUNCTION_NOT_SUPPORTED: number;
    static ERROR_UNKNOWN_ERROR: number;
    static ERROR_STREAM_OUT_OF_SYNC: number;
    static ERROR_NON_ASCII_CHAR_IN_SECRET: number;
    static ERROR_WRONG_DEVICE_TYPE: number;
    static ERROR_DEVICE_REPLACED: number;
    static ERROR_WRONG_RESPONSE_LENGTH: number;
    static ERROR_INT64_NOT_SUPPORTED: number;
    static TASK_KIND_CONNECT: number;
    static TASK_KIND_DISCONNECT: number;
    static TASK_KIND_AUTO_RECONNECT: number;
    static TASK_KIND_AUTHENTICATE: number;
    brickd: BrickDaemon;
    host?: string;
    port?: number;
    timeout: number;
    autoReconnect: boolean;
    nextSequenceNumber: number;
    nextAuthenticationNonce: number;
    devices: Device[];
    registeredCallbacks: (TFAnyFunction | CallbackConnected | CallbackEnumerate | CallbackDisconnected)[];
    socket?: TFSocket;
    isConnected: boolean;
    disconnectProbeIID?: any;
    mergeBuffer: Buffer;
    connectErrorCallback?: TFErrorCallback;
    taskQueue: TaskQueue[];
    /**
     * constructor
     */
    constructor();
    /**
     * addDevice
     * @param device
     */
    addDevice(device: Device): void;
    /**
     * disconnectProbe
     */
    disconnectProbe(): void;
    /**
     * pushTask
     * @param handler
     * @param kind
     */
    pushTask(handler: TFAnyFunction, kind: number): void;
    /**
     * executeTask
     */
    executeTask(): void;
    /**
     * popTask
     */
    popTask(): void;
    /**
     * removeNextTask
     */
    removeNextTask(): void;
    /**
     * getCurrentTaskKind
     */
    getCurrentTaskKind(): any | undefined;
    /**
     * getNextTaskKind
     */
    getNextTaskKind(): any | undefined;
    /**
     * disconnect
     * @param errorCallback
     */
    disconnect(errorCallback?: TFErrorCallback): void;
    /**
     * disconnectInternal
     * @param errorCallback
     */
    disconnectInternal(errorCallback?: TFErrorCallback): void;
    /**
     * connect
     * @param host
     * @param port
     * @param errorCallback
     */
    connect(host: string, port: number, errorCallback?: TFErrorCallback): void;
    /**
     * connectInternal
     * @param host
     * @param port
     * @param errorCallback
     */
    connectInternal(host: string, port: number, errorCallback?: TFErrorCallback): void;
    /**
     * handleConnect
     */
    handleConnect(): void;
    /**
     * handleIncomingData
     * @param data
     */
    handleIncomingData(data: Buffer): void;
    /**
     * handleConnectionError
     * @param error
     */
    handleConnectionError(error: Error): void;
    /**
     * handleAutoReconnectError
     * @param error
     */
    handleAutoReconnectError(error: number): void;
    /**
     * handleConnectionClose
     */
    handleConnectionClose(): void;
    /**
     * resetDisconnectProbe
     */
    resetDisconnectProbe(): void;
    /**
     * getUIDFromPacket
     * @param packetUID
     */
    getUIDFromPacket(packetUID: Buffer): number;
    /**
     * getLengthFromPacket
     * @param packetLen
     */
    getLengthFromPacket(packetLen: Buffer): number;
    /**
     * getFunctionIDFromPacket
     * @param packetFID
     */
    getFunctionIDFromPacket(packetFID: Buffer): number;
    /**
     * getSequenceNumberFromPacket
     * @param packetSeq
     */
    getSequenceNumberFromPacket(packetSeq: Buffer): number;
    /**
     * getRFromPacket
     * @param packetR
     */
    getRFromPacket(packetR: Buffer): number;
    /**
     * getEFromPacket
     * @param packetE
     */
    getEFromPacket(packetE: Buffer): number;
    /**
     * getPayloadFromPacket
     * @param packetPayload
     */
    getPayloadFromPacket(packetPayload: Buffer): any;
    /**
     * mapsToFalse
     * @param value
     */
    mapsToFalse(value: any): boolean;
    /**
     * pack
     * @param data
     * @param format
     */
    pack(data: any[], format: string): Buffer;
    /**
     * unpack
     * @param unpackPayload
     * @param format
     */
    unpack(unpackPayload: Buffer, format: string): any[];
    /**
     * sendRequest
     * @param sendRequestDevice
     * @param sendRequestFID
     * @param sendRequestData
     * @param sendRequestPackFormat
     * @param sendRequestExpectedResponseLength
     * @param sendRequestUnpackFormat
     * @param sendRequestReturnCB
     * @param sendRequestErrorCB
     * @param startStreamResponseTimer
     * @param checkValidity
     */
    sendRequest(sendRequestDevice: Device, sendRequestFID: number, sendRequestData: any[], sendRequestPackFormat: string, sendRequestExpectedResponseLength: number, sendRequestUnpackFormat: string, sendRequestReturnCB?: TFAnyFunction, sendRequestErrorCB?: TFErrorCallback, startStreamResponseTimer?: boolean, checkValidity?: boolean): void;
    /**
     * sendRequestInternal
     * @param sendRequestDevice
     * @param sendRequestFID
     * @param sendRequestData
     * @param sendRequestPackFormat
     * @param sendRequestExpectedResponseLength
     * @param sendRequestUnpackFormat
     * @param sendRequestReturnCB
     * @param sendRequestErrorCB
     * @param startStreamResponseTimer
     */
    sendRequestInternal(sendRequestDevice: Device, sendRequestFID: number, sendRequestData: any[], sendRequestPackFormat: string, sendRequestExpectedResponseLength: number, sendRequestUnpackFormat: string, sendRequestReturnCB?: TFAnyFunction, sendRequestErrorCB?: TFErrorCallback, startStreamResponseTimer?: boolean): void;
    /**
     * sendRequestTimeout
     * @param timeoutDevice
     * @param timeoutDeviceOID
     * @param timeoutErrorCB
     */
    sendRequestTimeout(timeoutDevice: Device, timeoutDeviceOID: number, timeoutErrorCB?: TFErrorCallback): void;
    /**
     * sendRequestTimeoutStreamOut
     * @param timeoutDevice
     * @param timeoutFID
     * @param _timeoutErrorCB
     */
    sendRequestTimeoutStreamOut(timeoutDevice: Device, timeoutFID: number, _timeoutErrorCB?: TFErrorCallback): void;
    /**
     * handleResponse
     * @param packetResponse
     */
    handleResponse(packetResponse: Buffer): void;
    /**
     * handleCallback
     * @param packetCallback
     */
    handleCallback(packetCallback: Buffer): void;
    /**
     * handlePacket
     * @param packet
     */
    handlePacket(packet: Buffer): void;
    /**
     * getConnectionState
     */
    getConnectionState(): number;
    /**
     * setAutoReconnect
     * @param autoReconnect
     */
    setAutoReconnect(autoReconnect: boolean): void;
    /**
     * getAutoReconnect
     */
    getAutoReconnect(): boolean;
    /**
     * setTimeout
     * @param timeout
     */
    setTimeout(timeout: number): void;
    /**
     * getTimeout
     */
    getTimeout(): number;
    /**
     * enumerate
     * @param errorCallback
     */
    enumerate(errorCallback?: TFErrorCallback): void;
    /**
     * getRandomUInt32
     * @param returnCallback
     */
    getRandomUInt32(returnCallback: TFErrorCallback): void;
    /**
     * isASCII
     * @param s
     */
    isASCII(s: string): boolean;
    /**
     * authenticateInternal
     * @param secret
     * @param returnCallback
     * @param errorCallback
     */
    authenticateInternal(secret: string, returnCallback: TFAnyFunction, errorCallback: TFErrorCallback): void;
    /**
     * authenticate
     * @param secret
     * @param returnCallback
     * @param errorCallback
     */
    authenticate(secret: string, returnCallback: TFAnyFunction, errorCallback: TFErrorCallback): void;
    /**
     * on
     * @param callbackID
     * @param function_
     */
    on(callbackID: number, function_: TFAnyFunction): void;
    /**
     * getNextSequenceNumber
     */
    getNextSequenceNumber(): number;
    /**
     * createPacketHeader
     * @param headerDevice
     * @param headerLength
     * @param headerFunctionID
     * @param headerErrorCB
     */
    createPacketHeader(headerDevice: Device | undefined, headerLength: number, headerFunctionID: number, headerErrorCB?: TFErrorCallback): Buffer | null;
    /**
     * createChunkData
     * @param data
     * @param chunkOffset
     * @param chunkLength
     * @param chunkPadding
     */
    createChunkData(data: string[], chunkOffset: number, chunkLength: number, chunkPadding: string): string[];
}
