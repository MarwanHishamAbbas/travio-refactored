import { createStore } from "zustand/vanilla"

export type BookingTourState = {
  adults: number
  children: number
  hotel: string
  room: string
  roomSharingName?: string
  optionalVisits: { cityName: string; visitName: string }[]
  primaryPassenger: {
    prefix: "Mr" | "Ms" | "Dr"
    firstName: string
    middleName: string
    lastName: string
    birthDate: string
    nationality: string
    email: string
    mobile: {
      code: string
      number: number
    }
    location: {
      address: string
      town: string
      state: string
      country: string
    }
  }
  guests: {
    prefix: "Mr" | "Ms" | "Dr"
    firstName: string
    middleName: string
    lastName: string
    birthDate: string
    email: string
  }[]
  tripData: {
    title: string
    image: { asset: { _ref: string; _type: string } }
    days: number
    countries: number
    cities: number
    startDate: string
    endDate: string
    initialPrice: number
    discountedPrice: number
    currency: string
  }
  roomTypes: {
    image: { asset: { _ref: string; _type: string } }
    name: { en: string; por: string; es: string }
    description: { en: string; por: string; es: string }
    price: {
      discounted_price: { en: string; por: string; es: string }
    }
  }[]
  addOnes: number
  totalCost: number
}

export type BookingActions = {
  setTripData: (data: Pick<BookingTourState, "tripData">) => void
  setTripDetails: (newState: Partial<BookingTourState>) => void
  setPersonalDetails?: () => void
}

export type BookingStore = BookingTourState & BookingActions

export const defaultInitState: BookingTourState = {
  adults: 1,
  children: 0,
  hotel: "Basic",
  room: "Single",
  roomSharingName: "",
  optionalVisits: [],
  primaryPassenger: {
    prefix: "Mr",
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    nationality: "",
    email: "",
    mobile: { code: "", number: 0 },
    location: {
      address: "",
      town: "",
      state: "",
      country: "",
    },
  },
  guests: [],
  tripData: {
    image: { asset: { _type: "", _ref: "" } },
    title: "",
    days: 0,
    countries: 0,
    cities: 0,
    startDate: "",
    endDate: "",
    initialPrice: 0,
    discountedPrice: 0,
    currency: "$",
  },
  roomTypes: [],
  addOnes: 0,
  totalCost: 0,
}

export const createBookingStore = (
  initState: BookingTourState = defaultInitState
) => {
  return createStore<BookingStore>()((set) => ({
    ...initState,

    setTripData: ({ tripData }) =>
      set(() => ({
        tripData: {
          cities: tripData.cities,
          countries: tripData.countries,
          days: tripData.days,
          endDate: tripData.endDate,
          image: tripData.image,
          startDate: tripData.startDate,
          title: tripData.title,
          initialPrice: tripData.initialPrice,
          discountedPrice: tripData.discountedPrice,
          currency: tripData.currency,
        },
      })),
    setTripDetails: (newState) =>
      set((state) => ({
        ...state,
        ...newState,
      })),
  }))
}
