import { createTRPCRouter, publicProcedure } from ".."
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { stripe } from "@/lib/stripe/stripe"
export const bookingRouter = createTRPCRouter({
  bookTrip: publicProcedure
    .input(z.object({ totalCost: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                images: [
                  "https://images.unsplash.com/photo-1539768942893-daf53e448371?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                ],
                name: "Tour Booking",
              },
              unit_amount: input.totalCost * 100, // example amount in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        payment_intent_data: {
          capture_method: "manual",
        },

        success_url: `${ctx.headers.get("origin")}/success`,
        cancel_url: `${ctx.headers.get("origin")}`,
      })

      return { sessionId: session.id }
    }),
  approveBooking: publicProcedure
    .input(z.string())
    .mutation(async ({ input: sessionID }) => {
      const supabase = createClient()
      const paymentIntent = await stripe.paymentIntents
        .capture(sessionID)
        .then(async (data) => {
          const { error } = await supabase
            .from("bookings")
            .update({ status: "approved" })
            .eq("session_id", data.id)
            .select()
          if (error) {
            console.log("Server", error)
            return { error }
          }
        })
        .catch((error) => {
          console.log("Error while update supabase row", error)
        })
      return { paymentIntent }
    }),
})
