import { Device, TFAnyFunction, TFErrorCallback } from './Device.js';
import { IPConnection } from './IPConnection.js';
import { Char } from './Type/Char.js';
/**
 * BrickletTemperatureV2
 */
export declare class BrickletTemperatureV2 extends Device {
    static DEVICE_IDENTIFIER: number;
    static DEVICE_DISPLAY_NAME: string;
    static CALLBACK_TEMPERATURE: number;
    static FUNCTION_GET_TEMPERATURE: number;
    static FUNCTION_SET_TEMPERATURE_CALLBACK_CONFIGURATION: number;
    static FUNCTION_GET_TEMPERATURE_CALLBACK_CONFIGURATION: number;
    static FUNCTION_SET_HEATER_CONFIGURATION: number;
    static FUNCTION_GET_HEATER_CONFIGURATION: number;
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
    static THRESHOLD_OPTION_OFF: string;
    static THRESHOLD_OPTION_OUTSIDE: string;
    static THRESHOLD_OPTION_INSIDE: string;
    static THRESHOLD_OPTION_SMALLER: string;
    static THRESHOLD_OPTION_GREATER: string;
    static HEATER_CONFIG_DISABLED: number;
    static HEATER_CONFIG_ENABLED: number;
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
    constructor(uid: string, ipcon: IPConnection);
    getTemperature(returnCallback: (temperature: number) => void, errorCallback?: TFErrorCallback): void;
    /**
     * setTemperatureCallbackConfiguration
     * @param period
     * @param valueHasToChange
     * @param option
     * @param min
     * @param max
     * @param returnCallback
     * @param errorCallback
     */
    setTemperatureCallbackConfiguration(period: number, valueHasToChange: boolean, option: Char, min: number, max: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    getTemperatureCallbackConfiguration(returnCallback: (period: number, valueHasToChange: boolean, option: Char, min: number, max: number) => void, errorCallback?: TFErrorCallback): void;
    /**
     * setHeaterConfiguration
     * @param heaterConfig
     * @param returnCallback
     * @param errorCallback
     */
    setHeaterConfiguration(heaterConfig: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * getHeaterConfiguration
     * @param returnCallback
     * @param errorCallback
     */
    getHeaterConfiguration(returnCallback: (heaterConfig: number) => void, errorCallback?: TFErrorCallback): void;
    getSPITFPErrorCount(returnCallback: (errorCountAckChecksum: number, errorCountMessageChecksum: number, errorCountFrame: number, errorCountOverflow: number) => void, errorCallback?: TFErrorCallback): void;
    /**
     * setBootloaderMode
     * @param mode
     * @param returnCallback
     * @param errorCallback
     */
    setBootloaderMode(mode: number, returnCallback: (status: number) => void, errorCallback?: TFErrorCallback): void;
    /**
     * getBootloaderMode
     * @param returnCallback
     * @param errorCallback
     */
    getBootloaderMode(returnCallback: (mode: number) => void, errorCallback?: TFErrorCallback): void;
}
