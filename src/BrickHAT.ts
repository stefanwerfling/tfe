import {Device} from './Device.js';
import {IPConnection} from './IPConnection.js';

/**
 * BrickHAT
 */
export class BrickHAT extends Device {

    public static DEVICE_IDENTIFIER = 111;
    public static DEVICE_DISPLAY_NAME = 'HAT Brick';
    public static CALLBACK_VOLTAGES = 8;
    public static FUNCTION_SET_SLEEP_MODE = 1;
    public static FUNCTION_GET_SLEEP_MODE = 2;
    public static FUNCTION_SET_BRICKLET_POWER = 3;
    public static FUNCTION_GET_BRICKLET_POWER = 4;
    public static FUNCTION_GET_VOLTAGES = 5;
    public static FUNCTION_SET_VOLTAGES_CALLBACK_CONFIGURATION = 6;
    public static FUNCTION_GET_VOLTAGES_CALLBACK_CONFIGURATION = 7;
    public static FUNCTION_SET_RTC_DRIVER = 9;
    public static FUNCTION_GET_RTC_DRIVER = 10;
    public static FUNCTION_GET_SPITFP_ERROR_COUNT = 234;
    public static FUNCTION_SET_BOOTLOADER_MODE = 235;
    public static FUNCTION_GET_BOOTLOADER_MODE = 236;
    public static FUNCTION_SET_WRITE_FIRMWARE_POINTER = 237;
    public static FUNCTION_WRITE_FIRMWARE = 238;
    public static FUNCTION_SET_STATUS_LED_CONFIG = 239;
    public static FUNCTION_GET_STATUS_LED_CONFIG = 240;
    public static FUNCTION_GET_CHIP_TEMPERATURE = 242;
    public static FUNCTION_RESET = 243;
    public static FUNCTION_WRITE_UID = 248;
    public static FUNCTION_READ_UID = 249;
    public static FUNCTION_GET_IDENTITY = 255;
    public static RTC_DRIVER_PCF8523 = 0;
    public static RTC_DRIVER_DS1338 = 1;
    public static BOOTLOADER_MODE_BOOTLOADER = 0;
    public static BOOTLOADER_MODE_FIRMWARE = 1;
    public static BOOTLOADER_MODE_BOOTLOADER_WAIT_FOR_REBOOT = 2;
    public static BOOTLOADER_MODE_FIRMWARE_WAIT_FOR_REBOOT = 3;
    public static BOOTLOADER_MODE_FIRMWARE_WAIT_FOR_ERASE_AND_REBOOT = 4;
    public static BOOTLOADER_STATUS_OK = 0;
    public static BOOTLOADER_STATUS_INVALID_MODE = 1;
    public static BOOTLOADER_STATUS_NO_CHANGE = 2;
    public static BOOTLOADER_STATUS_ENTRY_FUNCTION_NOT_PRESENT = 3;
    public static BOOTLOADER_STATUS_DEVICE_IDENTIFIER_INCORRECT = 4;
    public static BOOTLOADER_STATUS_CRC_MISMATCH = 5;
    public static STATUS_LED_CONFIG_OFF = 0;
    public static STATUS_LED_CONFIG_ON = 1;
    public static STATUS_LED_CONFIG_SHOW_HEARTBEAT = 2;
    public static STATUS_LED_CONFIG_SHOW_STATUS = 3;

    /**
     * constructor
     * @param uid
     * @param ipcon
     */
    public constructor(uid: string, ipcon: IPConnection) {
        super(uid, ipcon, BrickHAT.DEVICE_IDENTIFIER, BrickHAT.DEVICE_DISPLAY_NAME);
        this.APIVersion = [2, 0, 2];
        this.responseExpected[BrickHAT.FUNCTION_SET_SLEEP_MODE] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickHAT.FUNCTION_GET_SLEEP_MODE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickHAT.FUNCTION_SET_BRICKLET_POWER] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickHAT.FUNCTION_GET_BRICKLET_POWER] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickHAT.FUNCTION_GET_VOLTAGES] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickHAT.FUNCTION_SET_VOLTAGES_CALLBACK_CONFIGURATION] = Device.RESPONSE_EXPECTED_TRUE;
        this.responseExpected[BrickHAT.FUNCTION_GET_VOLTAGES_CALLBACK_CONFIGURATION] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickHAT.FUNCTION_SET_RTC_DRIVER] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickHAT.FUNCTION_GET_RTC_DRIVER] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickHAT.FUNCTION_GET_SPITFP_ERROR_COUNT] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickHAT.FUNCTION_SET_BOOTLOADER_MODE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickHAT.FUNCTION_GET_BOOTLOADER_MODE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickHAT.FUNCTION_SET_WRITE_FIRMWARE_POINTER] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickHAT.FUNCTION_WRITE_FIRMWARE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickHAT.FUNCTION_SET_STATUS_LED_CONFIG] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickHAT.FUNCTION_GET_STATUS_LED_CONFIG] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickHAT.FUNCTION_GET_CHIP_TEMPERATURE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickHAT.FUNCTION_RESET] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickHAT.FUNCTION_WRITE_UID] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickHAT.FUNCTION_READ_UID] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickHAT.FUNCTION_GET_IDENTITY] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.callbackFormats[BrickHAT.CALLBACK_VOLTAGES] = [12, 'H H'];
    }

}