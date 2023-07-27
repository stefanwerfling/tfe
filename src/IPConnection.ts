import crypto from 'crypto';
import {BrickDaemon} from './BrickDaemon.js';
import {Device, TFAnyFunction, TFErrorCallback} from './Device.js';
import {TFSocket} from './TFSocket.js';
import {Char} from './Type/Char.js';
import {Utils} from './Utils.js';

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
export class IPConnection {

    public static FUNCTION_ENUMERATE = 254;
    public static FUNCTION_DISCONNECT_PROBE = 128;
    public static CALLBACK_ENUMERATE = 253;
    public static CALLBACK_CONNECTED = 0;
    public static CALLBACK_DISCONNECTED = 1;
    public static BROADCAST_UID = 0;

    // Enumeration type parameter to the enumerate callback
    public static ENUMERATION_TYPE_AVAILABLE = 0;
    public static ENUMERATION_TYPE_CONNECTED = 1;
    public static ENUMERATION_TYPE_DISCONNECTED = 2;

    // Connect reason parameter to the connected callback
    public static CONNECT_REASON_REQUEST = 0;
    public static CONNECT_REASON_AUTO_RECONNECT = 1;

    // Disconnect reason parameter to the disconnected callback
    public static DISCONNECT_REASON_REQUEST = 0;
    public static DISCONNECT_REASON_ERROR = 1;
    public static DISCONNECT_REASON_SHUTDOWN = 2;

    // Returned by getConnectionState()
    public static CONNECTION_STATE_DISCONNECTED = 0;
    public static CONNECTION_STATE_CONNECTED = 1;
    // auto-reconnect in process
    public static CONNECTION_STATE_PENDING = 2;
    public static DISCONNECT_PROBE_INTERVAL = 5000;
    public static RETRY_CONNECTION_INTERVAL = 2000;

    // Error codes
    public static ERROR_ALREADY_CONNECTED = 11;
    public static ERROR_NOT_CONNECTED = 12;
    public static ERROR_CONNECT_FAILED = 13;
    // keep in sync with Device.ERROR_INVALID_FUNCTION_ID
    public static ERROR_INVALID_FUNCTION_ID = 21;
    public static ERROR_TIMEOUT = 31;
    public static ERROR_INVALID_PARAMETER = 41;
    public static ERROR_FUNCTION_NOT_SUPPORTED = 42;
    public static ERROR_UNKNOWN_ERROR = 43;
    public static ERROR_STREAM_OUT_OF_SYNC = 51;
    public static ERROR_NON_ASCII_CHAR_IN_SECRET = 71;
    // keep in sync with Device.ERROR_WRONG_DEVICE_TYPE
    public static ERROR_WRONG_DEVICE_TYPE = 81;
    // keep in sync with Device.ERROR_DEVICE_REPLACED
    public static ERROR_DEVICE_REPLACED = 82;
    public static ERROR_WRONG_RESPONSE_LENGTH = 83;
    public static ERROR_INT64_NOT_SUPPORTED = 91;

    public static TASK_KIND_CONNECT = 0;
    public static TASK_KIND_DISCONNECT = 1;
    public static TASK_KIND_AUTO_RECONNECT = 2;
    public static TASK_KIND_AUTHENTICATE = 3;

    /*
     * Creates an IP Connection object that can be used to enumerate the available
     * devices. It is also required for the constructor of Bricks and Bricklets.
     */
    public brickd: BrickDaemon;
    public host?: string;
    public port?: number;
    public timeout: number = 2500;
    public autoReconnect: boolean = true;
    public nextSequenceNumber: number = 0;
    public nextAuthenticationNonce: number = 0;
    public devices: Device[] = [];
    public registeredCallbacks: (TFAnyFunction|CallbackConnected|CallbackEnumerate|CallbackDisconnected)[] = [];
    public socket?: TFSocket;

    public isConnected: boolean = false;
    public disconnectProbeIID?: any;
    public mergeBuffer: Buffer = Utils.buffer_wrapper(0);
    public connectErrorCallback?: TFErrorCallback;
    public taskQueue: TaskQueue[] = [];

    /**
     * constructor
     */
    public constructor() {
        this.brickd = new BrickDaemon('2', this);
    }

    /**
     * addDevice
     * @param device
     */
    public addDevice(device: Device): void {
        const replacedDevice = this.devices[device.uid];

        if (replacedDevice !== undefined) {
            replacedDevice.replaced = true;
        }

        this.devices[device.uid] = device;
    }

    /**
     * disconnectProbe
     */
    public disconnectProbe(): void {
        if (this.socket !== undefined) {
            try {
                const buffer = this.createPacketHeader(undefined, 8, IPConnection.FUNCTION_DISCONNECT_PROBE);

                if (buffer) {
                    this.socket.write(buffer, false);
                }
            } catch (e) {
                // Initiating a normal disconnect will ensure autoreconnect decision and connection management
                this.disconnect(undefined);
            }
        }
    }

    /**
     * pushTask
     * @param handler
     * @param kind
     */
    public pushTask(handler: TFAnyFunction, kind: number): void {
        this.taskQueue.push({
            handler: handler,
            kind: kind
        });

        if (this.taskQueue.length === 1) {
            this.executeTask();
        }
    }

    /**
     * executeTask
     */
    public executeTask(): void {
        const task = this.taskQueue[0];

        if (task !== undefined) {
            task.handler();
        }
    }

    /**
     * popTask
     */
    public popTask(): void {
        this.taskQueue.splice(0, 1);
        this.executeTask();
    }

    /**
     * removeNextTask
     */
    public removeNextTask(): void {
        this.taskQueue.splice(1, 1);
    }

    /**
     * getCurrentTaskKind
     */
    public getCurrentTaskKind(): any|undefined {
        const task = this.taskQueue[0];

        if (task !== undefined) {
            return task.kind;
        }

        return undefined;
    }

    /**
     * getNextTaskKind
     */
    public getNextTaskKind(): any|undefined {
        const task = this.taskQueue[1];

        if (task !== undefined) {
            return task.kind;
        }

        return undefined;
    }

    /**
     * disconnect
     * @param errorCallback
     */
    public disconnect(errorCallback?: TFErrorCallback): void {
        this.pushTask(this.disconnectInternal.bind(this, errorCallback), IPConnection.TASK_KIND_DISCONNECT);
    }

    /**
     * disconnectInternal
     * @param errorCallback
     */
    public disconnectInternal(errorCallback?: TFErrorCallback): void {
        let autoReconnectAborted = false;

        if (this.getNextTaskKind() === IPConnection.TASK_KIND_AUTO_RECONNECT) {
            // Remove auto-reconnect task, to break recursion
            this.removeNextTask();
            autoReconnectAborted = true;
        }

        if (!this.isConnected) {
            if (!autoReconnectAborted && errorCallback) {

                /*
                 * Not using `this.` for the error callback function because
                 * we want to call what user provided not the saved one
                 */
                errorCallback(IPConnection.ERROR_NOT_CONNECTED);
            }

            this.popTask();
            return;
        }

        if (this.socket) {
            this.socket.end();
            this.socket.destroy();
        }

        // no popTask() here, will be done in handleConnectionClose()
    }

    /**
     * connect
     * @param host
     * @param port
     * @param errorCallback
     */
    public connect(host: string, port: number, errorCallback?: TFErrorCallback): void {
        this.pushTask(this.connectInternal.bind(this, host, port, errorCallback), IPConnection.TASK_KIND_CONNECT);
    }

    /**
     * connectInternal
     * @param host
     * @param port
     * @param errorCallback
     */
    public connectInternal(host: string, port: number, errorCallback?: TFErrorCallback): void {
        if (this.isConnected) {
            if (errorCallback) {

                /*
                 * Not using `this.` for the error callback function because
                 * we want to call what user provided not the saved one
                 */
                errorCallback(IPConnection.ERROR_ALREADY_CONNECTED);
            }

            this.popTask();
            return;
        }

        // Saving the user provided error callback function for future use
        this.connectErrorCallback = errorCallback;

        clearInterval(this.disconnectProbeIID);
        this.disconnectProbeIID = undefined;

        this.host = host;
        this.port = port;

        this.socket = new TFSocket(this.port!, this.host!, this);
        this.socket.setNoDelay(true);
        this.socket.on('connect', this.handleConnect.bind(this));
        this.socket.on('data', this.handleIncomingData.bind(this));
        this.socket.on('error', this.handleConnectionError.bind(this));
        this.socket.on('close', this.handleConnectionClose.bind(this));
        this.socket.connect();
    }

    /**
     * handleConnect
     */
    public handleConnect(): void {
        let connectReason = IPConnection.CONNECT_REASON_REQUEST;

        if (this.getCurrentTaskKind() === IPConnection.TASK_KIND_AUTO_RECONNECT) {
            connectReason = IPConnection.CONNECT_REASON_AUTO_RECONNECT;
        }

        clearInterval(this.disconnectProbeIID);
        this.disconnectProbeIID = undefined;
        this.isConnected = true;

        // Check and call functions if registered for callback connected
        if (this.registeredCallbacks[IPConnection.CALLBACK_CONNECTED] !== undefined) {
            const connectReasonCb = this.registeredCallbacks[IPConnection.CALLBACK_CONNECTED] as CallbackConnected;

            connectReasonCb(connectReason);
        }

        this.disconnectProbeIID = setInterval(this.disconnectProbe.bind(this),
            IPConnection.DISCONNECT_PROBE_INTERVAL);

        this.popTask();
    }

    /**
     * handleIncomingData
     * @param data
     */
    public handleIncomingData(data: Buffer): void {
        this.resetDisconnectProbe();

        if (data.length === 0) {
            return;
        }

        this.mergeBuffer = Utils.bufferConcat([this.mergeBuffer, data]);

        while (this.mergeBuffer.length > 0) {
            if (this.mergeBuffer.length < 8) {
                // wait for complete header
                return;
            }

            const length = this.mergeBuffer.readUInt8(4);

            if (this.mergeBuffer.length < length) {
                // wait for complete packet
                return;
            }

            const newPacket = Utils.buffer_wrapper(length);

            this.mergeBuffer.copy(newPacket, 0, 0, length);
            this.handlePacket(newPacket);
            this.mergeBuffer = this.mergeBuffer.slice(length);
        }
    }

    /**
     * handleConnectionError
     * @param error
     */
    public handleConnectionError(error: Error): void {
        // @ts-ignore
        if (error.errno !== undefined && error.errno === 'ECONNRESET') {
            // Check and call functions if registered for callback disconnected
            if (this.registeredCallbacks[IPConnection.CALLBACK_DISCONNECTED] !== undefined) {
                const disconnectCb = this.registeredCallbacks[IPConnection.CALLBACK_DISCONNECTED] as CallbackDisconnected;

                disconnectCb(IPConnection.DISCONNECT_REASON_SHUTDOWN);
            }
        }
    }

    /**
     * handleAutoReconnectError
     * @param error
     */
    public handleAutoReconnectError(error: number): void {
        if (!this.isConnected && this.autoReconnect && error !== IPConnection.ERROR_ALREADY_CONNECTED) {
            // FIXME: add a small sleep here to avoid a tight loop that could consume 100% CPU power
            this.pushTask(
                this.connectInternal.bind(
                    this,
                    this.host!,
                    this.port!,
                    this.handleAutoReconnectError
                ),
                IPConnection.TASK_KIND_AUTO_RECONNECT
            );
        }
    }

    /**
     * handleConnectionClose
     */
    public handleConnectionClose(): void {
        if (this.getCurrentTaskKind() === IPConnection.TASK_KIND_DISCONNECT) {
            // This disconnect was requested
            for (const device of this.devices) {
                for (const item of device.expectedResponses) {
                    clearTimeout(item.timeout);

                    if (item.errorCB !== undefined) {
                        item.errorCB(IPConnection.ERROR_TIMEOUT);
                    }
                }

                device.expectedResponses = [];
            }

            this.isConnected = false;
            clearInterval(this.disconnectProbeIID);
            this.disconnectProbeIID = undefined;

            if (this.socket !== undefined) {
                this.socket.end();
                this.socket.destroy();
                this.socket = undefined;
            }

            // Check and call functions if registered for callback disconnected
            if (this.registeredCallbacks[IPConnection.CALLBACK_DISCONNECTED] !== undefined) {
                const disconnectCb = this.registeredCallbacks[IPConnection.CALLBACK_DISCONNECTED] as CallbackDisconnected;

                disconnectCb(IPConnection.DISCONNECT_REASON_REQUEST);
            }

            this.popTask();
            return;
        }
        // Was connected, disconnected because of error and auto reconnect is enabled
        if (this.isConnected) {
            this.isConnected = false;
            clearInterval(this.disconnectProbeIID);
            this.disconnectProbeIID = undefined;

            if (this.socket !== undefined) {
                this.socket.end();
                this.socket.destroy();
                this.socket = undefined;
            }

            // Check and call functions if registered for callback disconnected
            if (this.registeredCallbacks[IPConnection.CALLBACK_DISCONNECTED] !== undefined) {
                const disconnectCb = this.registeredCallbacks[IPConnection.CALLBACK_DISCONNECTED] as CallbackDisconnected;

                disconnectCb(IPConnection.DISCONNECT_REASON_ERROR);
            }

            if (this.autoReconnect) {
                this.pushTask(
                    this.connectInternal.bind(
                        this,
                        this.host!,
                        this.port!,
                        this.handleAutoReconnectError
                    ),
                    IPConnection.TASK_KIND_AUTO_RECONNECT
                );
            }

            return;
        }

        // Were not connected. failed at new connection attempt
        if (this.getCurrentTaskKind() === IPConnection.TASK_KIND_CONNECT || this.getCurrentTaskKind() === IPConnection.TASK_KIND_AUTO_RECONNECT) {
            if (this.connectErrorCallback !== undefined) {
                this.connectErrorCallback(IPConnection.ERROR_CONNECT_FAILED);
            }

            this.popTask();

        }
    }

    /**
     * resetDisconnectProbe
     */
    public resetDisconnectProbe(): void {
        if (this.disconnectProbeIID === undefined) {
            return;
        }

        clearInterval(this.disconnectProbeIID);
        this.disconnectProbeIID = undefined;
        this.disconnectProbeIID = setInterval(
            this.disconnectProbe.bind(this),
            IPConnection.DISCONNECT_PROBE_INTERVAL
        );
    }

    /**
     * getUIDFromPacket
     * @param packetUID
     */
    public getUIDFromPacket(packetUID: Buffer): number {
        return packetUID.readUInt32LE(0);
    }

    /**
     * getLengthFromPacket
     * @param packetLen
     */
    public getLengthFromPacket(packetLen: Buffer): number {
        return packetLen.readUInt8(4);
    }

    /**
     * getFunctionIDFromPacket
     * @param packetFID
     */
    public getFunctionIDFromPacket(packetFID: Buffer): number {
        return packetFID.readUInt8(5);
    }

    /**
     * getSequenceNumberFromPacket
     * @param packetSeq
     */
    public getSequenceNumberFromPacket(packetSeq: Buffer): number {
        // eslint-disable-next-line no-bitwise
        return (packetSeq.readUInt8(6) >>> 4) & 0x0F;
    }

    /**
     * getRFromPacket
     * @param packetR
     */
    public getRFromPacket(packetR: Buffer): number {
        // eslint-disable-next-line no-bitwise
        return (packetR.readUInt8(6) >>> 3) & 0x01;
    }

    /**
     * getEFromPacket
     * @param packetE
     */
    public getEFromPacket(packetE: Buffer): number {
        // Getting Error bits(E, 2bits)
        // eslint-disable-next-line no-bitwise
        return (packetE.readUInt8(7) >>> 6) & 0x03;
    }

    /**
     * getPayloadFromPacket
     * @param packetPayload
     */
    public getPayloadFromPacket(packetPayload: Buffer): any {
        const payloadReturn = Utils.buffer_wrapper(packetPayload.length - 8);

        packetPayload.copy(payloadReturn, 0, 8, packetPayload.length);

        return Utils.buffer_wrapper(payloadReturn);
    }

    /**
     * mapsToFalse
     * @param value
     */
    public mapsToFalse(value: any): boolean {
        return value === 0 || value === false || value === undefined || value === null || isNaN(value);
    }

    /**
     * pack
     * @param data
     * @param format
     */
    public pack(data: any[], format: string): Buffer {
        let tmpPackedBuffer;
        const formatArray = format.split(' ');

        if (formatArray.length <= 0) {
            return Utils.buffer_wrapper(0);
        }

        let packedBuffer = Utils.buffer_wrapper(0);

        for (let i = 0; i < formatArray.length; i++) {
            if (formatArray[i].split('').length === 1) {
                if (formatArray[i] === 's') {
                    tmpPackedBuffer = Utils.buffer_wrapper(1);
                    tmpPackedBuffer.writeUInt8(data[i].charCodeAt(0), 0);
                    packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                    continue;
                }

                switch (formatArray[i]) {
                    case 'c':
                        tmpPackedBuffer = Utils.buffer_wrapper(1);
                        tmpPackedBuffer.writeUInt8(data[i].charCodeAt(0), 0);
                        packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                        continue;
                    case 'b':
                        tmpPackedBuffer = Utils.buffer_wrapper(1);
                        tmpPackedBuffer.writeInt8(data[i], 0);
                        packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                        continue;
                    case 'B':
                        tmpPackedBuffer = Utils.buffer_wrapper(1);
                        tmpPackedBuffer.writeUInt8(data[i], 0);
                        packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                        continue;
                    case 'h':
                        tmpPackedBuffer = Utils.buffer_wrapper(2);
                        tmpPackedBuffer.writeInt16LE(data[i], 0);
                        packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                        continue;
                    case 'H':
                        tmpPackedBuffer = Utils.buffer_wrapper(2);
                        tmpPackedBuffer.writeUInt16LE(data[i], 0);
                        packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                        continue;
                    case 'i':
                        tmpPackedBuffer = Utils.buffer_wrapper(4);
                        tmpPackedBuffer.writeInt32LE(data[i], 0);
                        packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                        continue;
                    case 'I':
                        tmpPackedBuffer = Utils.buffer_wrapper(4);
                        tmpPackedBuffer.writeUInt32LE(data[i], 0);
                        packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                        continue;
                    case 'q':
                        tmpPackedBuffer = Utils.buffer_wrapper(8);
                        tmpPackedBuffer.writeBigInt64LE(data[i], 0);
                        packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                        continue;
                    case 'Q':
                        tmpPackedBuffer = Utils.buffer_wrapper(8);
                        tmpPackedBuffer.writeBigUInt64LE(data[i], 0);
                        packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                        continue;
                    case 'f':
                        tmpPackedBuffer = Utils.buffer_wrapper(4);
                        tmpPackedBuffer.writeFloatLE(data[i], 0);
                        packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                        continue;
                    case 'd':
                        tmpPackedBuffer = Utils.buffer_wrapper(8);
                        tmpPackedBuffer.writeDoubleLE(data[i], 0);
                        packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                        continue;
                    case '?':
                        tmpPackedBuffer = Utils.buffer_wrapper(1);

                        if (this.mapsToFalse(data[i])) {
                            tmpPackedBuffer.writeUInt8(0x00, 0);
                        } else {
                            tmpPackedBuffer.writeUInt8(0x01, 0);
                        }

                        packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                        continue;
                }
            }

            if (formatArray[i].split('').length > 1) {
                const singleFormatArray = formatArray[i].split('');

                // Boolean type with cardinality greater than 1
                if (singleFormatArray[0] === '?') {
                    let buffer_value = 0;
                    const count = parseInt(singleFormatArray.slice(1, singleFormatArray.length).join(''), 10);
                    const count_bits = Math.ceil(count / 8);
                    tmpPackedBuffer = Utils.buffer_wrapper(count_bits);

                    for (let _i = 0; _i < count; _i++) {
                        if (this.mapsToFalse(data[i][_i])) {
                            continue;
                        } else {
                            buffer_value = tmpPackedBuffer.readUInt8(Math.floor(_i / 8));
                            // eslint-disable-next-line no-bitwise
                            buffer_value |= 1 << (_i % 8);
                            tmpPackedBuffer.writeUInt8(buffer_value, Math.floor(_i / 8));
                        }
                    }

                    packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                    continue;
                }

                // @ts-ignore
                for (let j = 0; j < parseInt(formatArray[i].match(/\d/gu).join(''), 10); j++) {
                    if (singleFormatArray[0] === 's') {
                        if (isNaN(data[i].charCodeAt(j))) {
                            tmpPackedBuffer = Utils.buffer_wrapper(1);
                            tmpPackedBuffer.writeUInt8(0x00, 0);
                            packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                        } else {
                            tmpPackedBuffer = Utils.buffer_wrapper(1);
                            tmpPackedBuffer.writeUInt8(data[i].charCodeAt(j), 0);
                            packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                        }

                        continue;
                    }

                    switch (singleFormatArray[0]) {
                        case 'c':
                            tmpPackedBuffer = Utils.buffer_wrapper(1);
                            tmpPackedBuffer.writeUInt8(data[i][j].charCodeAt(0), 0);
                            packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                            continue;
                        case 'b':
                            tmpPackedBuffer = Utils.buffer_wrapper(1);
                            tmpPackedBuffer.writeInt8(data[i][j], 0);
                            packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                            continue;
                        case 'B':
                            tmpPackedBuffer = Utils.buffer_wrapper(1);
                            tmpPackedBuffer.writeUInt8(data[i][j], 0);
                            packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                            continue;
                        case 'h':
                            tmpPackedBuffer = Utils.buffer_wrapper(2);
                            tmpPackedBuffer.writeInt16LE(data[i][j], 0);
                            packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                            continue;
                        case 'H':
                            tmpPackedBuffer = Utils.buffer_wrapper(2);
                            tmpPackedBuffer.writeUInt16LE(data[i][j], 0);
                            packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                            continue;
                        case 'i':
                            tmpPackedBuffer = Utils.buffer_wrapper(4);
                            tmpPackedBuffer.writeInt32LE(data[i][j], 0);
                            packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                            continue;
                        case 'I':
                            tmpPackedBuffer = Utils.buffer_wrapper(4);
                            tmpPackedBuffer.writeUInt32LE(data[i][j], 0);
                            packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                            continue;
                        case 'q':
                            tmpPackedBuffer = Utils.buffer_wrapper(8);
                            tmpPackedBuffer.writeBigInt64LE(data[i][j], 0);
                            packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                            continue;
                        case 'Q':
                            tmpPackedBuffer = Utils.buffer_wrapper(8);
                            tmpPackedBuffer.writeBigUInt64LE(data[i][j], 0);
                            packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                            continue;
                        case 'f':
                            tmpPackedBuffer = Utils.buffer_wrapper(4);
                            tmpPackedBuffer.writeFloatLE(data[i][j], 0);
                            packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                            continue;
                        case 'd':
                            tmpPackedBuffer = Utils.buffer_wrapper(8);
                            tmpPackedBuffer.writeDoubleLE(data[i][j], 0);
                            packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                            continue;
                        case '?':
                            tmpPackedBuffer = Utils.buffer_wrapper(1);

                            if (this.mapsToFalse(data[i][j])) {
                                tmpPackedBuffer.writeUInt8(0x00, 0);
                            } else {
                                tmpPackedBuffer.writeUInt8(0x01, 0);
                            }

                            packedBuffer = Utils.bufferConcat([packedBuffer, tmpPackedBuffer]);
                            continue;
                    }
                }
            }
        }

        return packedBuffer;
    }

    /**
     * unpack
     * @param unpackPayload
     * @param format
     */
    public unpack(unpackPayload: Buffer, format: string): any[] {
        let j;
        const formatArray = format.split(' ');
        const returnArguments: any[] = [];
        let returnSubArray = [];
        let constructedString = '';
        let payloadReadOffset = 0;

        if (formatArray.length <= 0) {
            return returnArguments;
        }

        for (const item of formatArray) {
            if (item.split('').length === 1) {
                if (item === 's') {
                    constructedString += String.fromCharCode(unpackPayload.readUInt8(payloadReadOffset));
                    payloadReadOffset++;
                    returnArguments.push(constructedString);
                    constructedString = '';
                    continue;
                }

                switch (item) {
                    case 'c':
                        returnArguments.push(String.fromCharCode(unpackPayload.readUInt8(payloadReadOffset)));
                        payloadReadOffset += 1;
                        continue;
                    case 'b':
                        returnArguments.push(unpackPayload.readInt8(payloadReadOffset));
                        payloadReadOffset += 1;
                        continue;
                    case 'B':
                        returnArguments.push(unpackPayload.readUInt8(payloadReadOffset));
                        payloadReadOffset += 1;
                        continue;
                    case 'h':
                        returnArguments.push(unpackPayload.readInt16LE(payloadReadOffset));
                        payloadReadOffset += 2;
                        continue;
                    case 'H':
                        returnArguments.push(unpackPayload.readUInt16LE(payloadReadOffset));
                        payloadReadOffset += 2;
                        continue;
                    case 'i':
                        returnArguments.push(unpackPayload.readInt32LE(payloadReadOffset));
                        payloadReadOffset += 4;
                        continue;
                    case 'I':
                        returnArguments.push(unpackPayload.readUInt32LE(payloadReadOffset));
                        payloadReadOffset += 4;
                        continue;
                    case 'q':
                        returnArguments.push(unpackPayload.readBigInt64LE(payloadReadOffset));
                        payloadReadOffset += 8;
                        continue;
                    case 'Q':
                        returnArguments.push(unpackPayload.readBigUInt64LE(payloadReadOffset));
                        payloadReadOffset += 8;
                        continue;
                    case 'f':
                        returnArguments.push(unpackPayload.readFloatLE(payloadReadOffset));
                        payloadReadOffset += 4;
                        continue;
                    case 'd':
                        returnArguments.push(unpackPayload.readDoubleLE(payloadReadOffset));
                        payloadReadOffset += 8;
                        continue;
                    case '?':
                        returnArguments.push(unpackPayload.readUInt8(payloadReadOffset) !== 0);
                        payloadReadOffset += 1;
                        continue;
                }
            }

            if (item.split('').length > 1) {
                const singleFormatArray = item.split('');

                // Boolean type with cardinality greater than 1
                if (singleFormatArray[0] === '?') {
                    // @ts-ignore
                    const count = parseInt(item.match(/\d/gu).join(''), 10);
                    const payloadBoolArray = new Array(count);
                    const extractedBoolArray = new Array(count);

                    payloadBoolArray.fill(0x00);
                    extractedBoolArray.fill(false);

                    for (j = 0; j < Math.ceil(count / 8); j++) {
                        payloadBoolArray[j] = unpackPayload.readUInt8(payloadReadOffset);
                        payloadReadOffset++;
                    }

                    for (j = 0; j < count; j++) {
                        // eslint-disable-next-line no-bitwise
                        extractedBoolArray[j] = (payloadBoolArray[Math.floor(j / 8)] & (1 << (j % 8))) !== 0;
                    }

                    returnArguments.push(extractedBoolArray);

                    continue;
                }

                if (singleFormatArray[0] === 's') {
                    constructedString = '';
                    let skip = false;

                    // @ts-ignore
                    for (j = 0; j < parseInt(item.match(/\d/gu).join(''), 10); j++) {
                        const c = String.fromCharCode(unpackPayload.readUInt8(payloadReadOffset));

                        if (c === '\0' || skip) {
                            skip = true;
                        } else {
                            constructedString += c;
                        }

                        payloadReadOffset++;
                    }

                    skip = false;
                    returnArguments.push(constructedString);
                    constructedString = '';
                    continue;
                }

                returnSubArray = [];

                // @ts-ignore
                for (let k = 0; k < parseInt(item.match(/\d/gu).join(''), 10); k++) {
                    switch (singleFormatArray[0]) {
                        case 'c':
                            returnSubArray.push(String.fromCharCode(unpackPayload.readUInt8(payloadReadOffset)));
                            payloadReadOffset += 1;
                            continue;
                        case 'b':
                            returnSubArray.push(unpackPayload.readInt8(payloadReadOffset));
                            payloadReadOffset += 1;
                            continue;
                        case 'B':
                            returnSubArray.push(unpackPayload.readUInt8(payloadReadOffset));
                            payloadReadOffset += 1;
                            continue;
                        case 'h':
                            returnSubArray.push(unpackPayload.readInt16LE(payloadReadOffset));
                            payloadReadOffset += 2;
                            continue;
                        case 'H':
                            returnSubArray.push(unpackPayload.readUInt16LE(payloadReadOffset));
                            payloadReadOffset += 2;
                            continue;
                        case 'i':
                            returnSubArray.push(unpackPayload.readInt32LE(payloadReadOffset));
                            payloadReadOffset += 4;
                            continue;
                        case 'I':
                            returnSubArray.push(unpackPayload.readUInt32LE(payloadReadOffset));
                            payloadReadOffset += 4;
                            continue;
                        case 'q':
                            returnSubArray.push(unpackPayload.readBigInt64LE(payloadReadOffset));
                            payloadReadOffset += 8;
                            continue;
                        case 'Q':
                            returnSubArray.push(unpackPayload.readBigUInt64LE(payloadReadOffset));
                            payloadReadOffset += 8;
                            continue;
                        case 'f':
                            returnSubArray.push(unpackPayload.readFloatLE(payloadReadOffset));
                            payloadReadOffset += 4;
                            continue;
                        case 'd':
                            returnSubArray.push(unpackPayload.readDoubleLE(payloadReadOffset));
                            payloadReadOffset += 8;
                            continue;
                        case '?':
                            returnSubArray.push(unpackPayload.readUInt8(payloadReadOffset) !== 0);
                            payloadReadOffset += 1;
                            continue;
                    }
                }

                if (returnSubArray.length !== 0) {
                    returnArguments.push(returnSubArray);
                    returnSubArray = [];
                    continue;
                }
            }
        }

        return returnArguments;
    }

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
    public sendRequest(
        sendRequestDevice: Device,
        sendRequestFID: number,
        sendRequestData: any[],
        sendRequestPackFormat: string,
        sendRequestExpectedResponseLength: number,
        sendRequestUnpackFormat: string,
        sendRequestReturnCB?: TFAnyFunction,
        sendRequestErrorCB?: TFErrorCallback,
        startStreamResponseTimer?: boolean,
        checkValidity?: boolean
    ): void {
        if (this.getConnectionState() !== IPConnection.CONNECTION_STATE_CONNECTED) {
            if (sendRequestErrorCB) {
                sendRequestErrorCB(IPConnection.ERROR_NOT_CONNECTED);
            }

            return;
        }

        // Support for 64 bit integers exists only in node 10.2 or higher
        if ((typeof BigInt === 'undefined')
            && ((sendRequestPackFormat.indexOf('q') > -1)
                || (sendRequestPackFormat.indexOf('Q') > -1)
                || (sendRequestUnpackFormat.indexOf('q') > -1)
                || (sendRequestUnpackFormat.indexOf('Q') > -1))) {
            if (sendRequestErrorCB) {
                sendRequestErrorCB(IPConnection.ERROR_INT64_NOT_SUPPORTED);
            }

            return;
        }

        if (checkValidity) {
            sendRequestDevice.checkValidity(() => {
                this.sendRequestInternal(sendRequestDevice,
                    sendRequestFID,
                    sendRequestData,
                    sendRequestPackFormat,
                    sendRequestExpectedResponseLength,
                    sendRequestUnpackFormat,
                    sendRequestReturnCB,
                    sendRequestErrorCB,
                    startStreamResponseTimer);
            },
            sendRequestErrorCB);
        } else {
            this.sendRequestInternal(
                sendRequestDevice,
                sendRequestFID,
                sendRequestData,
                sendRequestPackFormat,
                sendRequestExpectedResponseLength,
                sendRequestUnpackFormat,
                sendRequestReturnCB,
                sendRequestErrorCB,
                startStreamResponseTimer
            );
        }
    }

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
    public sendRequestInternal(
        sendRequestDevice: Device,
        sendRequestFID: number,
        sendRequestData: any[],
        sendRequestPackFormat: string,
        sendRequestExpectedResponseLength: number,
        sendRequestUnpackFormat: string,
        sendRequestReturnCB?: TFAnyFunction,
        sendRequestErrorCB?: TFErrorCallback,
        startStreamResponseTimer?: boolean
    ): void {
        // Packet creation
        const sendRequestPayload = this.pack(sendRequestData, sendRequestPackFormat);
        const sendRequestHeader = this.createPacketHeader(
            sendRequestDevice,
            8 + sendRequestPayload.length,
            sendRequestFID,
            sendRequestErrorCB
        );

        if (sendRequestHeader === undefined) {
            return;
        }

        const sendRequestPacket = Utils.bufferConcat([
            sendRequestHeader!,
            sendRequestPayload
        ]);

        const sendRequestSEQ = this.getSequenceNumberFromPacket(sendRequestHeader!);
        const responseExpected = sendRequestDevice.getResponseExpected(sendRequestFID);

        // Sending the created packet
        if (responseExpected) {
            // Setting the requesting current device's current request
            const sendRequestDeviceOID = sendRequestDevice.getDeviceOID();

            if (startStreamResponseTimer) {
                // Setup streaming timer
                // eslint-disable-next-line no-lonely-if
                if (sendRequestFID in sendRequestDevice.streamStateObjects) {
                    if (sendRequestDevice.streamStateObjects[sendRequestFID].responseProperties.timeout !== null) {
                        clearTimeout(sendRequestDevice.streamStateObjects[sendRequestFID].responseProperties.timeout);
                        sendRequestDevice.streamStateObjects[sendRequestFID].responseProperties.timeout = null;
                    }

                    sendRequestDevice.streamStateObjects[sendRequestFID].responseProperties.timeout =
                        setTimeout(this.sendRequestTimeoutStreamOut.bind(
                            this,
                            sendRequestDevice,
                            sendRequestFID,
                            sendRequestErrorCB
                        ),
                        this.timeout);
                }
            } else {
                sendRequestDevice.expectedResponses.push({
                    DeviceOID: sendRequestDeviceOID,
                    FID: sendRequestFID,
                    SEQ: sendRequestSEQ,
                    unpackFormat: sendRequestUnpackFormat,
                    expectedResponseLength: sendRequestExpectedResponseLength,
                    timeout: setTimeout(
                        this.sendRequestTimeout.bind(
                            this,
                            sendRequestDevice,
                            sendRequestDeviceOID,
                            sendRequestErrorCB
                        ),
                        this.timeout
                    ),
                    returnCB: sendRequestReturnCB,
                    errorCB: sendRequestErrorCB
                });
            }
        }

        if (this.socket) {
            this.socket.write(sendRequestPacket, true);
        }

        if (!responseExpected && sendRequestReturnCB) {
            sendRequestReturnCB();
        }
    }

    /**
     * sendRequestTimeout
     * @param timeoutDevice
     * @param timeoutDeviceOID
     * @param timeoutErrorCB
     */
    public sendRequestTimeout(timeoutDevice: Device, timeoutDeviceOID: number, timeoutErrorCB?: TFErrorCallback): void {
        for (let i = 0; i < timeoutDevice.expectedResponses.length; ++i) {
            if (timeoutDevice.expectedResponses[i].DeviceOID === timeoutDeviceOID) {
                clearTimeout(timeoutDevice.expectedResponses[i].timeout);
                timeoutDevice.expectedResponses.splice(i, 1);

                if (timeoutErrorCB) {
                    timeoutErrorCB(IPConnection.ERROR_TIMEOUT);
                }

                return;
            }
        }
    }

    /**
     * sendRequestTimeoutStreamOut
     * @param timeoutDevice
     * @param timeoutFID
     * @param _timeoutErrorCB
     */
    public sendRequestTimeoutStreamOut(
        timeoutDevice: Device,
        timeoutFID: number,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _timeoutErrorCB?: TFErrorCallback
    ): void {
        let streamOutObject = null;

        if (!(timeoutFID in timeoutDevice.streamStateObjects)) {
            return;
        }

        streamOutObject = timeoutDevice.streamStateObjects[timeoutFID];

        if (streamOutObject === null) {
            return;
        }

        // Clear timer
        clearTimeout(streamOutObject.responseProperties.timeout);

        // Call error callback (if any)
        if (streamOutObject.responseProperties.errorCB !== undefined) {
            streamOutObject.responseProperties.errorCB(IPConnection.ERROR_TIMEOUT);
        }

        // Reset stream state object
        timeoutDevice.resetStreamStateObject(streamOutObject);

        // Call next function from call queue (if any)
        if (streamOutObject.responseProperties.callQueue.length > 0) {
            const callQueueC = streamOutObject.responseProperties.callQueue.shift();

            if (callQueueC) {
                callQueueC(timeoutDevice);
            }
        }
    }

    /**
     * handleResponse
     * @param packetResponse
     */
    public handleResponse(packetResponse: Buffer): void {
        let streamStateObject = null;
        let handleResponseDevice = null;
        const handleResponseFID = this.getFunctionIDFromPacket(packetResponse);
        const handleResponseSEQ = this.getSequenceNumberFromPacket(packetResponse);

        handleResponseDevice = this.devices[this.getUIDFromPacket(packetResponse)];

        if (handleResponseDevice === undefined) {
            return;
        }

        // Handle non-streamed response
        if (handleResponseFID in handleResponseDevice.streamStateObjects) {
            streamStateObject = handleResponseDevice.streamStateObjects[handleResponseFID];

            if (streamStateObject === null) {
                return;
            }

            if (!streamStateObject.responseProperties.running) {
                handleResponseDevice.resetStreamStateObject(streamStateObject);
                return;
            }

            if (streamStateObject.responseProperties.responseHandler === null) {
                handleResponseDevice.resetStreamStateObject(streamStateObject);
                return;
            }

            streamStateObject.responseProperties.responseHandler(handleResponseDevice,
                handleResponseFID,
                packetResponse);
        } else {
            // Handle streamed response

            for (let i = 0; i < handleResponseDevice.expectedResponses.length; i++) {
                const expectedResponse = handleResponseDevice.expectedResponses[i];

                if (expectedResponse.FID === handleResponseFID &&
                    expectedResponse.SEQ === handleResponseSEQ) {
                    clearTimeout(expectedResponse.timeout);

                    if (this.getEFromPacket(packetResponse) === 1) {
                        if (expectedResponse.errorCB !== undefined) {
                            expectedResponse.errorCB(IPConnection.ERROR_INVALID_PARAMETER);
                        }

                        handleResponseDevice.expectedResponses.splice(i, 1);
                        return;
                    }

                    if (this.getEFromPacket(packetResponse) === 2) {
                        if (expectedResponse.errorCB !== undefined) {
                            expectedResponse.errorCB(IPConnection.ERROR_FUNCTION_NOT_SUPPORTED);
                        }

                        handleResponseDevice.expectedResponses.splice(i, 1);
                        return;
                    }

                    if (this.getEFromPacket(packetResponse) !== 0) {
                        if (expectedResponse.errorCB !== undefined) {
                            expectedResponse.errorCB(IPConnection.ERROR_UNKNOWN_ERROR);
                        }

                        handleResponseDevice.expectedResponses.splice(i, 1);
                        return;
                    }

                    if (expectedResponse.expectedResponseLength === 0) {
                        // setter with response-expected enabled
                        expectedResponse.expectedResponseLength = 8;
                    }

                    if (packetResponse.length !== expectedResponse.expectedResponseLength) {
                        if (expectedResponse.errorCB !== undefined) {
                            expectedResponse.errorCB(IPConnection.ERROR_WRONG_RESPONSE_LENGTH);
                        }

                        handleResponseDevice.expectedResponses.splice(i, 1);
                        return;
                    }

                    if (expectedResponse.returnCB !== undefined) {
                        const retArgs = this.unpack(
                            this.getPayloadFromPacket(packetResponse),
                            expectedResponse.unpackFormat
                        );

                        expectedResponse.returnCB.apply(this, retArgs);
                    }

                    handleResponseDevice.expectedResponses.splice(i, 1);
                    return;
                }
            }
        }
    }

    /**
     * handleCallback
     * @param packetCallback
     */
    public handleCallback(packetCallback: Buffer): void {
        let i;
        let registeredCallback;
        const functionID = this.getFunctionIDFromPacket(packetCallback);

        if (functionID === IPConnection.CALLBACK_ENUMERATE) {
            registeredCallback = this.registeredCallbacks[IPConnection.CALLBACK_ENUMERATE];

            if (registeredCallback !== undefined) {
                if (packetCallback.length !== 34) {
                    // silently ignoring callback with wrong length
                    return;
                }

                const args = this.unpack(this.getPayloadFromPacket(packetCallback), 's8 s8 c B3 B3 H B');
                registeredCallback.apply(this, args);
            }

            return;
        }

        const device = this.devices[this.getUIDFromPacket(packetCallback)];

        if (device === undefined) {
            return;
        }

        if ((device.registeredCallbacks[functionID] === undefined &&
                device.registeredCallbacks[-functionID] === undefined) ||
            device.callbackFormats[functionID] === undefined) {
            return;
        }

        let cbFunction;
        let cbUnpack;

        if (device.registeredCallbacks[functionID] !== undefined) {
            cbFunction = device.registeredCallbacks[functionID];
            cbUnpack = device.callbackFormats[functionID];
        } else if (device.registeredCallbacks[-functionID] !== undefined) {
            cbFunction = device.registeredCallbacks[-functionID];
            cbUnpack = device.callbackFormats[functionID];
        }

        if (cbFunction === undefined || cbUnpack === undefined) {
            return;
        }

        if (packetCallback.length !== cbUnpack[0]) {
            // silently ignoring callback with wrong length
            return;
        }

        // llvalues is an array with unpacked values
        const llvalues = this.unpack(this.getPayloadFromPacket(packetCallback), cbUnpack[1]);

        // Process high-level callback
        if (-functionID in device.registeredCallbacks) {
            let length = 0;
            let chunkOffset = 0;
            let chunkData = null;
            const hlcb = device.highLevelCallbacks[-functionID];
            // FIXME: currently assuming that cbUnpack is longer than 1
            let data = null;
            let hasData = false;

            if (hlcb[1].fixedLength === null) {
                length = llvalues[hlcb[0].indexOf('streamLength')];
            } else {
                length = hlcb[1].fixedLength;
            }

            if (hlcb[1].singleChunk) {
                chunkOffset = 0;
            } else {
                chunkOffset = llvalues[hlcb[0].indexOf('streamChunkOffset')];
            }

            chunkData = llvalues[hlcb[0].indexOf('streamChunkData')];

            // No stream in-progress
            if (hlcb[2] === null) {
                // Stream starts
                if (chunkOffset === 0) {
                    hlcb[2] = chunkData;

                    // Stream complete
                    if (hlcb[2].length >= length) {
                        hasData = true;
                        data = hlcb[2].splice(0, length);
                    }
                } else {
                    // Ignore tail of current stream, wait for next stream start
                }
            } else {
                // Stream in-progress
                // eslint-disable-next-line no-lonely-if
                if (chunkOffset === hlcb[2].length) {
                    // Stream in-sync
                    hlcb[2] = hlcb[2].concat(chunkData);

                    if (hlcb[2].length >= length) {
                        // Stream complete
                        hasData = true;
                        data = hlcb[2].splice(0, length);
                    }
                } else {
                    // Stream out-of-sync
                    hasData = true;
                    data = null;
                }
            }

            registeredCallback = device.registeredCallbacks[-functionID];

            if (hasData && registeredCallback !== undefined) {
                const result = [];
                const rolesMappedData = [];

                for (i = 0; i < hlcb[0].length; i++) {
                    rolesMappedData.push({
                        role: hlcb[0][i],
                        llvalue: llvalues[i]
                    });
                }

                for (i = 0; i < rolesMappedData.length; i++) {
                    if (rolesMappedData[i].role === 'streamChunkData') {
                        result.push(data);
                    } else if (rolesMappedData[i].role === null) {
                        result.push(rolesMappedData[i].llvalue);
                    }
                }

                hlcb[2] = null;

                registeredCallback.apply(this, result);
            }
        }

        // Process normal or low-level callbacks
        registeredCallback = device.registeredCallbacks[functionID];

        if (registeredCallback !== undefined) {
            registeredCallback.apply(this, llvalues);
        }
    }

    /**
     * handlePacket
     * @param packet
     */
    public handlePacket(packet: Buffer): void {
        if (this.getSequenceNumberFromPacket(packet) === 0) {
            this.handleCallback(packet);
        }

        if (this.getSequenceNumberFromPacket(packet) > 0) {
            this.handleResponse(packet);
        }
    }

    /**
     * getConnectionState
     */
    public getConnectionState(): number {
        if (this.isConnected) {
            return IPConnection.CONNECTION_STATE_CONNECTED;
        }

        if (this.getCurrentTaskKind() === IPConnection.TASK_KIND_AUTO_RECONNECT) {
            return IPConnection.CONNECTION_STATE_PENDING;
        }

        return IPConnection.CONNECTION_STATE_DISCONNECTED;
    }

    /**
     * setAutoReconnect
     * @param autoReconnect
     */
    public setAutoReconnect(autoReconnect: boolean): void {
        this.autoReconnect = autoReconnect;
    }

    /**
     * getAutoReconnect
     */
    public getAutoReconnect(): boolean {
        return this.autoReconnect;
    }

    /**
     * setTimeout
     * @param timeout
     */
    public setTimeout(timeout: number): void {
        this.timeout = timeout;
    }

    /**
     * getTimeout
     */
    public getTimeout(): number {
        return this.timeout;
    }

    /**
     * enumerate
     * @param errorCallback
     */
    public enumerate(errorCallback?: TFErrorCallback): void {
        if (this.getConnectionState() !== IPConnection.CONNECTION_STATE_CONNECTED) {
            if (errorCallback) {
                errorCallback(IPConnection.ERROR_NOT_CONNECTED);
            }

            return;
        }

        if (this.socket) {
            const buffer = this.createPacketHeader(undefined, 8, IPConnection.FUNCTION_ENUMERATE);

            if (buffer) {
                this.socket.write(buffer, true);
            }
        }
    }

    /**
     * getRandomUInt32
     * @param returnCallback
     */
    public getRandomUInt32(returnCallback: TFErrorCallback): void {
        crypto.randomBytes(4, (error, buffer) => {
            if (error) {
                crypto.pseudoRandomBytes(4, (terror: Error|null, tbuffer: Buffer) => {
                    if (terror) {
                        returnCallback(Math.ceil(Math.random() * 4294967295));
                    } else {
                        const data = Utils.buffer_wrapper(tbuffer);
                        returnCallback(data.readUInt32LE(0));
                    }
                });
            } else {
                const data = Utils.buffer_wrapper(buffer);
                returnCallback(data.readUInt32LE(0));
            }
        });
    }

    /**
     * isASCII
     * @param s
     */
    public isASCII(s: string): boolean {
        for (let i = 0; i < s.length; ++i) {
            if (s.charCodeAt(i) > 0x7f) {
                return false;
            }
        }

        return true;
    }

    /**
     * authenticateInternal
     * @param secret
     * @param returnCallback
     * @param errorCallback
     */
    public authenticateInternal(secret: string, returnCallback: TFAnyFunction, errorCallback: TFErrorCallback): void {
        if (!this.isASCII(secret)) {
            errorCallback(IPConnection.ERROR_NON_ASCII_CHAR_IN_SECRET);
        }

        this.brickd.getAuthenticationNonce((serverNonce) => {
            const clientNonceNumber = this.nextAuthenticationNonce++;
            const clientNonceBytes = this.pack([clientNonceNumber], 'I');
            const clientNonce = this.unpack(clientNonceBytes, 'B4')[0];
            const combinedNonceBytes = this.pack([
                serverNonce,
                clientNonce
            ], 'B4 B4');

            const hmac = crypto.createHmac('sha1', secret);

            hmac.update(combinedNonceBytes);

            const digestBytes = hmac.digest();
            const digest = this.unpack(digestBytes, 'B20')[0];

            this.brickd.authenticate(clientNonce, digest,
                () => {
                    if (returnCallback) {
                        returnCallback();
                    }

                    this.popTask();
                },
                (error) => {
                    if (errorCallback) {
                        errorCallback(error);
                    }

                    this.popTask();
                });
        }, (error) => {
            if (errorCallback) {
                errorCallback(error);
            }

            this.popTask();
        });
    }

    /**
     * authenticate
     * @param secret
     * @param returnCallback
     * @param errorCallback
     */
    public authenticate(secret: string, returnCallback: TFAnyFunction, errorCallback: TFErrorCallback): void {
        this.pushTask(() => {
            if (this.nextAuthenticationNonce === 0) {
                this.getRandomUInt32((r: number) => {
                    this.nextAuthenticationNonce = r;
                    this.authenticateInternal(secret, returnCallback, errorCallback);
                });
            } else {
                this.authenticateInternal(secret, returnCallback, errorCallback);
            }
        }, IPConnection.TASK_KIND_AUTHENTICATE);
    }

    /**
     * on
     * @param callbackID
     * @param function_
     */
    public on(callbackID: number, function_: TFAnyFunction): void {
        this.registeredCallbacks[callbackID] = function_;
    }

    /**
     * getNextSequenceNumber
     */
    public getNextSequenceNumber(): number {
        if (this.nextSequenceNumber >= 15) {
            this.nextSequenceNumber = 0;
        }

        return ++this.nextSequenceNumber;
    }

    /**
     * createPacketHeader
     * @param headerDevice
     * @param headerLength
     * @param headerFunctionID
     * @param headerErrorCB
     */
    public createPacketHeader(headerDevice: Device|undefined, headerLength: number, headerFunctionID: number, headerErrorCB?: TFErrorCallback): Buffer|null {
        let UID = IPConnection.BROADCAST_UID;
        const len = headerLength;
        const FID = headerFunctionID;
        const seq = this.getNextSequenceNumber();
        let responseBits = 0;
        const EFutureUse = 0;
        let returnOnError = false;

        if (headerDevice !== undefined) {
            const responseExpected = headerDevice.getResponseExpected(
                headerFunctionID,
                (errorCode) => {
                    returnOnError = true;

                    if (headerErrorCB !== undefined) {
                        headerErrorCB(errorCode);
                    }
                }
            );

            if (returnOnError) {
                returnOnError = false;
                return null;
            }

            UID = headerDevice.uid;

            if (responseExpected) {
                responseBits = 1;
            }
        }

        // eslint-disable-next-line no-bitwise
        let seqResponseOOBits = seq << 4;

        if (responseBits) {
            // eslint-disable-next-line no-bitwise
            seqResponseOOBits |= responseBits << 3;
        }

        const returnHeader = Utils.buffer_wrapper(8);
        returnHeader.writeUInt32LE(UID, 0);
        returnHeader.writeUInt8(len, 4);
        returnHeader.writeUInt8(FID, 5);
        returnHeader.writeUInt8(seqResponseOOBits, 6);
        returnHeader.writeUInt8(EFutureUse, 7);

        return returnHeader;
    }

    /**
     * createChunkData
     * @param data
     * @param chunkOffset
     * @param chunkLength
     * @param chunkPadding
     */
    public createChunkData(data: string[], chunkOffset: number, chunkLength: number, chunkPadding: string): string[] {
        let chunkData = data.slice(chunkOffset, chunkOffset + chunkLength);

        if (chunkData.length < chunkLength) {
            const padding: string[] = new Array(chunkLength - chunkData.length);
            padding.fill(chunkPadding);

            padding.forEach((value) => {
                chunkData = chunkData.concat(value);
            });
        }

        return chunkData;
    }

}