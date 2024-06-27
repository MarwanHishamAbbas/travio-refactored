// trpc-server/router.ts

import { createCallerFactory, createTRPCRouter } from "./index"
import { bookingRouter } from "./routers/booking"

export const appRouter = createTRPCRouter({
  booking: bookingRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
