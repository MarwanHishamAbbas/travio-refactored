"use client"

import { type FC } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { api } from "@/trpc/TRPCProvider"
interface BookItemProps {
  book: any
}

const BookItem: FC<BookItemProps> = ({ book }) => {
  const { isPending, mutate: approveBooking } =
    api.booking.approveBooking.useMutation({
      onSuccess: async (data) => {
        console.log(data.paymentIntent)
      },
      onError: (error) => {
        console.log(error)
      },
    })

  return (
    <Card>
      <CardHeader>
        <h1>{book.tour.title}</h1>
        <h3>Status: {book.status}</h3>
      </CardHeader>
      <CardContent>price: {book.price}</CardContent>
      <CardFooter>
        {book.status === "approved" ? (
          <Button disabled variant="ghost" className="bg-green-300">
            Approved
          </Button>
        ) : (
          <Button
            disabled={isPending}
            onClick={() => approveBooking(book.session_id)}
          >
            {isPending ? "Approving" : "Approve Booking"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default BookItem
