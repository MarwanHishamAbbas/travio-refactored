import { z } from "zod"
import countries from "../countries.json"

const countryNames = countries.map(
  (country: { name: string }) => country.name as string
)
const countryCodes = countries.map(
  (country: { dial_code: string }) => country.dial_code as string
)

const mobileSchema = z.object({
  // @ts-expect-error
  code: z.enum(countryCodes, {
    required_error: "Must Select Code",
  }),
  number: z.number(),
})

const locationSchema = z.object({
  address: z.string(),
  town: z.string(),
  state: z.string(),
  country: z.string(),
})

export const personlSchema = z.object({
  prefix: z.enum(["Mr", "Ms", "Dr"], {
    required_error: "Must Select a Prefix",
  }),
  firstName: z.string().min(1),
  middleName: z.string().min(1),
  lastName: z.string().min(1),
  datePicker: z.object({
    from: z.date(),
    to: z.date(),
  }),
  // @ts-expect-error
  nationality: z.enum(countryNames, {
    required_error: "Must Select Nationality",
  }),
  email: z.string().email(),
  mobile: mobileSchema,
  location: locationSchema,
})

export type TPersonalSchema = z.infer<typeof personlSchema>
