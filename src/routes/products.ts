import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products"
import { errorHandler } from "../error-handler"
import authMiddleware from "../middlewares/auth"
import adminMiddleware from "../middlewares/admin"

const productsRoutes: Router = Router()

productsRoutes.get("/", [authMiddleware, adminMiddleware],errorHandler(getProducts))
productsRoutes.post("/", [authMiddleware, adminMiddleware],errorHandler(createProduct))
productsRoutes.put("/:id", [authMiddleware, adminMiddleware],errorHandler(updateProduct))
productsRoutes.delete("/:id", [authMiddleware, adminMiddleware],errorHandler(deleteProduct))
productsRoutes.get("/:id", [authMiddleware, adminMiddleware],errorHandler(getProductById))

export default productsRoutes