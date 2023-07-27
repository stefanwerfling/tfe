import { Device, TFAnyFunction, TFErrorCallback } from './Device.js';
import { IPConnection } from './IPConnection.js';
/**
 * BrickletRS485
 */
export declare class BrickletRS485 extends Device {
    static DEVICE_IDENTIFIER: number;
    static DEVICE_DISPLAY_NAME: string;
    static CALLBACK_READ_LOW_LEVEL: number;
    static CALLBACK_ERROR_COUNT: number;
    static CALLBACK_MODBUS_SLAVE_READ_COILS_REQUEST: number;
    static CALLBACK_MODBUS_MASTER_READ_COILS_RESPONSE_LOW_LEVEL: number;
    static CALLBACK_MODBUS_SLAVE_READ_HOLDING_REGISTERS_REQUEST: number;
    static CALLBACK_MODBUS_MASTER_READ_HOLDING_REGISTERS_RESPONSE_LOW_LEVEL: number;
    static CALLBACK_MODBUS_SLAVE_WRITE_SINGLE_COIL_REQUEST: number;
    static CALLBACK_MODBUS_MASTER_WRITE_SINGLE_COIL_RESPONSE: number;
    static CALLBACK_MODBUS_SLAVE_WRITE_SINGLE_REGISTER_REQUEST: number;
    static CALLBACK_MODBUS_MASTER_WRITE_SINGLE_REGISTER_RESPONSE: number;
    static CALLBACK_MODBUS_SLAVE_WRITE_MULTIPLE_COILS_REQUEST_LOW_LEVEL: number;
    static CALLBACK_MODBUS_MASTER_WRITE_MULTIPLE_COILS_RESPONSE: number;
    static CALLBACK_MODBUS_SLAVE_WRITE_MULTIPLE_REGISTERS_REQUEST_LOW_LEVEL: number;
    static CALLBACK_MODBUS_MASTER_WRITE_MULTIPLE_REGISTERS_RESPONSE: number;
    static CALLBACK_MODBUS_SLAVE_READ_DISCRETE_INPUTS_REQUEST: number;
    static CALLBACK_MODBUS_MASTER_READ_DISCRETE_INPUTS_RESPONSE_LOW_LEVEL: number;
    static CALLBACK_MODBUS_SLAVE_READ_INPUT_REGISTERS_REQUEST: number;
    static CALLBACK_MODBUS_MASTER_READ_INPUT_REGISTERS_RESPONSE_LOW_LEVEL: number;
    static CALLBACK_FRAME_READABLE: number;
    static CALLBACK_READ: number;
    static CALLBACK_MODBUS_MASTER_READ_COILS_RESPONSE: number;
    static CALLBACK_MODBUS_MASTER_READ_HOLDING_REGISTERS_RESPONSE: number;
    static CALLBACK_MODBUS_SLAVE_WRITE_MULTIPLE_COILS_REQUEST: number;
    static CALLBACK_MODBUS_SLAVE_WRITE_MULTIPLE_REGISTERS_REQUEST: number;
    static CALLBACK_MODBUS_MASTER_READ_DISCRETE_INPUTS_RESPONSE: number;
    static CALLBACK_MODBUS_MASTER_READ_INPUT_REGISTERS_RESPONSE: number;
    static FUNCTION_WRITE_LOW_LEVEL: number;
    static FUNCTION_READ_LOW_LEVEL: number;
    static FUNCTION_ENABLE_READ_CALLBACK: number;
    static FUNCTION_DISABLE_READ_CALLBACK: number;
    static FUNCTION_IS_READ_CALLBACK_ENABLED: number;
    static FUNCTION_SET_RS485_CONFIGURATION: number;
    static FUNCTION_GET_RS485_CONFIGURATION: number;
    static FUNCTION_SET_MODBUS_CONFIGURATION: number;
    static FUNCTION_GET_MODBUS_CONFIGURATION: number;
    static FUNCTION_SET_MODE: number;
    static FUNCTION_GET_MODE: number;
    static FUNCTION_SET_COMMUNICATION_LED_CONFIG: number;
    static FUNCTION_GET_COMMUNICATION_LED_CONFIG: number;
    static FUNCTION_SET_ERROR_LED_CONFIG: number;
    static FUNCTION_GET_ERROR_LED_CONFIG: number;
    static FUNCTION_SET_BUFFER_CONFIG: number;
    static FUNCTION_GET_BUFFER_CONFIG: number;
    static FUNCTION_GET_BUFFER_STATUS: number;
    static FUNCTION_ENABLE_ERROR_COUNT_CALLBACK: number;
    static FUNCTION_DISABLE_ERROR_COUNT_CALLBACK: number;
    static FUNCTION_IS_ERROR_COUNT_CALLBACK_ENABLED: number;
    static FUNCTION_GET_ERROR_COUNT: number;
    static FUNCTION_GET_MODBUS_COMMON_ERROR_COUNT: number;
    static FUNCTION_MODBUS_SLAVE_REPORT_EXCEPTION: number;
    static FUNCTION_MODBUS_SLAVE_ANSWER_READ_COILS_REQUEST_LOW_LEVEL: number;
    static FUNCTION_MODBUS_MASTER_READ_COILS: number;
    static FUNCTION_MODBUS_SLAVE_ANSWER_READ_HOLDING_REGISTERS_REQUEST_LOW_LEVEL: number;
    static FUNCTION_MODBUS_MASTER_READ_HOLDING_REGISTERS: number;
    static FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_SINGLE_COIL_REQUEST: number;
    static FUNCTION_MODBUS_MASTER_WRITE_SINGLE_COIL: number;
    static FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_SINGLE_REGISTER_REQUEST: number;
    static FUNCTION_MODBUS_MASTER_WRITE_SINGLE_REGISTER: number;
    static FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_MULTIPLE_COILS_REQUEST: number;
    static FUNCTION_MODBUS_MASTER_WRITE_MULTIPLE_COILS_LOW_LEVEL: number;
    static FUNCTION_MODBUS_SLAVE_ANSWER_WRITE_MULTIPLE_REGISTERS_REQUEST: number;
    static FUNCTION_MODBUS_MASTER_WRITE_MULTIPLE_REGISTERS_LOW_LEVEL: number;
    static FUNCTION_MODBUS_SLAVE_ANSWER_READ_DISCRETE_INPUTS_REQUEST_LOW_LEVEL: number;
    static FUNCTION_MODBUS_MASTER_READ_DISCRETE_INPUTS: number;
    static FUNCTION_MODBUS_SLAVE_ANSWER_READ_INPUT_REGISTERS_REQUEST_LOW_LEVEL: number;
    static FUNCTION_MODBUS_MASTER_READ_INPUT_REGISTERS: number;
    static FUNCTION_SET_FRAME_READABLE_CALLBACK_CONFIGURATION: number;
    static FUNCTION_GET_FRAME_READABLE_CALLBACK_CONFIGURATION: number;
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
    static PARITY_NONE: number;
    static PARITY_ODD: number;
    static PARITY_EVEN: number;
    static STOPBITS_1: number;
    static STOPBITS_2: number;
    static WORDLENGTH_5: number;
    static WORDLENGTH_6: number;
    static WORDLENGTH_7: number;
    static WORDLENGTH_8: number;
    static DUPLEX_HALF: number;
    static DUPLEX_FULL: number;
    static MODE_RS485: number;
    static MODE_MODBUS_MASTER_RTU: number;
    static MODE_MODBUS_SLAVE_RTU: number;
    static COMMUNICATION_LED_CONFIG_OFF: number;
    static COMMUNICATION_LED_CONFIG_ON: number;
    static COMMUNICATION_LED_CONFIG_SHOW_HEARTBEAT: number;
    static COMMUNICATION_LED_CONFIG_SHOW_COMMUNICATION: number;
    static ERROR_LED_CONFIG_OFF: number;
    static ERROR_LED_CONFIG_ON: number;
    static ERROR_LED_CONFIG_SHOW_HEARTBEAT: number;
    static ERROR_LED_CONFIG_SHOW_ERROR: number;
    static EXCEPTION_CODE_TIMEOUT: number;
    static EXCEPTION_CODE_SUCCESS: number;
    static EXCEPTION_CODE_ILLEGAL_FUNCTION: number;
    static EXCEPTION_CODE_ILLEGAL_DATA_ADDRESS: number;
    static EXCEPTION_CODE_ILLEGAL_DATA_VALUE: number;
    static EXCEPTION_CODE_SLAVE_DEVICE_FAILURE: number;
    static EXCEPTION_CODE_ACKNOWLEDGE: number;
    static EXCEPTION_CODE_SLAVE_DEVICE_BUSY: number;
    static EXCEPTION_CODE_MEMORY_PARITY_ERROR: number;
    static EXCEPTION_CODE_GATEWAY_PATH_UNAVAILABLE: number;
    static EXCEPTION_CODE_GATEWAY_TARGET_DEVICE_FAILED_TO_RESPOND: number;
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
    /**
     * writeLowLevel
     * @param messageLength
     * @param messageChunkOffset
     * @param messageChunkData
     * @param returnCallback
     * @param errorCallback
     */
    writeLowLevel(messageLength: number, messageChunkOffset: number, messageChunkData: string, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * readLowLevel
     * @param length
     * @param returnCallback
     * @param errorCallback
     */
    readLowLevel(length: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * enableReadCallback
     * @param returnCallback
     * @param errorCallback
     */
    enableReadCallback(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * disableReadCallback
     * @param returnCallback
     * @param errorCallback
     */
    disableReadCallback(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * isReadCallbackEnabled
     * @param returnCallback
     * @param errorCallback
     */
    isReadCallbackEnabled(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
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
    setRS485Configuration(baudrate: number, parity: number, stopbits: number, wordlength: number, duplex: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * getRS485Configuration
     * @param returnCallback
     * @param errorCallback
     */
    getRS485Configuration(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * setModbusConfiguration
     * @param slaveAddress
     * @param masterRequestTimeout
     * @param returnCallback
     * @param errorCallback
     */
    setModbusConfiguration(slaveAddress: number, masterRequestTimeout: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * getModbusConfiguration
     * @param returnCallback
     * @param errorCallback
     */
    getModbusConfiguration(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * setMode
     * @param mode
     * @param returnCallback
     * @param errorCallback
     */
    setMode(mode: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * getMode
     * @param returnCallback
     * @param errorCallback
     */
    getMode(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * setCommunicationLEDConfig
     * @param config
     * @param returnCallback
     * @param errorCallback
     */
    setCommunicationLEDConfig(config: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * getCommunicationLEDConfig
     * @param returnCallback
     * @param errorCallback
     */
    getCommunicationLEDConfig(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * setErrorLEDConfig
     * @param config
     * @param returnCallback
     * @param errorCallback
     */
    setErrorLEDConfig(config: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * getErrorLEDConfig
     * @param returnCallback
     * @param errorCallback
     */
    getErrorLEDConfig(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * setBufferConfig
     * @param sendBufferSize
     * @param receiveBufferSize
     * @param returnCallback
     * @param errorCallback
     */
    setBufferConfig(sendBufferSize: number, receiveBufferSize: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * getBufferConfig
     * @param returnCallback
     * @param errorCallback
     */
    getBufferConfig(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * getBufferStatus
     * @param returnCallback
     * @param errorCallback
     */
    getBufferStatus(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * enableErrorCountCallback
     * @param returnCallback
     * @param errorCallback
     */
    enableErrorCountCallback(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * disableErrorCountCallback
     * @param returnCallback
     * @param errorCallback
     */
    disableErrorCountCallback(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * isErrorCountCallbackEnabled
     * @param returnCallback
     * @param errorCallback
     */
    isErrorCountCallbackEnabled(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * getErrorCount
     * @param returnCallback
     * @param errorCallback
     */
    getErrorCount(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * getModbusCommonErrorCount
     * @param returnCallback
     * @param errorCallback
     */
    getModbusCommonErrorCount(returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * modbusSlaveReportException
     * @param requestID
     * @param exceptionCode
     * @param returnCallback
     * @param errorCallback
     */
    modbusSlaveReportException(requestID: number, exceptionCode: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * modbusSlaveAnswerReadCoilsRequestLowLevel
     * @param requestID
     * @param coilsLength
     * @param coilsChunkOffset
     * @param coilsChunkData
     * @param returnCallback
     * @param errorCallback
     */
    modbusSlaveAnswerReadCoilsRequestLowLevel(requestID: number, coilsLength: number, coilsChunkOffset: number, coilsChunkData: string, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * modbusMasterReadCoils
     * @param slaveAddress
     * @param startingAddress
     * @param count
     * @param returnCallback
     * @param errorCallback
     */
    modbusMasterReadCoils(slaveAddress: number, startingAddress: number, count: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * write
     * @param message
     * @param returnCallback
     * @param errorCallback
     */
    write(message: string[], returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
    /**
     * read
     * @param length
     * @param returnCallback
     * @param errorCallback
     */
    read(length: number, returnCallback?: TFAnyFunction, errorCallback?: TFErrorCallback): void;
}
