import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

export const AddressSchema = z.object({
    lineOne: z.string(),
    lineTwo: z.string().nullable(),
    country: z.string(),
    city: z.string(),
    zip: z.string().length(6),
    userId: z.number()
})

export const UpdateUserSchema = z.object({
    name: z.string().optional(),
    defaultShippingAddress: z.number().nullable(),
    defaultBillingAddress: z.number().nullable()
})
