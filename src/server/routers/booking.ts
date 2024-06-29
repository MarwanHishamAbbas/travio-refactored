import { createTRPCRouter, publicProcedure } from ".."
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { randomUUID } from "crypto"
import { stripe } from "@/lib/stripe/stripe"
export const bookingRouter = createTRPCRouter({
  bookTrip: publicProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      // Create Supabase Server Client
      const supabase = createClient()

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Tour Booking",
              },
              unit_amount: input * 100, // example amount in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        payment_intent_data: {
          capture_method: "manual",
        },

        success_url: `${ctx.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${ctx.headers.get("origin")}`,
      })

      // Create a new booking in Supabase with status 'pending'
      const { error } = await supabase
        .from("bookings")
        .insert([
          {
            tour_id: randomUUID(),
            user_email: "abbbas@gmail.com",
            status: "pending",
            session_id: session.id,
          },
        ])
        .select()

      if (error) {
        return { error: error.message }
      }

      return { sessionId: session.id }
    }),
  approveBooking: publicProcedure.mutation(async ({}) => {
    const supabase = createClient()
    // Update the booking status in Supabase
    const { data: booking, error } = await supabase
      .from("bookings")
      .update({ status: "approved" })
      .eq("id", 37)
      .select()

    if (error) {
      console.log("Server", error)
      return error
    }
    const session = await stripe.checkout.sessions.retrieve(
      booking[0].session_id
    )
    const paymentIntentId = session.payment_intent as string

    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId)
    return { booking, paymentIntent }
  }),
})
