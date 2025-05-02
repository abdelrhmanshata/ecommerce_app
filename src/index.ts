import express, { Express } from 'express'
import { PrismaClient } from '@prisma/client'

import { PORT } from "./secrets"
import rootRouter from './routes'
import { errorMiddleware } from './middlewares/errors'


// Initialize Prisma Client
export const prismaClient = new PrismaClient(
  { log: ['query'] }
).$extends({
  result: {
    address: {
      formattedAddress: {
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          zip: true
        },
        compute(address) {
          return `${address.lineOne}, ${address.lineTwo}, ${address.city}, ${address.country}, ${address.zip}`
        }
      }
    }
  }
})

const app: Express = express()
// middleware
app.use(express.json())

// Router
app.use("/api", rootRouter);

// middleware
app.use(errorMiddleware)

app.listen(PORT, () => { console.log("App Working!!!") })