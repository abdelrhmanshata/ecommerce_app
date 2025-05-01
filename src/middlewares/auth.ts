import { NextFunction, Request, Response, RequestHandler } from "express"
import { ErrorCode } from "../exceptions/root"
import { UnAuthorizedException } from "../exceptions/unAuthorized"
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets"
import { prismaClient } from ".."

interface JWTPayload {
    userID: number;
}

const authMiddleware: RequestHandler = async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
        return next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as JWTPayload
        const user = await prismaClient.user.findUnique({
            where: { id: payload.userID },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true
            }
        })

        if (!user) {
            return next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
        }

        req.user = user
        next()
    } catch (error) {
        return next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
    }
}

export default authMiddleware

