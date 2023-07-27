/// <reference types="node" resolution-mode="require"/>
import net from 'net';
import { IPConnection } from './IPConnection.js';
/**
 * TFSocket
 */
export declare class TFSocket {
    port: number;
    host: string;
    ipcon: IPConnection;
    socket: net.Socket;
    /**
     * constructor
     * @param PORT
     * @param HOST
     * @param ipcon
     */
    constructor(PORT: number, HOST: string, ipcon: IPConnection);
    /**
     * on
     * @param str
     * @param func
     */
    on(str: string, func: (...args: any[]) => void): void;
    /**
     * connect
     */
    connect(): void;
    /**
     * setNoDelay
     * @param value
     */
    setNoDelay(value: boolean): void;
    /**
     * write
     * @param data
     * @param reset_disconnect_probe
     */
    write(data: string | Uint8Array, reset_disconnect_probe: boolean): void;
    /**
     * end
     */
    end(): void;
    /**
     * destroy
     */
    destroy(): void;
}
