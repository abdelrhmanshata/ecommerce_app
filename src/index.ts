import express, { Express } from 'express'
import { PrismaClient } from '@prisma/client'

import { PORT } from "./secrets"
import rootRouter from './routes'
import { errorMiddleware } from './middlewares/errors'


// Initialize Prisma Client
export const prismaClient = new PrismaClient(
  { log: ['query'] }
)

const app: Express = express()
// middleware
app.use(express.json())

// Router
app.use("/api", rootRouter);

// middleware
app.use(errorMiddleware)

app.listen(PORT, () => { console.log("App Working!!!") })