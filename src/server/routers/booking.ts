import { createTRPCRouter, publicProcedure } from ".."

export const bookingRouter = createTRPCRouter({
  getList: publicProcedure.query(async () => {
    return [10, 20, 30]
  }),
})
