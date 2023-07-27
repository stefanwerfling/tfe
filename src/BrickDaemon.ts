import {Device, TFAnyFunction, TFErrorCallback} from './Device.js';
import {IPConnection} from './IPConnection.js';
import {Char} from './Type/Char.js';

/**
 * BrickDaemon
 */
export class BrickDaemon extends Device {

    public static FUNCTION_GET_AUTHENTICATION_NONCE = 1;
    public static FUNCTION_AUTHENTICATE = 2;

    public override responseExpected: any[] = [];
    public override callbackFormats: any[] = [];
    public override APIVersion: number[] = [2, 0, 0];

    /**
     * constructor
     * @param uid
     * @param ipcon
     */
    public constructor(uid: string, ipcon: IPConnection) {
        super(uid, ipcon, 0, 'Brick Daemon');

        this.responseExpected[BrickDaemon.FUNCTION_GET_AUTHENTICATION_NONCE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickDaemon.FUNCTION_AUTHENTICATE] = Device.RESPONSE_EXPECTED_TRUE;
        this.ipcon.addDevice(this);
    }

    /**
     * getAuthenticationNonce
     * @param returnCallback
     * @param errorCallback
     */
    public getAuthenticationNonce(returnCallback: TFAnyFunction, errorCallback?: TFErrorCallback): void {
        this.ipcon.sendRequest(
            this,
            BrickDaemon.FUNCTION_GET_AUTHENTICATION_NONCE,
            [],
            '',
            12,
            'B4',
            returnCallback,
            errorCallback,
            false,
            false
        );
    }

    /**
     * authenticate
     * @param clientNonce
     * @param digest
     * @param returnCallback
     * @param errorCallback
     */
    public authenticate(clientNonce: Char[], digest: Char[], returnCallback: TFAnyFunction, errorCallback?: TFErrorCallback): void {
        this.ipcon.sendRequest(
            this,
            BrickDaemon.FUNCTION_AUTHENTICATE,
            [clientNonce, digest],
            'B4 B20',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            false
        );
    }

}