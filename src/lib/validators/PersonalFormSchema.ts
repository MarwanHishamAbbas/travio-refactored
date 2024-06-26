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
  prefix: z.enum(["Mr", "Ms", "Dr"]),
  firstName: z.string().min(1),
  middleName: z.string().min(1),
  lastName: z.string().min(1),
  datePicker: z.object({
    from: z.date(),
    to: z.date(),
  }),
  // nationality: z.string(),
  // email: z.string().email(),
  // mobile: mobileSchema,
  // location: locationSchema,
})

export type TPersonalSchema = z.infer<typeof personlSchema>
