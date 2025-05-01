import { Router } from "express";
import { addItemToCart, getCartItems, listCartItems, removeFromCart, updateCartItem } from "../controllers/carts";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const cartsRoutes: Router = Router();

cartsRoutes.use(authMiddleware);

cartsRoutes.get("/", errorHandler(listCartItems));
cartsRoutes.post("/", errorHandler(addItemToCart));
cartsRoutes.get("/:id", errorHandler(getCartItems));
cartsRoutes.put("/:id", errorHandler(updateCartItem));
cartsRoutes.delete("/:id", errorHandler(removeFromCart));

export default cartsRoutes;
