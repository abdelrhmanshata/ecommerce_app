import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { CreateCartSchema, UpdateCartSchema } from "../schema/cart";
import { Product } from "@prisma/client";


export const listCartItems = async (req: Request, res: Response) => {
    const cartItems = await prismaClient.cartItem.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            product: true
        }
    });

    res.status(200).json({ cartItems });
};

export const getCartItems = async (req: Request, res: Response) => {
    const cartItems = await prismaClient.cartItem.findMany({
        where: {
            id: +req.params.id,
            userId: req.user.id
        },
        include: {
            product: true
        }
    });

    res.status(200).json({ cartItems });
};

export const addItemToCart = async (req: Request, res: Response) => {
    const validatedData = CreateCartSchema.parse(req.body)
    let product: Product
    try {
        product = await prismaClient.product.findFirstOrThrow({
            where: { id: validatedData.productId }
        });
    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);
    }

    const cartItem = await prismaClient.cartItem.create({
        data: {
            userId: req.user.id,
            productId: validatedData.productId,
            quantity: validatedData.quantity,
        },
        include: {
            product: true
        }
    });

    res.status(201).json({ cartItem });
};

export const removeFromCart = async (req: Request, res: Response) => {
    try {
        await prismaClient.cartItem.delete({
            where: {
                id: +req.params.id,
                userId: req.user.id
            }
        });
        res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
        throw new NotFoundException("Cart item not found", ErrorCode.PRODUCT_NOT_FOUND);
    }
};

export const updateCartItem = async (req: Request, res: Response) => {
    const validatedData = UpdateCartSchema.parse(req.body);
    try {
        const cartItem = await prismaClient.cartItem.update({
            where: {
                id: +req.params.id,
                userId: req.user.id
            },
            data: {
                quantity: validatedData.quantity
            },
            include: {
                product: true
            }
        });
        res.status(200).json({ cartItem });
    } catch (error) {
        throw new NotFoundException("Cart item not found", ErrorCode.PRODUCT_NOT_FOUND);
    }
};
