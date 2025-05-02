import { Router } from "express";
import authRoutes from "./auth";
import usersRoutes from "./users";
import productsRoutes from "./products";
import cartsRoutes from "./carts";
import ordersRoutes from "./order";

const rootRouter: Router = Router()

rootRouter.use("/auth", authRoutes)
rootRouter.use("/users", usersRoutes)
rootRouter.use("/products", productsRoutes)
rootRouter.use("/carts", cartsRoutes)
rootRouter.use("/orders", ordersRoutes)

export default rootRouter;
