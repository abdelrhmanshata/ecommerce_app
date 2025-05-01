import { RequestHandler } from "express"
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt"
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets"
import { ErrorCode } from '../exceptions/root';
import { BadRequestsException } from './../exceptions/bad-request';
import { SignUpSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";
import { SafeUser } from "../types/express";

export const signup: RequestHandler = async (req, res, next) => {
    SignUpSchema.parse(req.body)
    const { email, password, name } = req.body;

    let existingUser = await prismaClient.user.findFirst({ where: { email } })
    if (existingUser) {
        throw new BadRequestsException("User already exists!", ErrorCode.USER_ALREADY_EXISTS)
    }

    const user = await prismaClient.user.create({
        data: {
            name, 
            email, 
            password: hashSync(password, 10)
        }
    })

    const { password: _, ...safeUser } = user
    res.status(201).json(safeUser)
}

export const login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    let user = await prismaClient.user.findFirst({ where: { email } })

    if (!user) {
        throw new NotFoundException("User does not exist!", ErrorCode.USER_NOT_FOUND)
    }

    if (!compareSync(password, user.password)) {
        throw new BadRequestsException("Incorrect Password!", ErrorCode.INCORRECT_PASSWORD)
    }

    const { password: _, ...safeUser } = user
    const token = jwt.sign({ userID: user.id }, JWT_SECRET)
    res.status(200).json({ user: safeUser, token })
}

export const me: RequestHandler = async (req, res) => {
    res.status(200).json(req.user)
}
