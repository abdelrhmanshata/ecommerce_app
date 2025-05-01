import { Router } from "express"
import { errorHandler } from "../error-handler"
import authMiddleware from "../middlewares/auth"
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/users"

const usersRoutes: Router = Router()

usersRoutes.get("/addresses", authMiddleware, errorHandler(listAddress))
usersRoutes.post("/addresses", authMiddleware, errorHandler(addAddress))
usersRoutes.delete("/addresses/:id", authMiddleware, errorHandler(deleteAddress))

usersRoutes.put("/", authMiddleware, errorHandler(updateUser))

export default usersRoutes