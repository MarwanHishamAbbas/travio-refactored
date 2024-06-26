import { createClient } from "@/lib/supabase/server"

import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { stripe } from "@/lib/stripe/stripe"

export async function POST(req: NextRequest, res: NextResponse) {
  const { totalCost } = await req.json()

  const supabase = createClient()

  // Create a new booking in Supabase with status 'pending'
  const { data: booking, error } = await supabase
    .from("bookings")
    .insert([
      {
        tour_id: randomUUID(),
        user_email: "marwanhisham@gmail.com",
        status: "pending",
      },
    ])
    .single()

  if (error) {
    return NextResponse.json({ status: 500, error: error.message })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Tour Booking",
          },
          unit_amount: totalCost * 100, // example amount in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    payment_intent_data: {
      capture_method: "manual",
      metadata: {
        booking_id: booking.id,
      },
    },
    success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get("origin")}`,
  })

  return NextResponse.json({
    status: 200,
    sessionId: session.id,
  })
}
