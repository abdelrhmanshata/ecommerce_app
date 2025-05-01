import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";


export const getProducts = async (req: Request, res: Response) => {
  const count = await prismaClient.product.count()
  const { page = 1, limit = 10 } = req.query;
  const products = await prismaClient.product.findMany({
    skip: (+page - 1) * +limit,
    take: +limit
  })
  res.status(200).json({ count, data: products })
}

export const createProduct = async (req: Request, res: Response) => {
  const product = await prismaClient.product.create({
    data: { ...req.body, tags: req.body.tags.join(",") }
  })
  res.status(201).json(product)
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    let product = req.body;
    if (product.tags) {
      product.tags = product.tags.join(",")
    }
    const updatedProduct = await prismaClient.product.update({
      where: { id: Number(req.params.id) },
      data: product
    })
    res.status(200).json(updatedProduct)
  } catch (error) {
    throw new NotFoundException("Product not Found", ErrorCode.PRODUCT_NOT_FOUND)
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await prismaClient.product.delete({
    where: { id: +req.params.id },
  })
  res.status(200).json(product)
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prismaClient.product.findFirstOrThrow({
      where: { id: +req.params.id },
    })
    res.status(200).json({ product })
  } catch (error) {
    throw new NotFoundException("Product not Found", ErrorCode.PRODUCT_NOT_FOUND)
  }
}




