import { z } from "zod"

const mobileSchema = z.object({
  code: z.string(),
  number: z.number(),
})

const locationSchema = z.object({
  address: z.string(),
  town: z.string(),
  state: z.string(),
  country: z.string(),
})

export const personlSchema = z.object({
  // prefix: z.enum(["Mr", "Ms", "Dr"]),
  firstName: z.string().min(1),
  // middleName: z.string(),
  // lastName: z.string(),
  // birthDate: z.string(), // You can add more specific date validation if needed
  // nationality: z.string(),
  // email: z.string().email(),
  // mobile: mobileSchema,
  // location: locationSchema,
})

export type TPersonalSchema = z.infer<typeof personlSchema>
