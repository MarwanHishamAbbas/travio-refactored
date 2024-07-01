"use client"

import { type FC } from "react"
import BookItem from "./BookItem"

interface BookListProps {
  bookings: any[]
}

const BookList: FC<BookListProps> = ({ bookings }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {bookings.reverse().map((book, idx: number) => (
        <BookItem book={book} key={idx} />
      ))}
    </div>
  )
}

export default BookList
