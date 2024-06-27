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

      // Create a new booking in Supabase with status 'pending'
      const { data: booking, error } = await supabase
        .from("bookings")
        .insert([
          {
            tour_id: randomUUID(),
            user_email: "abbbas@gmail.com",
            status: "pending",
          },
        ])
        .select()

      if (error) {
        return { error: error.message }
      } else {
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        metadata: {
          booking_id: booking[0].id,
        },
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
      console.log(session.metadata)
      return { sessionId: session.id }
    }),
})
