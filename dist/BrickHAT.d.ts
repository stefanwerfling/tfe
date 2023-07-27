import { Device } from './Device.js';
import { IPConnection } from './IPConnection.js';
/**
 * BrickHAT
 */
export declare class BrickHAT extends Device {
    static DEVICE_IDENTIFIER: number;
    static DEVICE_DISPLAY_NAME: string;
    static CALLBACK_VOLTAGES: number;
    static FUNCTION_SET_SLEEP_MODE: number;
    static FUNCTION_GET_SLEEP_MODE: number;
    static FUNCTION_SET_BRICKLET_POWER: number;
    static FUNCTION_GET_BRICKLET_POWER: number;
    static FUNCTION_GET_VOLTAGES: number;
    static FUNCTION_SET_VOLTAGES_CALLBACK_CONFIGURATION: number;
    static FUNCTION_GET_VOLTAGES_CALLBACK_CONFIGURATION: number;
    static FUNCTION_SET_RTC_DRIVER: number;
    static FUNCTION_GET_RTC_DRIVER: number;
    static FUNCTION_GET_SPITFP_ERROR_COUNT: number;
    static FUNCTION_SET_BOOTLOADER_MODE: number;
    static FUNCTION_GET_BOOTLOADER_MODE: number;
    static FUNCTION_SET_WRITE_FIRMWARE_POINTER: number;
    static FUNCTION_WRITE_FIRMWARE: number;
    static FUNCTION_SET_STATUS_LED_CONFIG: number;
    static FUNCTION_GET_STATUS_LED_CONFIG: number;
    static FUNCTION_GET_CHIP_TEMPERATURE: number;
    static FUNCTION_RESET: number;
    static FUNCTION_WRITE_UID: number;
    static FUNCTION_READ_UID: number;
    static FUNCTION_GET_IDENTITY: number;
    static RTC_DRIVER_PCF8523: number;
    static RTC_DRIVER_DS1338: number;
    static BOOTLOADER_MODE_BOOTLOADER: number;
    static BOOTLOADER_MODE_FIRMWARE: number;
    static BOOTLOADER_MODE_BOOTLOADER_WAIT_FOR_REBOOT: number;
    static BOOTLOADER_MODE_FIRMWARE_WAIT_FOR_REBOOT: number;
    static BOOTLOADER_MODE_FIRMWARE_WAIT_FOR_ERASE_AND_REBOOT: number;
    static BOOTLOADER_STATUS_OK: number;
    static BOOTLOADER_STATUS_INVALID_MODE: number;
    static BOOTLOADER_STATUS_NO_CHANGE: number;
    static BOOTLOADER_STATUS_ENTRY_FUNCTION_NOT_PRESENT: number;
    static BOOTLOADER_STATUS_DEVICE_IDENTIFIER_INCORRECT: number;
    static BOOTLOADER_STATUS_CRC_MISMATCH: number;
    static STATUS_LED_CONFIG_OFF: number;
    static STATUS_LED_CONFIG_ON: number;
    static STATUS_LED_CONFIG_SHOW_HEARTBEAT: number;
    static STATUS_LED_CONFIG_SHOW_STATUS: number;
    /**
     * constructor
     * @param uid
     * @param ipcon
     */
    constructor(uid: string, ipcon: IPConnection);
}
