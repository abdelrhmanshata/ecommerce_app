import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products"
import { errorHandler } from "../error-handler"
import authMiddleware from "../middlewares/auth"
import adminMiddleware from "../middlewares/admin"

const productsRoutes: Router = Router()

// Apply auth and admin middleware to all routes
productsRoutes.use([authMiddleware, adminMiddleware])

productsRoutes.get("/", errorHandler(getProducts))
productsRoutes.post("/", errorHandler(createProduct))
productsRoutes.put("/:id", errorHandler(updateProduct))
productsRoutes.delete("/:id", errorHandler(deleteProduct))
productsRoutes.get("/:id", errorHandler(getProductById))

export default productsRoutes