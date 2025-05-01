import { Request, Response, NextFunction } from "express"
import { UnAuthorizedException } from "../exceptions/unAuthorized"
import { ErrorCode } from "../exceptions/root"

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if (user.role == "ADMIN") {
        next()
    } else {
        next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED))
    }
}
export default adminMiddleware

