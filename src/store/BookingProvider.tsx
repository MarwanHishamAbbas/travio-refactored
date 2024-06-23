"use client"

import { type ReactNode, createContext, useRef, useContext } from "react"
import { useStore } from "zustand"

import { type BookingStore, createBookingStore } from "@/store/BookTour"

export type BookingStoreApi = ReturnType<typeof createBookingStore>

export const BookingStoreContext = createContext<BookingStoreApi | undefined>(
  undefined
)

export interface BookingStoreProviderProps {
  children: ReactNode
}

export const BookingStoreProvider = ({
  children,
}: BookingStoreProviderProps) => {
  const storeRef = useRef<BookingStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createBookingStore()
  }

  return (
    <BookingStoreContext.Provider value={storeRef.current}>
      {children}
    </BookingStoreContext.Provider>
  )
}

export const useBookingStore = <T,>(
  selector: (store: BookingStore) => T
): T => {
  const bookingStoreContext = useContext(BookingStoreContext)

  if (!bookingStoreContext) {
    throw new Error(`useBookingSore must be used within Provider`)
  }

  return useStore(bookingStoreContext, selector)
}
