import MaxWidth from "@/components/common/MaxWidth"
import BookList from "@/components/dashboard/BookList"
import { api } from "@/trpc/server"
import React from "react"

const SuccessPage = async () => {
  const { bookings } = await api.booking.getAllBookings()

  return (
    <MaxWidth className="mt-10">
      <BookList bookings={bookings} />
    </MaxWidth>
  )
}

export default SuccessPage
