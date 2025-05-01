import { Router } from "express";
import { addItemToCart, getCartItems, listCartItems, removeFromCart, updateCartItem } from "../controllers/carts";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const cartsRoutes: Router = Router();

cartsRoutes.get("/", authMiddleware, errorHandler(listCartItems));
cartsRoutes.post("/", authMiddleware, errorHandler(addItemToCart));
cartsRoutes.get("/:id", authMiddleware, errorHandler(getCartItems));
cartsRoutes.put("/:id", authMiddleware, errorHandler(updateCartItem));
cartsRoutes.delete("/:id", authMiddleware, errorHandler(removeFromCart));

export default cartsRoutes;
