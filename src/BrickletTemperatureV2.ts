import {Device, TFAnyFunction, TFErrorCallback} from './Device.js';
import {IPConnection} from './IPConnection.js';
import {Char} from './Type/Char.js';

/**
 * BrickletTemperatureV2
 */
export class BrickletTemperatureV2 extends Device {

    public static DEVICE_IDENTIFIER = 2113;
    public static DEVICE_DISPLAY_NAME = 'Temperature Bricklet 2.0';
    public static CALLBACK_TEMPERATURE = 4;
    public static FUNCTION_GET_TEMPERATURE = 1;
    public static FUNCTION_SET_TEMPERATURE_CALLBACK_CONFIGURATION = 2;
    public static FUNCTION_GET_TEMPERATURE_CALLBACK_CONFIGURATION = 3;
    public static FUNCTION_SET_HEATER_CONFIGURATION = 5;
    public static FUNCTION_GET_HEATER_CONFIGURATION = 6;
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
    public static THRESHOLD_OPTION_OFF = 'x';
    public static THRESHOLD_OPTION_OUTSIDE = 'o';
    public static THRESHOLD_OPTION_INSIDE = 'i';
    public static THRESHOLD_OPTION_SMALLER = '<';
    public static THRESHOLD_OPTION_GREATER = '>';
    public static HEATER_CONFIG_DISABLED = 0;
    public static HEATER_CONFIG_ENABLED = 1;
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

    public constructor(uid: string, ipcon: IPConnection) {
        super(uid, ipcon, BrickletTemperatureV2.DEVICE_IDENTIFIER, BrickletTemperatureV2.DEVICE_DISPLAY_NAME);

        this.APIVersion = [2, 0, 0];
        this.responseExpected[BrickletTemperatureV2.FUNCTION_GET_TEMPERATURE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_SET_TEMPERATURE_CALLBACK_CONFIGURATION] = Device.RESPONSE_EXPECTED_TRUE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_GET_TEMPERATURE_CALLBACK_CONFIGURATION] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_SET_HEATER_CONFIGURATION] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_GET_HEATER_CONFIGURATION] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_GET_SPITFP_ERROR_COUNT] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_SET_BOOTLOADER_MODE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_GET_BOOTLOADER_MODE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_SET_WRITE_FIRMWARE_POINTER] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_WRITE_FIRMWARE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_SET_STATUS_LED_CONFIG] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_GET_STATUS_LED_CONFIG] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_GET_CHIP_TEMPERATURE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_RESET] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_WRITE_UID] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_READ_UID] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletTemperatureV2.FUNCTION_GET_IDENTITY] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.callbackFormats[BrickletTemperatureV2.CALLBACK_TEMPERATURE] = [10, 'h'];

        this.ipcon.addDevice(this);
    }

    public getTemperature(returnCallback: (temperature: number) => void, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the temperature measured by the sensor.
         *
         * If you want to get the value periodically, it is recommended to use the
         * :cb:`Temperature` callback. You can set the callback configuration
         * with :func:`Set Temperature Callback Configuration`.
         */
        this.ipcon.sendRequest(
            this,
            BrickletTemperatureV2.FUNCTION_GET_TEMPERATURE,
            [],
            '',
            10,
            'h',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

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
    public setTemperatureCallbackConfiguration(
        period: number,
        valueHasToChange: boolean,
        option: Char,
        min: number,
        max: number,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         *
         * The period is the period with which the :cb:`Temperature` callback is triggered
         * periodically. A value of 0 turns the callback off.
         *
         * If the `value has to change`-parameter is set to true, the callback is only
         * triggered after the value has changed. If the value didn't change
         * within the period, the callback is triggered immediately on change.
         *
         * If it is set to false, the callback is continuously triggered with the period,
         * independent of the value.
         *
         * It is furthermore possible to constrain the callback with thresholds.
         *
         * The `option`-parameter together with min/max sets a threshold for the :cb:`Temperature` callback.
         *
         * The following options are possible:
         *
         * .. csv-table::
         * :header: "Option", "Description"
         * :widths: 10, 100
         *
         * "'x'",    "Threshold is turned off"
         * "'o'",    "Threshold is triggered when the value is *outside* the min and max values"
         * "'i'",    "Threshold is triggered when the value is *inside* or equal to the min and max values"
         * "'<'",    "Threshold is triggered when the value is smaller than the min value (max is ignored)"
         * "'>'",    "Threshold is triggered when the value is greater than the min value (max is ignored)"
         *
         * If the option is set to 'x' (threshold turned off) the callback is triggered with the fixed period.
         */
        this.ipcon.sendRequest(
            this,
            BrickletTemperatureV2.FUNCTION_SET_TEMPERATURE_CALLBACK_CONFIGURATION,
            [period, valueHasToChange, option, min, max],
            'I ? c h h',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    public getTemperatureCallbackConfiguration(
        returnCallback: (
            period: number,
            valueHasToChange: boolean,
            option: Char,
            min: number,
            max: number
        ) => void,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * Returns the callback configuration as set by :func:`Set Temperature Callback Configuration`.
         */
        this.ipcon.sendRequest(
            this,
            BrickletTemperatureV2.FUNCTION_GET_TEMPERATURE_CALLBACK_CONFIGURATION,
            [],
            '',
            18,
            'I ? c h h',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * setHeaterConfiguration
     * @param heaterConfig
     * @param returnCallback
     * @param errorCallback
     */
    public setHeaterConfiguration(heaterConfig: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Enables/disables the heater. The heater can be used to test the sensor.
         */
        this.ipcon.sendRequest(
            this,
            BrickletTemperatureV2.FUNCTION_SET_HEATER_CONFIGURATION,
            [heaterConfig],
            'B',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * getHeaterConfiguration
     * @param returnCallback
     * @param errorCallback
     */
    public getHeaterConfiguration(returnCallback: (heaterConfig: number) => void, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the heater configuration as set by :func:`Set Heater Configuration`.
         */
        this.ipcon.sendRequest(
            this,
            BrickletTemperatureV2.FUNCTION_GET_HEATER_CONFIGURATION,
            [],
            '',
            9,
            'B',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    public getSPITFPErrorCount(
        returnCallback: (
            errorCountAckChecksum: number,
            errorCountMessageChecksum: number,
            errorCountFrame: number,
            errorCountOverflow: number
            ) => void,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * Returns the error count for the communication between Brick and Bricklet.
         *
         * The errors are divided into
         *
         * * ACK checksum errors,
         * * message checksum errors,
         * * framing errors and
         * * overflow errors.
         *
         * The errors counts are for errors that occur on the Bricklet side. All
         * Bricks have a similar function that returns the errors on the Brick side.
         */
        this.ipcon.sendRequest(
            this,
            BrickletTemperatureV2.FUNCTION_GET_SPITFP_ERROR_COUNT,
            [],
            '',
            24,
            'I I I I',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * setBootloaderMode
     * @param mode
     * @param returnCallback
     * @param errorCallback
     */
    public setBootloaderMode(mode: number, returnCallback: (status: number) => void, errorCallback?: TFErrorCallback): void {

        /**
         * Sets the bootloader mode and returns the status after the requested
         * mode change was instigated.
         *
         * You can change from bootloader mode to firmware mode and vice versa. A change
         * from bootloader mode to firmware mode will only take place if the entry function,
         * device identifier and CRC are present and correct.
         *
         * This function is used by Brick Viewer during flashing. It should not be
         * necessary to call it in a normal user program.
         */
        this.ipcon.sendRequest(
            this,
            BrickletTemperatureV2.FUNCTION_SET_BOOTLOADER_MODE,
            [mode],
            'B',
            9,
            'B',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * getBootloaderMode
     * @param returnCallback
     * @param errorCallback
     */
    public getBootloaderMode(returnCallback: (mode: number) => void, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the current bootloader mode, see :func:`Set Bootloader Mode`.
         */
        this.ipcon.sendRequest(
            this,
            BrickletTemperatureV2.FUNCTION_GET_BOOTLOADER_MODE,
            [],
            '',
            9,
            'B',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

}