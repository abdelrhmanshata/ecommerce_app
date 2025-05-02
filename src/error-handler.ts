import { Request, Response, NextFunction, RequestHandler } from "express"
import { ErrorCode, HttpException } from "./exceptions/root"
import { InternalException } from "./exceptions/internal-exception"
import { ZodError } from "zod";
import { BadRequestsException } from "./exceptions/bad-request";


export const errorHandler = (handler: RequestHandler): RequestHandler => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            const exception = error instanceof HttpException
                ? error
                : error instanceof ZodError
                    ? new BadRequestsException("Unprocessable", ErrorCode.BAD_REQUEST, error)
                    : new InternalException("Internal Server Error", error, ErrorCode.INTERNAL_SERVER_ERROR);
            next(exception);
        }
    };
};


type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
export const asyncErrorHandler = (handler: AsyncHandler): RequestHandler => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            const exception = error instanceof HttpException
                ? error
                : error instanceof ZodError
                    ? new BadRequestsException("Unprocessable", ErrorCode.BAD_REQUEST, error)
                    : new InternalException("Internal Server Error", error, ErrorCode.INTERNAL_SERVER_ERROR);
            next(exception);
        }
    };
};
