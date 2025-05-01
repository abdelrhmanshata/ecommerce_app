import { Request, Response, NextFunction, RequestHandler } from "express"
import { ErrorCode, HttpException } from "./exceptions/root"
import { InternalException } from "./exceptions/internal-exception"
import { ZodError } from "zod";
import { BadRequestsException } from "./exceptions/bad-request";

export const errorHandler = (handler: RequestHandler): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(error => {
            const exception = error instanceof HttpException
                ? error
                : error instanceof ZodError
                    ?
                    new BadRequestsException("Unprocessable", ErrorCode.BAD_REQUEST, error)
                    : new InternalException("Internal Server Error", error, ErrorCode.INTERNAL_SERVER_ERROR);
            next(exception);
        });
    };
};
