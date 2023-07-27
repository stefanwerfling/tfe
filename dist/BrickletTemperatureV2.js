import { Device } from './Device.js';
/**
 * BrickletTemperatureV2
 */
export class BrickletTemperatureV2 extends Device {
    constructor(uid, ipcon) {
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
    getTemperature(returnCallback, errorCallback) {
        /**
         * Returns the temperature measured by the sensor.
         *
         * If you want to get the value periodically, it is recommended to use the
         * :cb:`Temperature` callback. You can set the callback configuration
         * with :func:`Set Temperature Callback Configuration`.
         */
        this.ipcon.sendRequest(this, BrickletTemperatureV2.FUNCTION_GET_TEMPERATURE, [], '', 10, 'h', returnCallback, errorCallback, false, true);
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
    setTemperatureCallbackConfiguration(period, valueHasToChange, option, min, max, returnCallback, errorCallback) {
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
        this.ipcon.sendRequest(this, BrickletTemperatureV2.FUNCTION_SET_TEMPERATURE_CALLBACK_CONFIGURATION, [period, valueHasToChange, option, min, max], 'I ? c h h', 0, '', returnCallback, errorCallback, false, true);
    }
    getTemperatureCallbackConfiguration(returnCallback, errorCallback) {
        /**
         * Returns the callback configuration as set by :func:`Set Temperature Callback Configuration`.
         */
        this.ipcon.sendRequest(this, BrickletTemperatureV2.FUNCTION_GET_TEMPERATURE_CALLBACK_CONFIGURATION, [], '', 18, 'I ? c h h', returnCallback, errorCallback, false, true);
    }
    /**
     * setHeaterConfiguration
     * @param heaterConfig
     * @param returnCallback
     * @param errorCallback
     */
    setHeaterConfiguration(heaterConfig, returnCallback, errorCallback) {
        /**
         * Enables/disables the heater. The heater can be used to test the sensor.
         */
        this.ipcon.sendRequest(this, BrickletTemperatureV2.FUNCTION_SET_HEATER_CONFIGURATION, [heaterConfig], 'B', 0, '', returnCallback, errorCallback, false, true);
    }
    /**
     * getHeaterConfiguration
     * @param returnCallback
     * @param errorCallback
     */
    getHeaterConfiguration(returnCallback, errorCallback) {
        /**
         * Returns the heater configuration as set by :func:`Set Heater Configuration`.
         */
        this.ipcon.sendRequest(this, BrickletTemperatureV2.FUNCTION_GET_HEATER_CONFIGURATION, [], '', 9, 'B', returnCallback, errorCallback, false, true);
    }
    getSPITFPErrorCount(returnCallback, errorCallback) {
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
        this.ipcon.sendRequest(this, BrickletTemperatureV2.FUNCTION_GET_SPITFP_ERROR_COUNT, [], '', 24, 'I I I I', returnCallback, errorCallback, false, true);
    }
    /**
     * setBootloaderMode
     * @param mode
     * @param returnCallback
     * @param errorCallback
     */
    setBootloaderMode(mode, returnCallback, errorCallback) {
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
        this.ipcon.sendRequest(this, BrickletTemperatureV2.FUNCTION_SET_BOOTLOADER_MODE, [mode], 'B', 9, 'B', returnCallback, errorCallback, false, true);
    }
    /**
     * getBootloaderMode
     * @param returnCallback
     * @param errorCallback
     */
    getBootloaderMode(returnCallback, errorCallback) {
        /**
         * Returns the current bootloader mode, see :func:`Set Bootloader Mode`.
         */
        this.ipcon.sendRequest(this, BrickletTemperatureV2.FUNCTION_GET_BOOTLOADER_MODE, [], '', 9, 'B', returnCallback, errorCallback, false, true);
    }
}
BrickletTemperatureV2.DEVICE_IDENTIFIER = 2113;
BrickletTemperatureV2.DEVICE_DISPLAY_NAME = 'Temperature Bricklet 2.0';
BrickletTemperatureV2.CALLBACK_TEMPERATURE = 4;
BrickletTemperatureV2.FUNCTION_GET_TEMPERATURE = 1;
BrickletTemperatureV2.FUNCTION_SET_TEMPERATURE_CALLBACK_CONFIGURATION = 2;
BrickletTemperatureV2.FUNCTION_GET_TEMPERATURE_CALLBACK_CONFIGURATION = 3;
BrickletTemperatureV2.FUNCTION_SET_HEATER_CONFIGURATION = 5;
BrickletTemperatureV2.FUNCTION_GET_HEATER_CONFIGURATION = 6;
BrickletTemperatureV2.FUNCTION_GET_SPITFP_ERROR_COUNT = 234;
BrickletTemperatureV2.FUNCTION_SET_BOOTLOADER_MODE = 235;
BrickletTemperatureV2.FUNCTION_GET_BOOTLOADER_MODE = 236;
BrickletTemperatureV2.FUNCTION_SET_WRITE_FIRMWARE_POINTER = 237;
BrickletTemperatureV2.FUNCTION_WRITE_FIRMWARE = 238;
BrickletTemperatureV2.FUNCTION_SET_STATUS_LED_CONFIG = 239;
BrickletTemperatureV2.FUNCTION_GET_STATUS_LED_CONFIG = 240;
BrickletTemperatureV2.FUNCTION_GET_CHIP_TEMPERATURE = 242;
BrickletTemperatureV2.FUNCTION_RESET = 243;
BrickletTemperatureV2.FUNCTION_WRITE_UID = 248;
BrickletTemperatureV2.FUNCTION_READ_UID = 249;
BrickletTemperatureV2.FUNCTION_GET_IDENTITY = 255;
BrickletTemperatureV2.THRESHOLD_OPTION_OFF = 'x';
BrickletTemperatureV2.THRESHOLD_OPTION_OUTSIDE = 'o';
BrickletTemperatureV2.THRESHOLD_OPTION_INSIDE = 'i';
BrickletTemperatureV2.THRESHOLD_OPTION_SMALLER = '<';
BrickletTemperatureV2.THRESHOLD_OPTION_GREATER = '>';
BrickletTemperatureV2.HEATER_CONFIG_DISABLED = 0;
BrickletTemperatureV2.HEATER_CONFIG_ENABLED = 1;
BrickletTemperatureV2.BOOTLOADER_MODE_BOOTLOADER = 0;
BrickletTemperatureV2.BOOTLOADER_MODE_FIRMWARE = 1;
BrickletTemperatureV2.BOOTLOADER_MODE_BOOTLOADER_WAIT_FOR_REBOOT = 2;
BrickletTemperatureV2.BOOTLOADER_MODE_FIRMWARE_WAIT_FOR_REBOOT = 3;
BrickletTemperatureV2.BOOTLOADER_MODE_FIRMWARE_WAIT_FOR_ERASE_AND_REBOOT = 4;
BrickletTemperatureV2.BOOTLOADER_STATUS_OK = 0;
BrickletTemperatureV2.BOOTLOADER_STATUS_INVALID_MODE = 1;
BrickletTemperatureV2.BOOTLOADER_STATUS_NO_CHANGE = 2;
BrickletTemperatureV2.BOOTLOADER_STATUS_ENTRY_FUNCTION_NOT_PRESENT = 3;
BrickletTemperatureV2.BOOTLOADER_STATUS_DEVICE_IDENTIFIER_INCORRECT = 4;
BrickletTemperatureV2.BOOTLOADER_STATUS_CRC_MISMATCH = 5;
BrickletTemperatureV2.STATUS_LED_CONFIG_OFF = 0;
BrickletTemperatureV2.STATUS_LED_CONFIG_ON = 1;
BrickletTemperatureV2.STATUS_LED_CONFIG_SHOW_HEARTBEAT = 2;
BrickletTemperatureV2.STATUS_LED_CONFIG_SHOW_STATUS = 3;
