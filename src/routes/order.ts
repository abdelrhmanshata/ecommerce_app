import { Router } from "express";
import { asyncErrorHandler, errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { createOrder, listOrders, getOrder, cancelOrder, listUserOrders, changeStatus } from "../controllers/order";

const ordersRoutes: Router = Router();

// Apply auth middleware to all routes
ordersRoutes.use(authMiddleware);

ordersRoutes.post("/", asyncErrorHandler(createOrder));
ordersRoutes.get("/", asyncErrorHandler(listOrders));
ordersRoutes.get("/:id", asyncErrorHandler(getOrder));
ordersRoutes.put("/:id/cancel", asyncErrorHandler(cancelOrder));

ordersRoutes.get("/users/:id", asyncErrorHandler(listUserOrders));
ordersRoutes.put("/status/:id", asyncErrorHandler(changeStatus));


export default ordersRoutes;
