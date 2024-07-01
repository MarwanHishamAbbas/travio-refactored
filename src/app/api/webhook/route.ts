import { stripe } from "@/lib/stripe/stripe"
import Stripe from "stripe"
import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

const handler = async (req: NextRequest) => {
  const signature = req.headers.get("stripe-signature") ?? ""
  const supabase = createClient()

  try {
    let event: Stripe.Event
    event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
    const session = event.data.object as Stripe.Checkout.Session

    if (event.type === "payment_intent.amount_capturable_updated") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      const { hotel_type, room_type, price } = paymentIntent?.metadata
      const primary_passenger = JSON.parse(
        paymentIntent?.metadata?.primary_passenger
      )
      const selected_visits = JSON.parse(
        paymentIntent?.metadata?.selected_visits
      )
      const tour = JSON.parse(paymentIntent?.metadata?.tour)

      const { error } = await supabase
        .from("booking")
        .insert([
          {
            primary_passenger,
            selected_visits,
            tour,
            hotel_type,
            room_type,
            price,
            status: "pending",
            session_id: session.id,
          },
        ])
        .select()

      if (error) {
        return NextResponse.json({ error: error.message })
      }
    }

    return NextResponse.json({ status: 200, event: event })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: "Failed" })
  }
}

export { handler as POST }
