import { Device } from './Device.js';
/**
 * BrickDaemon
 */
export class BrickDaemon extends Device {
    /**
     * constructor
     * @param uid
     * @param ipcon
     */
    constructor(uid, ipcon) {
        super(uid, ipcon, 0, 'Brick Daemon');
        this.responseExpected = [];
        this.callbackFormats = [];
        this.APIVersion = [2, 0, 0];
        this.responseExpected[BrickDaemon.FUNCTION_GET_AUTHENTICATION_NONCE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickDaemon.FUNCTION_AUTHENTICATE] = Device.RESPONSE_EXPECTED_TRUE;
        this.ipcon.addDevice(this);
    }
    /**
     * getAuthenticationNonce
     * @param returnCallback
     * @param errorCallback
     */
    getAuthenticationNonce(returnCallback, errorCallback) {
        this.ipcon.sendRequest(this, BrickDaemon.FUNCTION_GET_AUTHENTICATION_NONCE, [], '', 12, 'B4', returnCallback, errorCallback, false, false);
    }
    /**
     * authenticate
     * @param clientNonce
     * @param digest
     * @param returnCallback
     * @param errorCallback
     */
    authenticate(clientNonce, digest, returnCallback, errorCallback) {
        this.ipcon.sendRequest(this, BrickDaemon.FUNCTION_AUTHENTICATE, [clientNonce, digest], 'B4 B20', 0, '', returnCallback, errorCallback, false, false);
    }
}
BrickDaemon.FUNCTION_GET_AUTHENTICATION_NONCE = 1;
BrickDaemon.FUNCTION_AUTHENTICATE = 2;
