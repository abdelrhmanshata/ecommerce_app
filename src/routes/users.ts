import { Router } from "express"
import { errorHandler } from "../error-handler"
import authMiddleware from "../middlewares/auth"
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/users"

const usersRoutes: Router = Router()

// Apply auth middleware to all routes
usersRoutes.use(authMiddleware)

// Address routes
usersRoutes.get("/addresses", errorHandler(listAddress))
usersRoutes.post("/addresses", errorHandler(addAddress))
usersRoutes.delete("/addresses/:id", errorHandler(deleteAddress))

// User routes
usersRoutes.put("/", errorHandler(updateUser))

export default usersRoutes