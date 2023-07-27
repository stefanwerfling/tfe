import net from 'net';
/**
 * TFSocket
 */
export class TFSocket {
    /**
     * constructor
     * @param PORT
     * @param HOST
     * @param ipcon
     */
    constructor(PORT, HOST, ipcon) {
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
    on(str, func) {
        this.socket.on(str, func);
    }
    /**
     * connect
     */
    connect() {
        this.socket.connect(this.port, this.host);
    }
    /**
     * setNoDelay
     * @param value
     */
    setNoDelay(value) {
        this.socket.setNoDelay(value);
    }
    /**
     * write
     * @param data
     * @param reset_disconnect_probe
     */
    write(data, reset_disconnect_probe) {
        if (reset_disconnect_probe) {
            this.socket.write(data, () => {
                this.ipcon.resetDisconnectProbe();
            });
        }
        else {
            this.socket.write(data);
        }
    }
    /**
     * end
     */
    end() {
        this.socket.end();
    }
    /**
     * destroy
     */
    destroy() {
        this.socket.destroy();
    }
}
