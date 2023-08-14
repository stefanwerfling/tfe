import {Device, TFAnyFunction, TFErrorCallback, TFCallDevice} from './Device.js';
import {IPConnection} from './IPConnection.js';

/**
 * BrickletRS485
 */
export class BrickletRS485 extends Device {

    public static DEVICE_IDENTIFIER = 277;
    public static DEVICE_DISPLAY_NAME = 'RS485 Bricklet';
    public static CALLBACK_READ_LOW_LEVEL = 41;
    public static CALLBACK_ERROR_COUNT = 42;
    public static CALLBACK_MODBUS_SLAVE_READ_COILS_REQUEST = 43;
    public static CALLBACK_MODBUS_MASTER_READ_COILS_RESPONSE_LOW_LEVEL = 44;
    public static CALLBACK_MODBUS_SLAVE_READ_HOLDING_REGISTERS_REQUEST = 45;
    public static CALLBACK_MODBUS_MASTER_READ_HOLDING_REGISTERS_RESPONSE_LOW_LEVEL = 46;
    public static CALLBACK_MODBUS_SLAVE_WRITE_SINGLE_COIL_REQUEST = 47;
    public static CALLBACK_MODBUS_MASTER_WRITE_SINGLE_COIL_RESPONSE = 48;
    public static CALLBACK_MODBUS_SLAVE_WRITE_SINGLE_REGISTER_REQUEST = 49;
    public static CALLBACK_MODBUS_MASTER_WRITE_SINGLE_REGISTER_RESPONSE = 50;
    public static CALLBACK_MODBUS_SLAVE_WRITE_MULTIPLE_COILS_REQUEST_LOW_LEVEL = 51;
    public static CALLBACK_MODBUS_MASTER_WRITE_MULTIPLE_COILS_RESPONSE = 52;
    public static CALLBACK_MODBUS_SLAVE_WRITE_MULTIPLE_REGISTERS_REQUEST_LOW_LEVEL = 53;
    public static CALLBACK_MODBUS_MASTER_WRITE_MULTIPLE_REGISTERS_RESPONSE = 54;
    public static CALLBACK_MODBUS_SLAVE_READ_DISCRETE_INPUTS_REQUEST = 55;
    public static CALLBACK_MODBUS_MASTER_READ_DISCRETE_INPUTS_RESPONSE_LOW_LEVEL = 56;
    public static CALLBACK_MODBUS_SLAVE_READ_INPUT_REGISTERS_REQUEST = 57;
    public static CALLBACK_MODBUS_MASTER_READ_INPUT_REGISTERS_RESPONSE_LOW_LEVEL = 58;
    public static CALLBACK_FRAME_READABLE = 61;
    public static CALLBACK_READ = -41;
    public static CALLBACK_MODBUS_MASTER_READ_COILS_RESPONSE = -44;
    public static CALLBACK_MODBUS_MASTER_READ_HOLDING_REGISTERS_RESPONSE = -46;
    public static CALLBACK_MODBUS_SLAVE_WRITE_MULTIPLE_COILS_REQUEST = -51;
    public static CALLBACK_MODBUS_SLAVE_WRITE_MULTIPLE_REGISTERS_REQUEST = -53;
    public static CALLBACK_MODBUS_MASTER_READ_DISCRETE_INPUTS_RESPONSE = -56;
    public static CALLBACK_MODBUS_MASTER_READ_INPUT_REGISTERS_RESPONSE = -58;
    public static FUNCTION_WRITE_LOW_LEVEL = 1;
    public static FUNCTION_READ_LOW_LEVEL = 2;
    public static FUNCTION_ENABLE_READ_CALLBACK = 3;
    public static FUNCTION_DISABLE_READ_CALLBACK = 4;
    public static FUNCTION_IS_READ_CALLBACK_ENABLED = 5;
    public static FUNCTION_SET_RS485_CONFIGURATION = 6;
    public static FUNCTION_GET_RS485_CONFIGURATION = 7;
    public static FUNCTION_SET_MODBUS_CONFIGURATION = 8;
    public static FUNCTION_GET_MODBUS_CONFIGURATION = 9;
    public static FUNCTION_SET_MODE = 10;
    public static FUNCTION_GET_MODE = 11;
    public static FUNCTION_SET_COMMUNICATION_LED_CONFIG = 12;
    public static FUNCTION_GET_COMMUNICATION_LED_CONFIG = 13;
    public static FUNCTION_SET_ERROR_LED_CONFIG = 14;
    public static FUNCTION_GET_ERROR_LED_CONFIG = 15;
    public static FUNCTION_SET_BUFFER_CONFIG = 16;
    public static FUNCTION_GET_BUFFER_CONFIG = 17;
    public static FUNCTION_GET_BUFFER_STATUS = 18;
    public static FUNCTION_ENABLE_ERROR_COUNT_CALLBACK = 19;
    public static FUNCTION_DISABLE_ERROR_COUNT_CALLBACK = 20;
    public static FUNCTION_IS_ERROR_COUNT_CALLBACK_ENABLED = 21;
    public static FUNCTION_GET_ERROR_COUNT = 22;
    public static FUNCTION_GET_MODBUS_COMMON_ERROR_COUNT = 23;
    public static FUNCTION_MODBUS_SLAVE_REPORT_EXCEPTION = 24;
    public static FUNCTION_MODBUS_SLAVE_ANSWER_READ_COILS_REQUEST_LOW_LEVEL = 25;
    public static FUNCTION_MODBUS_MASTER_READ_COILS = 26;
    public static FUNCTION_MODBUS_SLAVE_ANSWER_READ_HOLDING_REGISTERS_REQUEST_LOW_LEVEL = 27;
    public static FUNCTION_MODBUS_MASTER_READ_HOLDING_REGISTERS = 28;
    public static FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_SINGLE_COIL_REQUEST = 29;
    public static FUNCTION_MODBUS_MASTER_WRITE_SINGLE_COIL = 30;
    public static FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_SINGLE_REGISTER_REQUEST = 31;
    public static FUNCTION_MODBUS_MASTER_WRITE_SINGLE_REGISTER = 32;
    public static FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_MULTIPLE_COILS_REQUEST = 33;
    public static FUNCTION_MODBUS_MASTER_WRITE_MULTIPLE_COILS_LOW_LEVEL = 34;
    public static FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_MULTIPLE_REGISTERS_REQUEST = 35;
    public static FUNCTION_MODBUS_MASTER_WRITE_MULTIPLE_REGISTERS_LOW_LEVEL = 36;
    public static FUNCTION_MODBUS_SLAVE_ANSWER_READ_DISCRETE_INPUTS_REQUEST_LOW_LEVEL = 37;
    public static FUNCTION_MODBUS_MASTER_READ_DISCRETE_INPUTS = 38;
    public static FUNCTION_MODBUS_SLAVE_ANSWER_READ_INPUT_REGISTERS_REQUEST_LOW_LEVEL = 39;
    public static FUNCTION_MODBUS_MASTER_READ_INPUT_REGISTERS = 40;
    public static FUNCTION_SET_FRAME_READABLE_CALLBACK_CONFIGURATION = 59;
    public static FUNCTION_GET_FRAME_READABLE_CALLBACK_CONFIGURATION = 60;
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
    public static PARITY_NONE = 0;
    public static PARITY_ODD = 1;
    public static PARITY_EVEN = 2;
    public static STOPBITS_1 = 1;
    public static STOPBITS_2 = 2;
    public static WORDLENGTH_5 = 5;
    public static WORDLENGTH_6 = 6;
    public static WORDLENGTH_7 = 7;
    public static WORDLENGTH_8 = 8;
    public static DUPLEX_HALF = 0;
    public static DUPLEX_FULL = 1;
    public static MODE_RS485 = 0;
    public static MODE_MODBUS_MASTER_RTU = 1;
    public static MODE_MODBUS_SLAVE_RTU = 2;
    public static COMMUNICATION_LED_CONFIG_OFF = 0;
    public static COMMUNICATION_LED_CONFIG_ON = 1;
    public static COMMUNICATION_LED_CONFIG_SHOW_HEARTBEAT = 2;
    public static COMMUNICATION_LED_CONFIG_SHOW_COMMUNICATION = 3;
    public static ERROR_LED_CONFIG_OFF = 0;
    public static ERROR_LED_CONFIG_ON = 1;
    public static ERROR_LED_CONFIG_SHOW_HEARTBEAT = 2;
    public static ERROR_LED_CONFIG_SHOW_ERROR = 3;
    public static EXCEPTION_CODE_TIMEOUT = -1;
    public static EXCEPTION_CODE_SUCCESS = 0;
    public static EXCEPTION_CODE_ILLEGAL_FUNCTION = 1;
    public static EXCEPTION_CODE_ILLEGAL_DATA_ADDRESS = 2;
    public static EXCEPTION_CODE_ILLEGAL_DATA_VALUE = 3;
    public static EXCEPTION_CODE_SLAVE_DEVICE_FAILURE = 4;
    public static EXCEPTION_CODE_ACKNOWLEDGE = 5;
    public static EXCEPTION_CODE_SLAVE_DEVICE_BUSY = 6;
    public static EXCEPTION_CODE_MEMORY_PARITY_ERROR = 8;
    public static EXCEPTION_CODE_GATEWAY_PATH_UNAVAILABLE = 10;
    public static EXCEPTION_CODE_GATEWAY_TARGET_DEVICE_FAILED_TO_RESPOND = 11;
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
        super(uid, ipcon, BrickletRS485.DEVICE_IDENTIFIER, BrickletRS485.DEVICE_DISPLAY_NAME);

        this.APIVersion = [2, 0, 1];
        this.responseExpected[BrickletRS485.FUNCTION_WRITE_LOW_LEVEL] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_READ_LOW_LEVEL] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_ENABLE_READ_CALLBACK] = Device.RESPONSE_EXPECTED_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_DISABLE_READ_CALLBACK] = Device.RESPONSE_EXPECTED_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_IS_READ_CALLBACK_ENABLED] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_SET_RS485_CONFIGURATION] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_RS485_CONFIGURATION] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_SET_MODBUS_CONFIGURATION] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_MODBUS_CONFIGURATION] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_SET_MODE] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_MODE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_SET_COMMUNICATION_LED_CONFIG] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_COMMUNICATION_LED_CONFIG] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_SET_ERROR_LED_CONFIG] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_ERROR_LED_CONFIG] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_SET_BUFFER_CONFIG] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_BUFFER_CONFIG] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_BUFFER_STATUS] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_ENABLE_ERROR_COUNT_CALLBACK] = Device.RESPONSE_EXPECTED_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_DISABLE_ERROR_COUNT_CALLBACK] = Device.RESPONSE_EXPECTED_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_IS_ERROR_COUNT_CALLBACK_ENABLED] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_ERROR_COUNT] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_MODBUS_COMMON_ERROR_COUNT] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_SLAVE_REPORT_EXCEPTION] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_COILS_REQUEST_LOW_LEVEL] = Device.RESPONSE_EXPECTED_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_MASTER_READ_COILS] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_HOLDING_REGISTERS_REQUEST_LOW_LEVEL] = Device.RESPONSE_EXPECTED_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_MASTER_READ_HOLDING_REGISTERS] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_SINGLE_COIL_REQUEST] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_MASTER_WRITE_SINGLE_COIL] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_SINGLE_REGISTER_REQUEST] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_MASTER_WRITE_SINGLE_REGISTER] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_MULTIPLE_COILS_REQUEST] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_MASTER_WRITE_MULTIPLE_COILS_LOW_LEVEL] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_MULTIPLE_REGISTERS_REQUEST] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_MASTER_WRITE_MULTIPLE_REGISTERS_LOW_LEVEL] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_DISCRETE_INPUTS_REQUEST_LOW_LEVEL] = Device.RESPONSE_EXPECTED_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_MASTER_READ_DISCRETE_INPUTS] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_INPUT_REGISTERS_REQUEST_LOW_LEVEL] = Device.RESPONSE_EXPECTED_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_MODBUS_MASTER_READ_INPUT_REGISTERS] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_SET_FRAME_READABLE_CALLBACK_CONFIGURATION] = Device.RESPONSE_EXPECTED_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_FRAME_READABLE_CALLBACK_CONFIGURATION] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_SPITFP_ERROR_COUNT] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_SET_BOOTLOADER_MODE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_BOOTLOADER_MODE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_SET_WRITE_FIRMWARE_POINTER] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_WRITE_FIRMWARE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_SET_STATUS_LED_CONFIG] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_STATUS_LED_CONFIG] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_CHIP_TEMPERATURE] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_RESET] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_WRITE_UID] = Device.RESPONSE_EXPECTED_FALSE;
        this.responseExpected[BrickletRS485.FUNCTION_READ_UID] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.responseExpected[BrickletRS485.FUNCTION_GET_IDENTITY] = Device.RESPONSE_EXPECTED_ALWAYS_TRUE;
        this.callbackFormats[BrickletRS485.CALLBACK_READ_LOW_LEVEL] = [72, 'H H c60'];
        this.callbackFormats[BrickletRS485.CALLBACK_ERROR_COUNT] = [16, 'I I'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_SLAVE_READ_COILS_REQUEST] = [15, 'B I H'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_MASTER_READ_COILS_RESPONSE_LOW_LEVEL] = [72, 'B b H H ?464'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_SLAVE_READ_HOLDING_REGISTERS_REQUEST] = [15, 'B I H'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_MASTER_READ_HOLDING_REGISTERS_RESPONSE_LOW_LEVEL] = [72, 'B b H H H29'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_SLAVE_WRITE_SINGLE_COIL_REQUEST] = [14, 'B I ?'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_MASTER_WRITE_SINGLE_COIL_RESPONSE] = [10, 'B b'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_SLAVE_WRITE_SINGLE_REGISTER_REQUEST] = [15, 'B I H'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_MASTER_WRITE_SINGLE_REGISTER_RESPONSE] = [10, 'B b'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_SLAVE_WRITE_MULTIPLE_COILS_REQUEST_LOW_LEVEL] = [72, 'B I H H ?440'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_MASTER_WRITE_MULTIPLE_COILS_RESPONSE] = [10, 'B b'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_SLAVE_WRITE_MULTIPLE_REGISTERS_REQUEST_LOW_LEVEL] = [71, 'B I H H H27'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_MASTER_WRITE_MULTIPLE_REGISTERS_RESPONSE] = [10, 'B b'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_SLAVE_READ_DISCRETE_INPUTS_REQUEST] = [15, 'B I H'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_MASTER_READ_DISCRETE_INPUTS_RESPONSE_LOW_LEVEL] = [72, 'B b H H ?464'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_SLAVE_READ_INPUT_REGISTERS_REQUEST] = [15, 'B I H'];
        this.callbackFormats[BrickletRS485.CALLBACK_MODBUS_MASTER_READ_INPUT_REGISTERS_RESPONSE_LOW_LEVEL] = [72, 'B b H H H29'];
        this.callbackFormats[BrickletRS485.CALLBACK_FRAME_READABLE] = [10, 'H'];

        this.highLevelCallbacks[BrickletRS485.CALLBACK_READ] = [
            ['streamLength', 'streamChunkOffset', 'streamChunkData'],
            {
                fixedLength: null,
                singleChunk: false
            }, null
        ];

        this.highLevelCallbacks[BrickletRS485.CALLBACK_MODBUS_MASTER_READ_COILS_RESPONSE] = [
            [null, null, 'streamLength', 'streamChunkOffset', 'streamChunkData'],
            {
                fixedLength: null,
                singleChunk: false
            }, null
        ];

        this.highLevelCallbacks[BrickletRS485.CALLBACK_MODBUS_MASTER_READ_HOLDING_REGISTERS_RESPONSE] = [
            [null, null, 'streamLength', 'streamChunkOffset', 'streamChunkData'],
            {
                fixedLength: null,
                singleChunk: false
            },
            null
        ];
        this.highLevelCallbacks[BrickletRS485.CALLBACK_MODBUS_SLAVE_WRITE_MULTIPLE_COILS_REQUEST] = [
            [null, null, 'streamLength', 'streamChunkOffset', 'streamChunkData'],
            {
                fixedLength: null,
                singleChunk: false
            },
            null
        ];
        this.highLevelCallbacks[BrickletRS485.CALLBACK_MODBUS_SLAVE_WRITE_MULTIPLE_REGISTERS_REQUEST] = [
            [null, null, 'streamLength', 'streamChunkOffset', 'streamChunkData'],
            {
                fixedLength: null,
                singleChunk: false
            },
            null
        ];

        this.highLevelCallbacks[BrickletRS485.CALLBACK_MODBUS_MASTER_READ_DISCRETE_INPUTS_RESPONSE] = [
            [null, null, 'streamLength', 'streamChunkOffset', 'streamChunkData'],
            {
                fixedLength: null,
                singleChunk: false
            },
            null
        ];

        this.highLevelCallbacks[BrickletRS485.CALLBACK_MODBUS_MASTER_READ_INPUT_REGISTERS_RESPONSE] = [
            [null, null, 'streamLength', 'streamChunkOffset', 'streamChunkData'],
            {
                fixedLength: null,
                singleChunk: false
            },
            null
        ];

        this.streamStateObjects[BrickletRS485.FUNCTION_WRITE_LOW_LEVEL] = {
            dataMapping: ['streamChunkWritten'],
            dataMappingStreamIn: ['streamLength', 'streamChunkOffset', 'streamChunkData'],
            streamProperties: {
                fixedLength: null,
                singleChunk: false,
                shortWrite: true
            },
            responseProperties: {
                running: false,
                runningSubcall: false,
                runningSubcallOOS: false,
                waitingFirstChunk: true,
                timeout: null,
                data: [],
                streamInChunkOffset: 0,
                streamInChunkLength: 0,
                streamInResponseEmpty: false,
                streamInWritten: 0,
                streamInLLParams: null,
                responseHandler: null,
                packFormatString: 'H H c60',
                unpackFormatString: 'B',
                returnCB: undefined,
                errorCB: undefined,
                callQueue: []
            }
        };

        this.streamStateObjects[BrickletRS485.FUNCTION_READ_LOW_LEVEL] = {
            dataMapping: ['streamLength', 'streamChunkOffset', 'streamChunkData'],
            dataMappingStreamIn: [],
            streamProperties: {
                fixedLength: null,
                singleChunk: false,
                shortWrite: false
            },
            responseProperties: {
                running: false,
                runningSubcall: false,
                runningSubcallOOS: false,
                waitingFirstChunk: true,
                timeout: null,
                data: [],
                streamInChunkOffset: 0,
                streamInChunkLength: 0,
                streamInResponseEmpty: true,
                streamInWritten: 0,
                streamInLLParams: null,
                responseHandler: null,
                packFormatString: 'H',
                unpackFormatString: 'H H c60',
                returnCB: undefined,
                errorCB: undefined,
                callQueue: []
            }
        };
        this.streamStateObjects[BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_COILS_REQUEST_LOW_LEVEL] = {
            dataMapping: [],
            dataMappingStreamIn: [null, 'streamLength', 'streamChunkOffset', 'streamChunkData'],
            streamProperties: {
                fixedLength: null,
                singleChunk: false,
                shortWrite: false
            },
            responseProperties: {
                running: false,
                runningSubcall: false,
                runningSubcallOOS: false,
                waitingFirstChunk: true,
                timeout: null,
                data: [],
                streamInChunkOffset: 0,
                streamInChunkLength: 0,
                streamInResponseEmpty: true,
                streamInWritten: 0,
                streamInLLParams: null,
                responseHandler: null,
                packFormatString: 'B H H ?472',
                unpackFormatString: '',
                returnCB: undefined,
                errorCB: undefined,
                callQueue: []
            }
        };

        this.streamStateObjects[BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_HOLDING_REGISTERS_REQUEST_LOW_LEVEL] = {
            dataMapping: [],
            dataMappingStreamIn: [null, 'streamLength', 'streamChunkOffset', 'streamChunkData'],
            streamProperties: {
                fixedLength: null,
                singleChunk: false,
                shortWrite: false
            },
            responseProperties: {
                running: false,
                runningSubcall: false,
                runningSubcallOOS: false,
                waitingFirstChunk: true,
                timeout: null,
                data: [],
                streamInChunkOffset: 0,
                streamInChunkLength: 0,
                streamInResponseEmpty: true,
                streamInWritten: 0,
                streamInLLParams: null,
                responseHandler: null,
                packFormatString: 'B H H H29',
                unpackFormatString: '',
                returnCB: undefined,
                errorCB: undefined,
                callQueue: []
            }
        };

        this.streamStateObjects[BrickletRS485.FUNCTION_MODBUS_MASTER_WRITE_MULTIPLE_COILS_LOW_LEVEL] = {
            dataMapping: [null],
            dataMappingStreamIn: [null, null, 'streamLength', 'streamChunkOffset', 'streamChunkData'],
            streamProperties: {
                fixedLength: null,
                singleChunk: false,
                shortWrite: false
            },
            responseProperties: {
                running: false,
                runningSubcall: false,
                runningSubcallOOS: false,
                waitingFirstChunk: true,
                timeout: null,
                data: [],
                streamInChunkOffset: 0,
                streamInChunkLength: 0,
                streamInResponseEmpty: false,
                streamInWritten: 0,
                streamInLLParams: null,
                responseHandler: null,
                packFormatString: 'B I H H ?440',
                unpackFormatString: 'B',
                returnCB: undefined,
                errorCB: undefined,
                callQueue: []
            }
        };

        this.streamStateObjects[BrickletRS485.FUNCTION_MODBUS_MASTER_WRITE_MULTIPLE_REGISTERS_LOW_LEVEL] = {
            dataMapping: [null],
            dataMappingStreamIn: [null, null, 'streamLength', 'streamChunkOffset', 'streamChunkData'],
            streamProperties: {
                fixedLength: null,
                singleChunk: false,
                shortWrite: false
            },
            responseProperties: {
                running: false,
                runningSubcall: false,
                runningSubcallOOS: false,
                waitingFirstChunk: true,
                timeout: null,
                data: [],
                streamInChunkOffset: 0,
                streamInChunkLength: 0,
                streamInResponseEmpty: false,
                streamInWritten: 0,
                streamInLLParams: null,
                responseHandler: null,
                packFormatString: 'B I H H H27',
                unpackFormatString: 'B',
                returnCB: undefined,
                errorCB: undefined,
                callQueue: []
            }
        };

        this.streamStateObjects[BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_DISCRETE_INPUTS_REQUEST_LOW_LEVEL] = {
            dataMapping: [],
            dataMappingStreamIn: [null, 'streamLength', 'streamChunkOffset', 'streamChunkData'],
            streamProperties: {
                fixedLength: null,
                singleChunk: false,
                shortWrite: false
            },
            responseProperties: {
                running: false,
                runningSubcall: false,
                runningSubcallOOS: false,
                waitingFirstChunk: true,
                timeout: null,
                data: [],
                streamInChunkOffset: 0,
                streamInChunkLength: 0,
                streamInResponseEmpty: true,
                streamInWritten: 0,
                streamInLLParams: null,
                responseHandler: null,
                packFormatString: 'B H H ?472',
                unpackFormatString: '',
                returnCB: undefined,
                errorCB: undefined,
                callQueue: []
            }
        };

        this.streamStateObjects[BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_INPUT_REGISTERS_REQUEST_LOW_LEVEL] = {
            dataMapping: [],
            dataMappingStreamIn: [null, 'streamLength', 'streamChunkOffset', 'streamChunkData'],
            streamProperties: {
                fixedLength: null,
                singleChunk: false,
                shortWrite: false
            },
            responseProperties: {
                running: false,
                runningSubcall: false,
                runningSubcallOOS: false,
                waitingFirstChunk: true,
                timeout: null,
                data: [],
                streamInChunkOffset: 0,
                streamInChunkLength: 0,
                streamInResponseEmpty: true,
                streamInWritten: 0,
                streamInLLParams: null,
                responseHandler: null,
                packFormatString: 'B H H H29',
                unpackFormatString: '',
                returnCB: undefined,
                errorCB: undefined,
                callQueue: []
            }
        };

        this.ipcon.addDevice(this);
    }

    /**
     * writeLowLevel
     * @param messageLength
     * @param messageChunkOffset
     * @param messageChunkData
     * @param returnCallback
     * @param errorCallback
     */
    public writeLowLevel(
        messageLength: number,
        messageChunkOffset: number,
        messageChunkData: string,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * Writes characters to the RS485 interface. The characters can be binary data,
         * ASCII or similar is not necessary.
         *
         * The return value is the number of characters that were written.
         * See :func:`Set RS485 Configuration` for configuration possibilities
         * regarding baudrate, parity and so on.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_WRITE_LOW_LEVEL,
            [messageLength, messageChunkOffset, messageChunkData],
            'H H c60',
            9,
            'B',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * readLowLevel
     * @param length
     * @param returnCallback
     * @param errorCallback
     */
    public readLowLevel(length: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns up to *length* characters from receive buffer.
         *
         * Instead of polling with this function, you can also use
         * callbacks. But note that this function will return available
         * data only when the read callback is disabled.
         * See :func:`Enable Read Callback` and :cb:`Read` callback.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_READ_LOW_LEVEL,
            [length],
            'H',
            72,
            'H H c60',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * enableReadCallback
     * @param returnCallback
     * @param errorCallback
     */
    public enableReadCallback(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Enables the :cb:`Read` callback. This will disable the :cb:`Frame Readable` callback.
         * By default the callback is disabled.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_ENABLE_READ_CALLBACK,
            [],
            '',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * disableReadCallback
     * @param returnCallback
     * @param errorCallback
     */
    public disableReadCallback(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Disables the :cb:`Read` callback.
         *
         * By default the callback is disabled.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_DISABLE_READ_CALLBACK,
            [],
            '',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * isReadCallbackEnabled
     * @param returnCallback
     * @param errorCallback
     */
    public isReadCallbackEnabled(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns *true* if the :cb:`Read` callback is enabled,
         * *false* otherwise.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_IS_READ_CALLBACK_ENABLED,
            [],
            '',
            9,
            '?',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * setRS485Configuration
     * @param baudrate
     * @param parity
     * @param stopbits
     * @param wordlength
     * @param duplex
     * @param returnCallback
     * @param errorCallback
     */
    public setRS485Configuration(
        baudrate: number,
        parity: number,
        stopbits: number,
        wordlength: number,
        duplex: number,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * Sets the configuration for the RS485 communication.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_SET_RS485_CONFIGURATION,
            [baudrate, parity, stopbits, wordlength, duplex],
            'I B B B B',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * getRS485Configuration
     * @param returnCallback
     * @param errorCallback
     */
    public getRS485Configuration(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the configuration as set by :func:`Set RS485 Configuration`.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_GET_RS485_CONFIGURATION,
            [],
            '',
            16,
            'I B B B B',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * setModbusConfiguration
     * @param slaveAddress
     * @param masterRequestTimeout
     * @param returnCallback
     * @param errorCallback
     */
    public setModbusConfiguration(slaveAddress: number, masterRequestTimeout: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Sets the configuration for the RS485 Modbus communication. Available options:
         * Slave Address: Address to be used as the Modbus slave address in Modbus slave mode. Valid Modbus slave address range is 1 to 247.
         * Master Request Timeout: Specifies how long the master should wait for a response from a slave when in Modbus master mode.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_SET_MODBUS_CONFIGURATION,
            [slaveAddress, masterRequestTimeout],
            'B I',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * getModbusConfiguration
     * @param returnCallback
     * @param errorCallback
     */
    public getModbusConfiguration(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the configuration as set by :func:`Set Modbus Configuration`.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_GET_MODBUS_CONFIGURATION,
            [],
            '',
            13,
            'B I',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * setMode
     * @param mode
     * @param returnCallback
     * @param errorCallback
     */
    public setMode(mode: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Sets the mode of the Bricklet in which it operates. Available options are
         *
         * RS485
         * Modbus Master RTU and
         * Modbus Slave RTU.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_SET_MODE,
            [mode],
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
     * getMode
     * @param returnCallback
     * @param errorCallback
     */
    public getMode(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the configuration as set by :func:`Set Mode`.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_GET_MODE,
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

    /**
     * setCommunicationLEDConfig
     * @param config
     * @param returnCallback
     * @param errorCallback
     */
    public setCommunicationLEDConfig(config: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Sets the communication LED configuration. By default the LED shows RS485
         * communication traffic by flickering.
         *
         * You can also turn the LED permanently on/off or show a heartbeat.
         *
         * If the Bricklet is in bootloader mode, the LED is off.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_SET_COMMUNICATION_LED_CONFIG,
            [config],
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
     * getCommunicationLEDConfig
     * @param returnCallback
     * @param errorCallback
     */
    public getCommunicationLEDConfig(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the configuration as set by :func:`Set Communication LED Config`
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_GET_COMMUNICATION_LED_CONFIG,
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

    /**
     * setErrorLEDConfig
     * @param config
     * @param returnCallback
     * @param errorCallback
     */
    public setErrorLEDConfig(config: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Sets the error LED configuration.
         *
         * By default the error LED turns on if there is any error (see :cb:`Error Count`
         * callback). If you call this function with the SHOW ERROR option again, the LED
         * will turn off until the next error occurs.
         *
         * You can also turn the LED permanently on/off or show a heartbeat.
         *
         * If the Bricklet is in bootloader mode, the LED is off.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_SET_ERROR_LED_CONFIG,
            [config],
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
     * getErrorLEDConfig
     * @param returnCallback
     * @param errorCallback
     */
    public getErrorLEDConfig(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the configuration as set by :func:`Set Error LED Config`.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_GET_ERROR_LED_CONFIG,
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

    /**
     * setBufferConfig
     * @param sendBufferSize
     * @param receiveBufferSize
     * @param returnCallback
     * @param errorCallback
     */
    public setBufferConfig(sendBufferSize: number, receiveBufferSize: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Sets the send and receive buffer size in byte. In sum there is
         * 10240 byte (10KiB) buffer available and the minimum buffer size
         * is 1024 byte (1KiB) for both.
         *
         * The current buffer content is lost if this function is called.
         *
         * The send buffer holds data that was given by :func:`Write` and
         * could not be written yet. The receive buffer holds data that is
         * received through RS485 but could not yet be send to the
         * user, either by :func:`Read` or through :cb:`Read` callback.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_SET_BUFFER_CONFIG,
            [sendBufferSize, receiveBufferSize],
            'H H',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * getBufferConfig
     * @param returnCallback
     * @param errorCallback
     */
    public getBufferConfig(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the buffer configuration as set by :func:`Set Buffer Config`.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_GET_BUFFER_CONFIG,
            [],
            '',
            12,
            'H H',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * getBufferStatus
     * @param returnCallback
     * @param errorCallback
     */
    public getBufferStatus(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the currently used bytes for the send and received buffer.
         *
         * See :func:`Set Buffer Config` for buffer size configuration.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_GET_BUFFER_STATUS,
            [],
            '',
            12,
            'H H',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * enableErrorCountCallback
     * @param returnCallback
     * @param errorCallback
     */
    public enableErrorCountCallback(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Enables the :cb:`Error Count` callback.
         *
         * By default the callback is disabled.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_ENABLE_ERROR_COUNT_CALLBACK,
            [],
            '',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * disableErrorCountCallback
     * @param returnCallback
     * @param errorCallback
     */
    public disableErrorCountCallback(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Disables the :cb:`Error Count` callback.
         *
         * By default the callback is disabled.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_DISABLE_ERROR_COUNT_CALLBACK,
            [],
            '',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * isErrorCountCallbackEnabled
     * @param returnCallback
     * @param errorCallback
     */
    public isErrorCountCallbackEnabled(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns *true* if the :cb:`Error Count` callback is enabled,
         * *false* otherwise.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_IS_ERROR_COUNT_CALLBACK_ENABLED,
            [],
            '',
            9,
            '?',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * getErrorCount
     * @param returnCallback
     * @param errorCallback
     */
    public getErrorCount(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the current number of overrun and parity errors.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_GET_ERROR_COUNT,
            [],
            '',
            16,
            'I I',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * getModbusCommonErrorCount
     * @param returnCallback
     * @param errorCallback
     */
    public getModbusCommonErrorCount(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the current number of errors occurred in Modbus mode.
         *
         * * Timeout Error Count: Number of timeouts occurred.
         * * Checksum Error Count: Number of failures due to Modbus frame CRC16 checksum mismatch.
         * * Frame Too Big Error Count: Number of times frames were rejected because they exceeded maximum Modbus frame size which is 256 bytes.
         * * Illegal Function Error Count: Number of errors when an unimplemented or illegal function is requested. This corresponds to Modbus exception code 1.
         * * Illegal Data Address Error Count: Number of errors due to invalid data address. This corresponds to Modbus exception code 2.
         * * Illegal Data Value Error Count: Number of errors due to invalid data value. This corresponds to Modbus exception code 3.
         * * Slave Device Failure Error Count: Number of errors occurred on the slave device which were unrecoverable. This corresponds to Modbus exception code 4.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_GET_MODBUS_COMMON_ERROR_COUNT,
            [],
            '',
            36,
            'I I I I I I I',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * modbusSlaveReportException
     * @param requestID
     * @param exceptionCode
     * @param returnCallback
     * @param errorCallback
     */
    public modbusSlaveReportException(requestID: number, exceptionCode: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * In Modbus slave mode this function can be used to report a Modbus exception for
         * a Modbus master request.
         *
         * * Request ID: Request ID of the request received by the slave.
         * * Exception Code: Modbus exception code to report to the Modbus master.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_SLAVE_REPORT_EXCEPTION,
            [requestID, exceptionCode],
            'B b',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * modbusSlaveAnswerReadCoilsRequestLowLevel
     * @param requestID
     * @param coilsLength
     * @param coilsChunkOffset
     * @param coilsChunkData
     * @param returnCallback
     * @param errorCallback
     */
    public modbusSlaveAnswerReadCoilsRequestLowLevel(
        requestID: number,
        coilsLength: number,
        coilsChunkOffset: number,
        coilsChunkData: string,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus slave mode this function can be used to answer a master request to
         * read coils.
         *
         * * Request ID: Request ID of the corresponding request that is being answered.
         * * Coils: Data that is to be sent to the Modbus master for the corresponding request.
         *
         * This function must be called from the :cb:`Modbus Slave Read Coils Request` callback
         * with the Request ID as provided by the argument of the callback.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_COILS_REQUEST_LOW_LEVEL,
            [requestID, coilsLength, coilsChunkOffset, coilsChunkData],
            'B H H ?472',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * modbusMasterReadCoils
     * @param slaveAddress
     * @param startingAddress
     * @param count
     * @param returnCallback
     * @param errorCallback
     */
    public modbusMasterReadCoils(
        slaveAddress: number,
        startingAddress: number,
        count: number,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus master mode this function can be used to read coils from a slave. This
         * function creates a Modbus function code 1 request.
         *
         * * Slave Address: Address of the target Modbus slave.
         * * Starting Address: Number of the first coil to read. For backwards compatibility reasons this parameter is called Starting Address. It is not an address, but instead a coil number in the range of 1 to 65536.
         * * Count: Number of coils to read.
         *
         * Upon success the function will return a non-zero request ID which will represent
         * the current request initiated by the Modbus master. In case of failure the returned
         * request ID will be 0.
         *
         * When successful this function will also invoke the :cb:`Modbus Master Read Coils Response`
         * callback. In this callback the Request ID provided by the callback argument must be
         * matched with the Request ID returned from this function to verify that the callback
         * is indeed for a particular request.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_MASTER_READ_COILS,
            [slaveAddress, startingAddress, count],
            'B I H',
            9,
            'B',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * modbusSlaveAnswerReadHoldingRegistersRequestLowLevel
     * @param requestID
     * @param holdingRegistersLength
     * @param holdingRegistersChunkOffset
     * @param holdingRegistersChunkData
     * @param returnCallback
     * @param errorCallback
     */
    public modbusSlaveAnswerReadHoldingRegistersRequestLowLevel(
        requestID: number,
        holdingRegistersLength: number,
        holdingRegistersChunkOffset: number,
        holdingRegistersChunkData: any,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus slave mode this function can be used to answer a master request to
         * read holding registers.
         *
         * * Request ID: Request ID of the corresponding request that is being answered.
         * * Holding Registers: Data that is to be sent to the Modbus master for the corresponding request.
         *
         * This function must be called from the :cb:`Modbus Slave Read Holding Registers Request`
         * callback with the Request ID as provided by the argument of the callback.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_HOLDING_REGISTERS_REQUEST_LOW_LEVEL,
            [requestID, holdingRegistersLength, holdingRegistersChunkOffset, holdingRegistersChunkData],
            'B H H H29',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * modbusMasterReadHoldingRegisters
     * @param slaveAddress
     * @param startingAddress
     * @param count
     * @param returnCallback
     * @param errorCallback
     */
    public modbusMasterReadHoldingRegisters(
        slaveAddress: number,
        startingAddress: number,
        count: number,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus master mode this function can be used to read holding registers from a slave.
         * This function creates a Modbus function code 3 request.
         *
         * * Slave Address: Address of the target Modbus slave.
         * * Starting Address: Number of the first holding register to read. For backwards compatibility reasons this parameter is called Starting Address. It is not an address, but instead a holding register number in the range of 1 to 65536. The prefix digit 4 (for holding register) is implicit and must be omitted.
         * * Count: Number of holding registers to read.
         *
         * Upon success the function will return a non-zero request ID which will represent
         * the current request initiated by the Modbus master. In case of failure the returned
         * request ID will be 0.
         *
         * When successful this function will also invoke the :cb:`Modbus Master Read Holding Registers Response`
         * callback. In this callback the Request ID provided by the callback argument must be matched
         * with the Request ID returned from this function to verify that the callback is indeed for a
         * particular request.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_MASTER_READ_HOLDING_REGISTERS,
            [slaveAddress, startingAddress, count],
            'B I H',
            9,
            'B',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * modbusSlaveAnswerWriteSingleCoilRequest
     * @param requestID
     * @param returnCallback
     * @param errorCallback
     */
    public modbusSlaveAnswerWriteSingleCoilRequest(requestID: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * In Modbus slave mode this function can be used to answer a master request to
         * write a single coil.
         *
         * * Request ID: Request ID of the corresponding request that is being answered.
         *
         * This function must be called from the :cb:`Modbus Slave Write Single Coil Request`
         * callback with the Request ID as provided by the arguments of the callback.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_SINGLE_COIL_REQUEST,
            [requestID],
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
     * modbusMasterWriteSingleCoil
     * @param slaveAddress
     * @param coilAddress
     * @param coilValue
     * @param returnCallback
     * @param errorCallback
     */
    public modbusMasterWriteSingleCoil(
        slaveAddress: number,
        coilAddress: number,
        coilValue: number,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus master mode this function can be used to write a single coil of a slave.
         * This function creates a Modbus function code 5 request.
         *
         * * Slave Address: Address of the target Modbus slave.
         * * Coil Address: Number of the coil to be written. For backwards compatibility reasons, this parameter is called Starting Address. It is not an address, but instead a coil number in the range of 1 to 65536.
         * * Coil Value: Value to be written.
         *
         * Upon success the function will return a non-zero request ID which will represent
         * the current request initiated by the Modbus master. In case of failure the returned
         * request ID will be 0.
         *
         * When successful this function will also invoke the :cb:`Modbus Master Write Single Coil Response`
         * callback. In this callback the Request ID provided by the callback argument must be matched
         * with the Request ID returned from this function to verify that the callback is indeed for a
         * particular request.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_MASTER_WRITE_SINGLE_COIL,
            [slaveAddress, coilAddress, coilValue],
            'B I ?',
            9,
            'B',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * modbusSlaveAnswerWriteSingleRegisterRequest
     * @param requestID
     * @param returnCallback
     * @param errorCallback
     */
    public modbusSlaveAnswerWriteSingleRegisterRequest(
        requestID: number,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus slave mode this function can be used to answer a master request to
         * write a single register.
         *
         * * Request ID: Request ID of the corresponding request that is being answered.
         *
         * This function must be called from the :cb:`Modbus Slave Write Single Register Request`
         * callback with the Request ID, Register Address and Register Value as provided by
         * the arguments of the callback.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_SINGLE_REGISTER_REQUEST,
            [requestID],
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
     * modbusMasterWriteSingleRegister
     * @param slaveAddress
     * @param registerAddress
     * @param registerValue
     * @param returnCallback
     * @param errorCallback
     */
    public modbusMasterWriteSingleRegister(
        slaveAddress: number,
        registerAddress: number,
        registerValue: number,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus master mode this function can be used to write a single holding register of a
         * slave. This function creates a Modbus function code 6 request.
         *
         * * Slave Address: Address of the target Modbus slave.
         * * Register Address: Number of the holding register to be written. For backwards compatibility reasons, this parameter is called Starting Address. It is not an address, but instead a holding register number in the range of 1 to 65536. The prefix digit 4 (for holding register) is implicit and must be omitted.
         * * Register Value: Value to be written.
         *
         * Upon success the function will return a non-zero request ID which will represent
         * the current request initiated by the Modbus master. In case of failure the returned
         * request ID will be 0.
         *
         * When successful this function will also invoke the :cb:`Modbus Master Write Single Register Response`
         * callback. In this callback the Request ID provided by the callback argument must be matched
         * with the Request ID returned from this function to verify that the callback is indeed for a
         * particular request.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_MASTER_WRITE_SINGLE_REGISTER,
            [slaveAddress, registerAddress, registerValue],
            'B I H',
            9,
            'B',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * modbusSlaveAnswerWriteMultipleCoilsRequest
     * @param requestID
     * @param returnCallback
     * @param errorCallback
     */
    public modbusSlaveAnswerWriteMultipleCoilsRequest(
        requestID: number,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus slave mode this function can be used to answer a master request to
         * write multiple coils.
         *
         * * Request ID: Request ID of the corresponding request that is being answered.
         *
         * This function must be called from the :cb:`Modbus Slave Write Multiple Coils Request`
         * callback with the Request ID of the callback.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_MULTIPLE_COILS_REQUEST,
            [requestID],
            'B',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    public modbusMasterWriteMultipleCoilsLowLevel(
        slaveAddress: number,
        startingAddress: number,
        coilsLength: number,
        coilsChunkOffset: number,
        coilsChunkData: any,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus master mode this function can be used to write multiple coils of a slave.
         * This function creates a Modbus function code 15 request.
         *
         * * Slave Address: Address of the target Modbus slave.
         * * Starting Address: Number of the first coil to write. For backwards compatibility reasons, this parameter is called Starting Address.It is not an address, but instead a coil number in the range of 1 to 65536.
         *
         * Upon success the function will return a non-zero request ID which will represent
         * the current request initiated by the Modbus master. In case of failure the returned
         * request ID will be 0.
         *
         * When successful this function will also invoke the :cb:`Modbus Master Write Multiple Coils Response`
         * callback. In this callback the Request ID provided by the callback argument must be matched
         * with the Request ID returned from this function to verify that the callback is indeed for a
         * particular request.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_MASTER_WRITE_MULTIPLE_COILS_LOW_LEVEL,
            [slaveAddress, startingAddress, coilsLength, coilsChunkOffset, coilsChunkData],
            'B I H H ?440',
            9,
            'B',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * modbusSlaveAnswerWriteMultipleRegistersRequest
     * @param requestID
     * @param returnCallback
     * @param errorCallback
     */
    public modbusSlaveAnswerWriteMultipleRegistersRequest(
        requestID: number,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus slave mode this function can be used to answer a master request to
         * write multiple registers.
         *
         * * Request ID: Request ID of the corresponding request that is being answered.
         *
         * This function must be called from the :cb:`Modbus Slave Write Multiple Registers Request`
         * callback with the Request ID of the callback.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_MULTIPLE_REGISTERS_REQUEST,
            [requestID],
            'B',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    public modbusMasterWriteMultipleRegistersLowLevel(
        slaveAddress: number,
        startingAddress: number,
        registersLength: number,
        registersChunkOffset: number,
        registersChunkData: any,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus master mode this function can be used to write multiple registers of a slave.
         * This function creates a Modbus function code 16 request.
         *
         * * Slave Address: Address of the target Modbus slave.
         * * Starting Address: Number of the first holding register to write. For backwards compatibility reasons, this parameter is called Starting Address. It is not an address, but instead a holding register number in the range of 1 to 65536. The prefix digit 4 (for holding register) is implicit and must be omitted.
         *
         * Upon success the function will return a non-zero request ID which will represent
         * the current request initiated by the Modbus master. In case of failure the returned
         * request ID will be 0.
         *
         * When successful this function will also invoke the :cb:`Modbus Master Write Multiple Registers Response`
         * callback. In this callback the Request ID provided by the callback argument must be matched
         * with the Request ID returned from this function to verify that the callback is indeed for a
         * particular request.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_MASTER_WRITE_MULTIPLE_REGISTERS_LOW_LEVEL,
            [slaveAddress, startingAddress, registersLength, registersChunkOffset, registersChunkData],
            'B I H H H27',
            9,
            'B',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * modbusSlaveAnswerReadDiscreteInputsRequestLowLevel
     * @param requestID
     * @param discreteInputsLength
     * @param discreteInputsChunkOffset
     * @param discreteInputsChunkData
     * @param returnCallback
     * @param errorCallback
     */
    public modbusSlaveAnswerReadDiscreteInputsRequestLowLevel(
        requestID: number,
        discreteInputsLength: number,
        discreteInputsChunkOffset: number,
        discreteInputsChunkData: any,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus slave mode this function can be used to answer a master request to
         * read discrete inputs.
         *
         * * Request ID: Request ID of the corresponding request that is being answered.
         * * Discrete Inputs: Data that is to be sent to the Modbus master for the corresponding request.
         *
         * This function must be called from the :cb:`Modbus Slave Read Discrete Inputs Request`
         * callback with the Request ID as provided by the argument of the callback.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_DISCRETE_INPUTS_REQUEST_LOW_LEVEL,
            [requestID, discreteInputsLength, discreteInputsChunkOffset, discreteInputsChunkData],
            'B H H ?472',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * modbusMasterReadDiscreteInputs
     * @param slaveAddress
     * @param startingAddress
     * @param count
     * @param returnCallback
     * @param errorCallback
     */
    public modbusMasterReadDiscreteInputs(
        slaveAddress: number,
        startingAddress: number,
        count: number,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus master mode this function can be used to read discrete inputs from a slave.
         * This function creates a Modbus function code 2 request.
         *
         * * Slave Address: Address of the target Modbus slave.
         * * Starting Address: Number of the first discrete input to read. For backwards compatibility reasons, this parameter is called Starting Address. It is not an address, but instead a discrete input number in the range of 1 to 65536. The prefix digit 1 (for discrete input) is implicit and must be omitted.
         * * Count: Number of discrete inputs to read.
         *
         * Upon success the function will return a non-zero request ID which will represent
         * the current request initiated by the Modbus master. In case of failure the returned
         * request ID will be 0.
         *
         * When successful this function will also invoke the :cb:`Modbus Master Read Discrete Inputs Response`
         * callback. In this callback the Request ID provided by the callback argument must be matched
         * with the Request ID returned from this function to verify that the callback is indeed for a
         * particular request.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_MASTER_READ_DISCRETE_INPUTS,
            [slaveAddress, startingAddress, count],
            'B I H',
            9,
            'B',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * modbusSlaveAnswerReadInputRegistersRequestLowLevel
     * @param requestID
     * @param inputRegistersLength
     * @param inputRegistersChunkOffset
     * @param inputRegistersChunkData
     * @param returnCallback
     * @param errorCallback
     */
    public modbusSlaveAnswerReadInputRegistersRequestLowLevel(
        requestID: number,
        inputRegistersLength: number,
        inputRegistersChunkOffset: number,
        inputRegistersChunkData: any,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus slave mode this function can be used to answer a master request to
         * read input registers.
         *
         * * Request ID: Request ID of the corresponding request that is being answered.
         * * Input Registers: Data that is to be sent to the Modbus master for the corresponding request.
         *
         * This function must be called from the :cb:`Modbus Slave Read Input Registers Request` callback
         * with the Request ID as provided by the argument of the callback.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_INPUT_REGISTERS_REQUEST_LOW_LEVEL,
            [requestID, inputRegistersLength, inputRegistersChunkOffset, inputRegistersChunkData],
            'B H H H29',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * modbusMasterReadInputRegisters
     * @param slaveAddress
     * @param startingAddress
     * @param count
     * @param returnCallback
     * @param errorCallback
     */
    public modbusMasterReadInputRegisters(
        slaveAddress: number,
        startingAddress: number,
        count: number,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus master mode this function can be used to read input registers from a slave.
         * This function creates a Modbus function code 4 request.
         *
         * * Slave Address: Address of the target Modbus slave.
         * * Starting Address: Number of the first input register to read. For backwards compatibility reasons, this parameter is called Starting Address. It is not an address, but instead an input register number in the range of 1 to 65536. The prefix digit 3 (for input register) is implicit and must be omitted.
         * * Count: Number of input registers to read.
         *
         * Upon success the function will return a non-zero request ID which will represent
         * the current request initiated by the Modbus master. In case of failure the returned
         * request ID will be 0.
         *
         * When successful this function will also invoke the :cb:`Modbus Master Read Input Registers Response`
         * callback. In this callback the Request ID provided by the callback argument must be matched
         * with the Request ID returned from this function to verify that the callback is indeed for a
         * particular request.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_MODBUS_MASTER_READ_INPUT_REGISTERS,
            [slaveAddress, startingAddress, count],
            'B I H',
            9,
            'B',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * setFrameReadableCallbackConfiguration
     * @param frameSize
     * @param returnCallback
     * @param errorCallback
     */
    public setFrameReadableCallbackConfiguration(
        frameSize: number,
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * Configures the :cb:`Frame Readable` callback. The frame size is the number of bytes, that have to be readable to trigger the callback.
         * A frame size of 0 disables the callback. A frame size greater than 0 enables the callback and disables the :cb:`Read` callback.
         *
         * By default the callback is disabled.
         *
         * .. versionadded:: 2.0.5$nbsp;(Plugin)
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_SET_FRAME_READABLE_CALLBACK_CONFIGURATION,
            [frameSize],
            'H',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * getFrameReadableCallbackConfiguration
     * @param returnCallback
     * @param errorCallback
     */
    public getFrameReadableCallbackConfiguration(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the callback configuration as set by :func:`Set Frame Readable Callback Configuration`.
         *
         * .. versionadded:: 2.0.5$nbsp;(Plugin)
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_GET_FRAME_READABLE_CALLBACK_CONFIGURATION,
            [],
            '',
            10,
            'H',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * getSPITFPErrorCount
     * @param returnCallback
     * @param errorCallback
     */
    public getSPITFPErrorCount(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

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
            BrickletRS485.FUNCTION_GET_SPITFP_ERROR_COUNT,
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
    public setBootloaderMode(mode: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

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
            BrickletRS485.FUNCTION_SET_BOOTLOADER_MODE,
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
    public getBootloaderMode(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the current bootloader mode, see :func:`Set Bootloader Mode`.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_GET_BOOTLOADER_MODE,
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

    /**
     * setWriteFirmwarePointer
     * @param pointer
     * @param returnCallback
     * @param errorCallback
     */
    public setWriteFirmwarePointer(pointer: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Sets the firmware pointer for :func:`Write Firmware`. The pointer has
         * to be increased by chunks of size 64. The data is written to flash
         * every 4 chunks (which equals to one page of size 256).
         *
         * This function is used by Brick Viewer during flashing. It should not be
         * necessary to call it in a normal user program.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_SET_WRITE_FIRMWARE_POINTER,
            [pointer],
            'I',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * writeFirmware
     * @param data
     * @param returnCallback
     * @param errorCallback
     */
    public writeFirmware(data: any, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Writes 64 Bytes of firmware at the position as written by
         * :func:`Set Write Firmware Pointer` before. The firmware is written
         * to flash every 4 chunks.
         *
         * You can only write firmware in bootloader mode.
         *
         * This function is used by Brick Viewer during flashing. It should not be
         * necessary to call it in a normal user program.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_WRITE_FIRMWARE,
            [data],
            'B64',
            9,
            'B',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * setStatusLEDConfig
     * @param config
     * @param returnCallback
     * @param errorCallback
     */
    public setStatusLEDConfig(config: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Sets the status LED configuration. By default the LED shows
         * communication traffic between Brick and Bricklet, it flickers once
         * for every 10 received data packets.
         *
         * You can also turn the LED permanently on/off or show a heartbeat.
         *
         * If the Bricklet is in bootloader mode, the LED is will show heartbeat by default.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_SET_STATUS_LED_CONFIG,
            [config],
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
     * getStatusLEDConfig
     * @param returnCallback
     * @param errorCallback
     */
    public getStatusLEDConfig(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the configuration as set by :func:`Set Status LED Config`
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_GET_STATUS_LED_CONFIG,
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

    /**
     * getChipTemperature
     * @param returnCallback
     * @param errorCallback
     */
    public getChipTemperature(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the temperature as measured inside the microcontroller. The
         * value returned is not the ambient temperature!
         *
         * The temperature is only proportional to the real temperature and it has bad
         * accuracy. Practically it is only useful as an indicator for
         * temperature changes.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_GET_CHIP_TEMPERATURE,
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
     * reset
     * @param returnCallback
     * @param errorCallback
     */
    public reset(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Calling this function will reset the Bricklet. All configurations
         * will be lost.
         *
         * After a reset you have to create new device objects,
         * calling functions on the existing ones will result in
         * undefined behavior!
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_RESET,
            [],
            '',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * writeUID
     * @param uid
     * @param returnCallback
     * @param errorCallback
     */
    public writeUID(uid: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Writes a new UID into flash. If you want to set a new UID
         * you have to decode the Base58 encoded UID string into an
         * integer first.
         *
         * We recommend that you use Brick Viewer to change the UID.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_WRITE_UID,
            [uid],
            'I',
            0,
            '',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * readUID
     * @param returnCallback
     * @param errorCallback
     */
    public readUID(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the current UID as an integer. Encode as
         * Base58 to get the usual string version.
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_READ_UID,
            [],
            '',
            12,
            'I',
            returnCallback,
            errorCallback,
            false,
            true
        );
    }

    /**
     * getIdentity
     * @param returnCallback
     * @param errorCallback
     */
    public getIdentity(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns the UID, the UID where the Bricklet is connected to,
         * the position, the hardware and firmware version as well as the
         * device identifier.
         *
         * The position can be 'a', 'b', 'c', 'd', 'e', 'f', 'g' or 'h' (Bricklet Port).
         * A Bricklet connected to an :ref:`Isolator Bricklet <isolator_bricklet>` is always at
         * position 'z'.
         *
         * The device identifier numbers can be found :ref:`here <device_identifier>`.
         * |device_identifier_constant|
         */
        this.ipcon.sendRequest(
            this,
            BrickletRS485.FUNCTION_GET_IDENTITY,
            [],
            '',
            33,
            's8 s8 c B3 B3 H',
            returnCallback,
            errorCallback,
            false,
            false
        );
    }

    protected _responseHandlerWrite(
        device: Device,
        fid: number,
        packetResponse: Buffer,
        sendRequestParams: {
            contentSize: number;
            sendRequestFID: number;
            sendRequestPackFormat: string;
            sendRequestExpectedResponseLength: number;
            sendRequestUnpackFormat: string;
            startStreamResponseTimer: boolean;
            checkValidity: boolean;
        },
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {
        const result: any[] = [];
        let payload = null;
        let llvalues = null;
        let packetErrorFlag = 0;
        let shortWriteWritten = -1;
        const streamStateObjectI = device.streamStateObjects[fid];
        const responseEmpty = streamStateObjectI.responseProperties.streamInResponseEmpty;
        let messageLengthI: number = 0;
        let messageChunkDataI: string[] = [];
        let messageChunkOffsetI: number = 0;

        const doNextLLCall = (): void => {
            messageLengthI = streamStateObjectI.responseProperties.data.length;
            messageChunkDataI =
                device.ipcon.createChunkData(
                    streamStateObjectI.responseProperties.data,
                    streamStateObjectI.responseProperties.streamInChunkOffset,
                    streamStateObjectI.responseProperties.streamInChunkLength,
                    '\0'
                );

            messageChunkOffsetI = streamStateObjectI.responseProperties.streamInChunkOffset;

            for (let iI = 0; iI < streamStateObjectI.dataMappingStreamIn.length; iI++) {
                if (streamStateObjectI.dataMappingStreamIn[iI] === null) {
                    continue;
                }

                if (streamStateObjectI.dataMappingStreamIn[iI].endsWith('Length')) {
                    streamStateObjectI.responseProperties.streamInLLParams[iI] = messageLengthI;
                } else if (streamStateObjectI.dataMappingStreamIn[iI].endsWith('Offset')) {
                    streamStateObjectI.responseProperties.streamInLLParams[iI] = messageChunkOffsetI;
                } else if (streamStateObjectI.dataMappingStreamIn[iI].endsWith('Data')) {
                    streamStateObjectI.responseProperties.streamInLLParams[iI] = messageChunkDataI;
                }
            }

            device.ipcon.sendRequest(
                device,
                sendRequestParams.sendRequestFID,
                streamStateObjectI.responseProperties.streamInLLParams,
                sendRequestParams.sendRequestPackFormat,
                sendRequestParams.sendRequestExpectedResponseLength,
                sendRequestParams.sendRequestUnpackFormat,
                returnCallback,
                errorCallback,
                sendRequestParams.startStreamResponseTimer,
                sendRequestParams.checkValidity
            );

            streamStateObjectI.responseProperties.streamInChunkOffset += sendRequestParams.contentSize;
        };

        const handleStreamInDone = (): void => {
            if (streamStateObjectI.responseProperties.returnCB) {
                if (streamStateObjectI.streamProperties.shortWrite) {
                    for (let g = 0; g < streamStateObjectI.dataMapping.length; g++) {
                        if (streamStateObjectI.dataMapping[g].endsWith('Written')) {
                            result[g] = streamStateObjectI.responseProperties.streamInWritten;
                            break;
                        }
                    }
                }

                if (responseEmpty) {
                    streamStateObjectI.responseProperties.returnCB.apply(device);
                } else {
                    streamStateObjectI.responseProperties.returnCB.apply(device, result);
                }
            }

            device.resetStreamStateObject(streamStateObjectI);

            if (streamStateObjectI.responseProperties.callQueue.length > 0) {
                const callQueue = streamStateObjectI.responseProperties.callQueue.shift();

                if (callQueue) {
                    callQueue(device);
                }
            }
        };

        if (!streamStateObjectI) {
            return;
        }

        packetErrorFlag = device.ipcon.getEFromPacket(packetResponse);

        if (packetErrorFlag !== 0) {
            if (streamStateObjectI.responseProperties.errorCB !== undefined) {
                if (packetErrorFlag === 1) {
                    streamStateObjectI.responseProperties.errorCB.call(device, IPConnection.ERROR_INVALID_PARAMETER);
                } else if (packetErrorFlag === 2) {
                    streamStateObjectI.responseProperties.errorCB.call(device, IPConnection.ERROR_FUNCTION_NOT_SUPPORTED);
                } else {
                    streamStateObjectI.responseProperties.errorCB.call(device, IPConnection.ERROR_UNKNOWN_ERROR);
                }
            }

            device.resetStreamStateObject(streamStateObjectI);

            if (streamStateObjectI.responseProperties.callQueue.length > 0) {
                const callQueueC = streamStateObjectI.responseProperties.callQueue.shift();

                if (callQueueC) {
                    callQueueC(device);
                }
            }

            return;
        }

        if (responseEmpty) {
            if (streamStateObjectI.streamProperties.singleChunk) {
                handleStreamInDone();

                return;
            }

            if (streamStateObjectI.responseProperties.streamInChunkOffset < streamStateObjectI.responseProperties.data.length) {
                doNextLLCall();
            } else {
                handleStreamInDone();
            }
        } else {
            payload = device.ipcon.getPayloadFromPacket(packetResponse);
            llvalues = device.ipcon.unpack(
                payload,
                streamStateObjectI.responseProperties.unpackFormatString
            );

            if (!payload || !llvalues) {
                device.resetStreamStateObject(streamStateObjectI);

                if (streamStateObjectI.responseProperties.callQueue.length > 0) {
                    const callQueueC = streamStateObjectI.responseProperties.callQueue.shift();

                    if (callQueueC) {
                        callQueueC(device);
                    }
                }

                return;
            }

            for (let i = 0; i < streamStateObjectI.dataMapping.length; i++) {
                result.push(llvalues[i]);
            }

            if (streamStateObjectI.streamProperties.singleChunk) {
                if (streamStateObjectI.responseProperties.returnCB) {
                    streamStateObjectI.responseProperties.returnCB.apply(device, result);
                }

                device.resetStreamStateObject(streamStateObjectI);

                if (streamStateObjectI.responseProperties.callQueue.length > 0) {
                    const callQueueC = streamStateObjectI.responseProperties.callQueue.shift();

                    if (callQueueC) {
                        callQueueC(device);
                    }
                }

                return;
            }

            if (streamStateObjectI.streamProperties.shortWrite) {
                for (let i = 0; i < streamStateObjectI.dataMapping.length; i++) {
                    if (streamStateObjectI.dataMapping[i].endsWith('Written')) {
                        shortWriteWritten = llvalues[i];
                        streamStateObjectI.responseProperties.streamInWritten += shortWriteWritten;
                        break;
                    }
                }
                if ((shortWriteWritten !== -1) && (shortWriteWritten < sendRequestParams.contentSize)) {
                    // Either last chunk or short write
                    handleStreamInDone();
                    return;
                }
            }

            if (streamStateObjectI.responseProperties.streamInChunkOffset < streamStateObjectI.responseProperties.data.length) {
                doNextLLCall();
            } else {
                handleStreamInDone();
            }
        }
    }

    /**
     * write
     * @param message
     * @param returnCallback
     * @param errorCallback
     */
    public write(message: string[], returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Writes characters to the RS485 interface. The characters can be binary data,
         * ASCII or similar is not necessary.
         *
         * See :func:`Set RS485 Configuration` for configuration possibilities
         * regarding baudrate, parity and so on.
         */
        let messageLength = 0;
        let messageChunkData: string[] = [];
        let messageChunkOffset = 0;
        const streamStateObject = this.streamStateObjects[1];

        if (message.length > 65535) {
            if (errorCallback) {
                errorCallback(IPConnection.ERROR_INVALID_PARAMETER);
            }

            return;
        }

        if (this.getResponseExpected(1)) {
            if (streamStateObject.responseProperties.responseHandler === null) {
                const responseHandler = (device: Device, fid: number, packetResponse: Buffer): void => {
                    this._responseHandlerWrite(
                        device,
                        fid,
                        packetResponse,
                        {
                            contentSize: 60,
                            sendRequestFID: BrickletRS485.FUNCTION_WRITE_LOW_LEVEL,
                            sendRequestPackFormat: 'H H c60',
                            sendRequestExpectedResponseLength: 9,
                            sendRequestUnpackFormat: 'B',
                            startStreamResponseTimer: true,
                            checkValidity: true
                        },
                        returnCallback,
                        errorCallback
                    );
                };

                streamStateObject.responseProperties.responseHandler = responseHandler;
            }

            if (streamStateObject.responseProperties.running) {
                const functionToQueue = (device: Device): void => {
                    if (device instanceof BrickletRS485) {
                        device.write(message, returnCallback, errorCallback);
                    }
                };

                streamStateObject.responseProperties.callQueue.push(functionToQueue);
            } else {
                streamStateObject.responseProperties.running = true;
                streamStateObject.responseProperties.returnCB = returnCallback;
                streamStateObject.responseProperties.errorCB = errorCallback;
                streamStateObject.responseProperties.data.length = 0;
                streamStateObject.responseProperties.data.push(message);

                if (streamStateObject.streamProperties.fixedLength) {
                    messageLength = streamStateObject.streamProperties.fixedLength;
                } else {
                    messageLength = message.length;
                }

                messageChunkOffset = 0;
                messageChunkData =
                    this.ipcon.createChunkData(message, 0, 60, '\0');

                streamStateObject.responseProperties.streamInChunkOffset = 60;
                streamStateObject.responseProperties.streamInChunkLength = 60;
                streamStateObject.responseProperties.streamInLLParams = [messageLength, messageChunkOffset, messageChunkData];

                this.ipcon.sendRequest(this,
                    BrickletRS485.FUNCTION_WRITE_LOW_LEVEL,
                    [messageLength, messageChunkOffset, messageChunkData],
                    'H H c60',
                    9,
                    'B',
                    returnCallback,
                    errorCallback,
                    true,
                    true);
            }
        } else {
            if (streamStateObject.streamProperties.fixedLength) {
                messageLength = streamStateObject.streamProperties.fixedLength;
            } else {
                messageLength = message.length;
            }

            if (streamStateObject.streamProperties.singleChunk) {
                messageChunkData =
                    this.ipcon.createChunkData(message, 0, 60, '\0');

                this.ipcon.sendRequest(this,
                    BrickletRS485.FUNCTION_WRITE_LOW_LEVEL,
                    [messageLength, messageChunkOffset, messageChunkData],
                    'H H c60',
                    9,
                    'B',
                    returnCallback,
                    errorCallback,
                    false,
                    true);
            } else {
                while (messageChunkOffset < message.length) {
                    messageChunkData =
                        this.ipcon.createChunkData(message, messageChunkOffset, 60, '\0');

                    this.ipcon.sendRequest(this,
                        BrickletRS485.FUNCTION_WRITE_LOW_LEVEL,
                        [messageLength, messageChunkOffset, messageChunkData],
                        'H H c60',
                        9,
                        'B',
                        returnCallback,
                        errorCallback,
                        false,
                        true);

                    messageChunkOffset += 60;
                }
            }

            if (returnCallback) {
                returnCallback();
            }
        }
    }

    /**
     * read
     * @param length
     * @param returnCallback
     * @param errorCallback
     */
    public read(length: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void {

        /**
         * Returns up to *length* characters from receive buffer.
         *
         * Instead of polling with this function, you can also use
         * callbacks. But note that this function will return available
         * data only when the read callback is disabled.
         * See :func:`Enable Read Callback` and :cb:`Read` callback.
         */
        let responseHandler = null;
        const streamStateObject = this.streamStateObjects[2];

        if (streamStateObject.responseProperties.responseHandler === null) {
            responseHandler = (device: Device, fid: number, packetResponse: Buffer): void => {
                let i;
                const result = [];
                let llvalues = null;
                let packetErrorFlag = 0;
                const rolesMappedData = [];
                let messageLength: number = 0;
                let messageChunkData = null;
                let messageOutOfSync = false;
                const streamStateObjectI = device.streamStateObjects[fid];
                let messageChunkOffset: number = 0;
                const payload = device.ipcon.getPayloadFromPacket(packetResponse);

                packetErrorFlag = device.ipcon.getEFromPacket(packetResponse);

                if (packetErrorFlag !== 0) {
                    if (streamStateObjectI.responseProperties.errorCB !== undefined) {
                        if (packetErrorFlag === 1) {
                            streamStateObjectI.responseProperties.errorCB.call(device, IPConnection.ERROR_INVALID_PARAMETER);
                        } else if (packetErrorFlag === 2) {
                            streamStateObjectI.responseProperties.errorCB.call(device, IPConnection.ERROR_FUNCTION_NOT_SUPPORTED);
                        } else {
                            streamStateObjectI.responseProperties.errorCB.call(device, IPConnection.ERROR_UNKNOWN_ERROR);
                        }
                    }

                    device.resetStreamStateObject(streamStateObjectI);

                    if (streamStateObjectI.responseProperties.callQueue.length > 0) {
                        const callQueueC = streamStateObjectI.responseProperties.callQueue.shift();

                        if (callQueueC) {
                            callQueueC(device);
                        }
                    }

                    return;
                }

                if (payload.length === 0) {
                    device.resetStreamStateObject(streamStateObjectI);

                    if (streamStateObjectI.responseProperties.callQueue.length > 0) {
                        const callQueueC = streamStateObjectI.responseProperties.callQueue.shift();

                        if (callQueueC) {
                            callQueueC(device);
                        }
                    }

                    return;
                }

                llvalues = device.ipcon.unpack(payload, streamStateObjectI.responseProperties.unpackFormatString);

                for (i = 0; i < streamStateObjectI.dataMapping.length; i++) {
                    if (streamStateObjectI.dataMapping[i] === 'streamChunkData') {
                        messageChunkData = llvalues[i];
                    } else if (streamStateObjectI.dataMapping[i] === 'streamChunkOffset') {
                        messageChunkOffset = llvalues[i];
                    }
                }

                for (i = 0; i < streamStateObjectI.dataMapping.length; i++) {
                    if (streamStateObjectI.dataMapping[i] === 'streamLength') {
                        messageLength = llvalues[i];
                        break;
                    }
                }

                const handleOOS = (): void => {
                    if ((messageChunkOffset + 60) < messageLength) {
                        streamStateObjectI.responseProperties.runningSubcallOOS = true;

                        device.ipcon.sendRequest(
                            device,
                            BrickletRS485.FUNCTION_READ_LOW_LEVEL,
                            [length],
                            'H',
                            72,
                            'H H c60',
                            streamStateObjectI.responseProperties.returnCB,
                            streamStateObjectI.responseProperties.errorCB,
                            true,
                            true
                        );

                        return;
                    }

                    if (streamStateObjectI.responseProperties.errorCB) {
                        streamStateObjectI.responseProperties.errorCB.call(device, IPConnection.ERROR_STREAM_OUT_OF_SYNC);
                    }

                    device.resetStreamStateObject(streamStateObjectI);

                    if (streamStateObjectI.responseProperties.callQueue.length > 0) {
                        const callQueueC = streamStateObjectI.responseProperties.callQueue.shift();

                        if (callQueueC) {
                            callQueueC(device);
                        }
                    }
                };

                if (streamStateObjectI.responseProperties.waitingFirstChunk) {
                    streamStateObjectI.responseProperties.waitingFirstChunk = false;
                    messageOutOfSync = messageChunkOffset !== 0;
                    streamStateObjectI.responseProperties.data = messageChunkData;
                }

                if (streamStateObjectI.responseProperties.runningSubcallOOS) {
                    handleOOS();
                    return;
                }

                if (streamStateObjectI.responseProperties.runningSubcall) {
                    messageOutOfSync = messageChunkOffset !== streamStateObjectI.responseProperties.data.length;

                    if (!messageOutOfSync &&
                        (streamStateObjectI.responseProperties.data.length < messageLength)
                    ) {
                        streamStateObjectI.responseProperties.data =
                            streamStateObjectI.responseProperties.data.concat(messageChunkData);

                        if (streamStateObjectI.responseProperties.data.length >= messageLength) {
                            streamStateObjectI.responseProperties.data =
                                streamStateObjectI.responseProperties.data.splice(0, messageLength);
                        } else {
                            device.ipcon.sendRequest(
                                device,
                                BrickletRS485.FUNCTION_READ_LOW_LEVEL,
                                [length],
                                'H',
                                72,
                                'H H c60',
                                streamStateObjectI.responseProperties.returnCB,
                                streamStateObjectI.responseProperties.errorCB,
                                true,
                                true
                            );

                            return;
                        }
                    }
                } else if (!messageOutOfSync && (streamStateObjectI.responseProperties.data.length < messageLength)) {
                    streamStateObjectI.responseProperties.runningSubcall = true;
                    device.ipcon.sendRequest(
                        device,
                        BrickletRS485.FUNCTION_READ_LOW_LEVEL,
                        [length],
                        'H',
                        72,
                        'H H c60',
                        streamStateObjectI.responseProperties.returnCB,
                        streamStateObjectI.responseProperties.errorCB,
                        true,
                        true
                    );

                    return;
                }

                if (messageOutOfSync) {
                    // Discard remaining stream to bring it back in-sync
                    handleOOS();

                    return;
                }

                if (streamStateObjectI.responseProperties.returnCB) {
                    for (i = 0; i < streamStateObjectI.dataMapping.length; i++) {
                        rolesMappedData.push({role: streamStateObjectI.dataMapping[i],
                            llvalue: llvalues[i]});
                    }

                    for (i = 0; i < rolesMappedData.length; i++) {
                        if (rolesMappedData[i].role === 'streamChunkData') {
                            result.push(streamStateObjectI.responseProperties.data.splice(0, messageLength));
                        } else if (rolesMappedData[i].role === null) {
                            result.push(rolesMappedData[i].llvalue);
                        }
                    }

                    streamStateObjectI.responseProperties.returnCB.apply(device, result);
                }

                device.resetStreamStateObject(streamStateObjectI);

                if (streamStateObjectI.responseProperties.callQueue.length > 0) {
                    const callQueueC = streamStateObjectI.responseProperties.callQueue.shift();

                    if (callQueueC) {
                        callQueueC(device);
                    }
                }

            };

            streamStateObject.responseProperties.responseHandler = responseHandler;
        }

        if (streamStateObject.responseProperties.running) {
            const functionToQueue = (device: Device): void => {
                if (device instanceof BrickletRS485) {
                    device.read(length, returnCallback, errorCallback);
                }
            };

            streamStateObject.responseProperties.callQueue.push(functionToQueue);
        } else {
            streamStateObject.responseProperties.running = true;
            streamStateObject.responseProperties.returnCB = returnCallback;
            streamStateObject.responseProperties.errorCB = errorCallback;

            this.ipcon.sendRequest(this,
                BrickletRS485.FUNCTION_READ_LOW_LEVEL,
                [length],
                'H',
                72,
                'H H c60',
                returnCallback,
                errorCallback,
                true,
                true);
        }
    }

    /**
     * modbusSlaveAnswerReadCoilsRequest
     * @param requestID
     * @param coils
     * @param returnCallback
     * @param errorCallback
     */
    public modbusSlaveAnswerReadCoilsRequest(
        requestID: number,
        coils: string[],
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {
        let coilsLength = 0;
        let coilsChunkData = [];
        let coilsChunkOffset = 0;
        const streamStateObject = this.streamStateObjects[25];

        if (coils.length > 65535) {
            if (errorCallback) {
                errorCallback(IPConnection.ERROR_INVALID_PARAMETER);
            }

            return;
        }

        if (this.getResponseExpected(25)) {
            if (streamStateObject.responseProperties.responseHandler === null) {
                const responseHandler = (device: Device, fid: number, packetResponse: Buffer): void => {
                    this._responseHandlerWrite(
                        device,
                        fid,
                        packetResponse,
                        {
                            contentSize: 472,
                            sendRequestFID: BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_COILS_REQUEST_LOW_LEVEL,
                            sendRequestPackFormat: 'B H H ?472',
                            sendRequestExpectedResponseLength: 0,
                            sendRequestUnpackFormat: '',
                            startStreamResponseTimer: true,
                            checkValidity: true
                        },
                        returnCallback,
                        errorCallback
                    );
                };

                streamStateObject.responseProperties.responseHandler = responseHandler;
            }

            if (streamStateObject.responseProperties.running) {
                const functionToQueue: TFCallDevice = (device: Device): void => {
                    if (device instanceof BrickletRS485) {
                        device.modbusSlaveAnswerReadCoilsRequest(
                            requestID,
                            coils,
                            returnCallback,
                            errorCallback
                        );
                    }
                };

                streamStateObject.responseProperties.callQueue.push(functionToQueue);
            } else {
                streamStateObject.responseProperties.running = true;
                streamStateObject.responseProperties.returnCB = returnCallback;
                streamStateObject.responseProperties.errorCB = errorCallback;
                streamStateObject.responseProperties.data.length = 0;
                streamStateObject.responseProperties.data.push(
                    streamStateObject.responseProperties.data,
                    coils
                );

                if (streamStateObject.streamProperties.fixedLength) {
                    coilsLength = streamStateObject.streamProperties.fixedLength;
                } else {
                    coilsLength = coils.length;
                }

                coilsChunkOffset = 0;
                coilsChunkData =
                    this.ipcon.createChunkData(coils, 0, 472, '\0');

                streamStateObject.responseProperties.streamInChunkOffset = 472;
                streamStateObject.responseProperties.streamInChunkLength = 472;
                streamStateObject.responseProperties.streamInLLParams = [requestID, coilsLength, coilsChunkOffset, coilsChunkData];

                this.ipcon.sendRequest(this,
                    BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_COILS_REQUEST_LOW_LEVEL,
                    [requestID, coilsLength, coilsChunkOffset, coilsChunkData],
                    'B H H ?472',
                    0,
                    '',
                    returnCallback,
                    errorCallback,
                    true,
                    true);
            }
        } else {
            if (streamStateObject.streamProperties.fixedLength) {
                coilsLength = streamStateObject.streamProperties.fixedLength;
            } else {
                coilsLength = coils.length;
            }

            if (streamStateObject.streamProperties.singleChunk) {
                coilsChunkData =
                    this.ipcon.createChunkData(coils, 0, 472, '\0');

                this.ipcon.sendRequest(this,
                    BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_COILS_REQUEST_LOW_LEVEL,
                    [requestID, coilsLength, coilsChunkOffset, coilsChunkData],
                    'B H H ?472',
                    0,
                    '',
                    returnCallback,
                    errorCallback,
                    false,
                    true);
            } else {
                while (coilsChunkOffset < coils.length) {
                    coilsChunkData =
                        this.ipcon.createChunkData(coils, coilsChunkOffset, 472, '\0');

                    this.ipcon.sendRequest(this,
                        BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_COILS_REQUEST_LOW_LEVEL,
                        [requestID, coilsLength, coilsChunkOffset, coilsChunkData],
                        'B H H ?472',
                        0,
                        '',
                        returnCallback,
                        errorCallback,
                        false,
                        true);

                    coilsChunkOffset += 472;
                }
            }

            if (returnCallback) {
                returnCallback();
            }
        }
    }

    /**
     * modbusSlaveAnswerReadHoldingRegistersRequest
     * @param requestID
     * @param holdingRegisters
     * @param returnCallback
     * @param errorCallback
     */
    public modbusSlaveAnswerReadHoldingRegistersRequest(
        requestID: number,
        holdingRegisters: string[],
        returnCallback?: TFAnyFunction,
        errorCallback?: TFErrorCallback
    ): void {

        /**
         * In Modbus slave mode this function can be used to answer a master request to
         * read holding registers.
         *
         * * Request ID: Request ID of the corresponding request that is being answered.
         * * Holding Registers: Data that is to be sent to the Modbus master for the corresponding request.
         *
         * This function must be called from the :cb:`Modbus Slave Read Holding Registers Request`
         * callback with the Request ID as provided by the argument of the callback.
         */
        let holdingRegistersLength = 0;
        let holdingRegistersChunkData = [];
        let holdingRegistersChunkOffset = 0;
        const streamStateObject = this.streamStateObjects[27];

        if (holdingRegisters.length > 65535) {
            if (errorCallback) {
                errorCallback(IPConnection.ERROR_INVALID_PARAMETER);
            }

            return;
        }

        if (this.getResponseExpected(27)) {
            let responseHandler = null;
            let functionToQueue = null;

            if (streamStateObject.responseProperties.responseHandler === null) {
                responseHandler = (device: Device, fid: number, packetResponse: Buffer): void => {
                    this._responseHandlerWrite(
                        device,
                        fid,
                        packetResponse,
                        {
                            contentSize: 29,
                            sendRequestFID: BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_HOLDING_REGISTERS_REQUEST_LOW_LEVEL,
                            sendRequestPackFormat: 'B H H H29',
                            sendRequestExpectedResponseLength: 0,
                            sendRequestUnpackFormat: '',
                            startStreamResponseTimer: true,
                            checkValidity: true
                        },
                        returnCallback,
                        errorCallback
                    );
                };

                streamStateObject.responseProperties.responseHandler = responseHandler;
            }

            if (streamStateObject.responseProperties.running) {
                functionToQueue = (device: Device): void => {
                    if (device instanceof BrickletRS485) {
                        device.modbusSlaveAnswerReadHoldingRegistersRequest(
                            requestID,
                            holdingRegisters,
                            returnCallback,
                            errorCallback
                        );
                    }
                };

                streamStateObject.responseProperties.callQueue.push(functionToQueue);
            } else {
                streamStateObject.responseProperties.running = true;
                streamStateObject.responseProperties.returnCB = returnCallback;
                streamStateObject.responseProperties.errorCB = errorCallback;
                streamStateObject.responseProperties.data.length = 0;
                streamStateObject.responseProperties.data.push(holdingRegisters);

                if (streamStateObject.streamProperties.fixedLength) {
                    holdingRegistersLength = streamStateObject.streamProperties.fixedLength;
                } else {
                    holdingRegistersLength = holdingRegisters.length;
                }

                holdingRegistersChunkOffset = 0;
                holdingRegistersChunkData =
                    this.ipcon.createChunkData(holdingRegisters, 0, 29, '\0');

                streamStateObject.responseProperties.streamInChunkOffset = 29;
                streamStateObject.responseProperties.streamInChunkLength = 29;
                streamStateObject.responseProperties.streamInLLParams = [requestID, holdingRegistersLength, holdingRegistersChunkOffset, holdingRegistersChunkData];

                this.ipcon.sendRequest(this,
                    BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_HOLDING_REGISTERS_REQUEST_LOW_LEVEL,
                    [requestID, holdingRegistersLength, holdingRegistersChunkOffset, holdingRegistersChunkData],
                    'B H H H29',
                    0,
                    '',
                    returnCallback,
                    errorCallback,
                    true,
                    true);
            }
        } else {
            if (streamStateObject.streamProperties.fixedLength) {
                holdingRegistersLength = streamStateObject.streamProperties.fixedLength;
            } else {
                holdingRegistersLength = holdingRegisters.length;
            }

            if (streamStateObject.streamProperties.singleChunk) {
                holdingRegistersChunkData =
                    this.ipcon.createChunkData(holdingRegisters, 0, 29, '\0');

                this.ipcon.sendRequest(this,
                    BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_HOLDING_REGISTERS_REQUEST_LOW_LEVEL,
                    [requestID, holdingRegistersLength, holdingRegistersChunkOffset, holdingRegistersChunkData],
                    'B H H H29',
                    0,
                    '',
                    returnCallback,
                    errorCallback,
                    false,
                    true);
            } else {
                while (holdingRegistersChunkOffset < holdingRegisters.length) {
                    holdingRegistersChunkData =
                        this.ipcon.createChunkData(holdingRegisters, holdingRegistersChunkOffset, 29, '\0');

                    this.ipcon.sendRequest(this,
                        BrickletRS485.FUNCTION_MODBUS_SLAVE_ANSWER_READ_HOLDING_REGISTERS_REQUEST_LOW_LEVEL,
                        [requestID, holdingRegistersLength, holdingRegistersChunkOffset, holdingRegistersChunkData],
                        'B H H H29',
                        0,
                        '',
                        returnCallback,
                        errorCallback,
                        false,
                        true);

                    holdingRegistersChunkOffset += 29;
                }
            }

            if (returnCallback) {
                returnCallback();
            }
        }
    }

}