import { Router } from "express"
import { signup, login, me } from "../controllers/auth"
import { errorHandler } from "../error-handler"
import authMiddleware from "../middlewares/auth"

const router = Router()

router.post("/signup", errorHandler(signup))
router.post("/login", errorHandler(login))
router.get("/me", authMiddleware, errorHandler(me))

export default router