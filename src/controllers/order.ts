import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { OrderStatus } from "@prisma/client";

export const createOrder = async (req: Request, res: Response) => {

    return await prismaClient.$transaction(async (tx) => {
        const cartItems = await tx.cartItem.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                product: true
            }
        });

        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        const price = cartItems.reduce((prev, current) => {
            return prev + Number(current.product.price) * current.quantity;
        }, 0);
        const address = await tx.address.findFirst({
            where: {
                id: req.user.defaultShippingAddress ?? undefined
            }
        })
        if (!address) {
            throw new NotFoundException("Address not found", ErrorCode.ADDRESS_NOT_FOUND);
        }
        const order = await tx.order.create({
            data: {
                userId: req.user.id,
                netAmount: price,
                address: address.formattedAddress,
                OrderProduct: {
                    create: cartItems.map(({ productId, quantity }) => ({
                        productId,
                        quantity
                    }))
                }
            }
        });

        const orderEvent = await tx.orderEvent.create({
            data: {
                orderId: order.id,
                status: OrderStatus.PENDING
            }
        });
        await tx.cartItem.deleteMany({
            where: {
                userId: req.user.id
            }
        });
        return res.status(201).json({ order });
    });
};

export const listOrders = async (req: Request, res: Response) => {
    const orders = await prismaClient.order.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            OrderProduct: {
                include: {
                    product: true
                }
            },
            orderEvent: {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 1
            }
        }
    });

    res.status(200).json({ orders });
};

export const getOrder = async (req: Request, res: Response) => {
    const order = await prismaClient.order.findFirstOrThrow({
        where: {
            id: +req.params.id,
            userId: req.user.id
        },
        include: {
            OrderProduct: {
                include: {
                    product: true
                }
            },
            orderEvent: {
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });

    if (!order) {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }

    res.status(200).json({ order });
};

export const cancelOrder = async (req: Request, res: Response) => {
    let order;
    try {
        order = await prismaClient.order.update({
            where: {
                id: +req.params.id,
                userId: req.user.id
            },
            data: {
                status: OrderStatus.CANCELLED
            },
        });
        await prismaClient.orderEvent.create({
            data: {
                orderId: order.id,
                status: OrderStatus.CANCELLED
            }
        });
        return res.status(200).json({ message: "Order cancelled successfully" });
    } catch (error) {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }
};


export const changeStatus = async (req: Request, res: Response) => {
    let order;
    try {
        order = await prismaClient.$transaction(async (tx) => {
            const updatedOrder = await tx.order.update({
                where: {
                    id: +req.params.id
                },
                data: {
                    status: req.body.status as OrderStatus
                }
            });

            await tx.orderEvent.create({
                data: {
                    orderId: updatedOrder.id,
                    status: req.body.status as OrderStatus
                }
            });

            return updatedOrder;
        });

        res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }
};

export const listUserOrders = async (req: Request, res: Response) => {
    let whereClause: any = {
        userId: +req.params.id
    }
    const status = req.query.status as OrderStatus;
    if (status) {
        whereClause = { ...whereClause, status }
    }

    const skip = req.query.skip ? +req.query.skip : 0;
    const take = req.query.take ? +req.query.take : 10;

    const orders = await prismaClient.order.findMany({
        where: whereClause,
        skip,
        take,
        include: {
            OrderProduct: {
                include: {
                    product: true
                }
            },
            orderEvent: {
                orderBy: {
                    createdAt: 'desc'
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const total = await prismaClient.order.count({
        where: {
            userId: req.user.id
        }
    });

    res.status(200).json({
        orders,
        meta: {
            total,
            skip,
            take
        }
    });
};
