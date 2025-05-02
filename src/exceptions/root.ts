// message , statusCode, errorCodes , error

export class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCode;

    constructor(message: string, errorCode: ErrorCode, statusCode: number, error: any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    UNPROCESSABLE_ENTITY = 2001,
    INTERNAL_EXCEPTION = 3001,
    INTERNAL_SERVER_ERROR = 5001,
    UNAUTHORIZED = 4001,
    BAD_REQUEST = 4002,
    VALIDATION_ERROR = 4003,
    PRODUCT_NOT_FOUND = 4004,
    ADDRESS_NOT_FOUND = 4005,
    ADDRESS_DOES_NOT_BELONG_TO_USER = 4006,
    ORDER_NOT_FOUND = 4007,
    ORDER_STATUS_NOT_CANCELLED = 4008,
    ORDER_STATUS_NOT_DELIVERED = 4009,
    ORDER_STATUS_NOT_SHIPPED = 4010,
    ORDER_STATUS_NOT_PROCESSING = 4011,
    ORDER_STATUS_NOT_PENDING = 4012,
}








