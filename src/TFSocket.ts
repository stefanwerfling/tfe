import net from 'net';
import {IPConnection} from './IPConnection.js';

/**
 * TFSocket
 */
export class TFSocket {

    public port: number;
    public host: string;
    public ipcon: IPConnection;
    public socket: net.Socket;

    /**
     * constructor
     * @param PORT
     * @param HOST
     * @param ipcon
     */
    public constructor(PORT: number, HOST: string, ipcon: IPConnection) {
        this.port = PORT;
        this.host = HOST;
        this.ipcon = ipcon;
        this.socket = new net.Socket();
    }

    /**
     * on
     * @param str
     * @param func
     */
    public on(str: string, func: (...args: any[]) => void): void {
        this.socket.on(str, func);
    }

    /**
     * connect
     */
    public connect(): void {
        this.socket.connect(this.port, this.host);
    }

    /**
     * setNoDelay
     * @param value
     */
    public setNoDelay(value: boolean): void {
        this.socket.setNoDelay(value);
    }

    /**
     * write
     * @param data
     * @param reset_disconnect_probe
     */
    public write(data: string | Uint8Array, reset_disconnect_probe: boolean): void {
        if (reset_disconnect_probe) {
            this.socket.write(data, () => {
                this.ipcon.resetDisconnectProbe();
            });
        } else {
            this.socket.write(data);
        }
    }

    /**
     * end
     */
    public end(): void {
        this.socket.end();
    }

    /**
     * destroy
     */
    public destroy(): void {
        this.socket.destroy();
    }

}