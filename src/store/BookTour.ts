import { createStore } from "zustand/vanilla"

type LocaleProps = { en: string; por: string; es: string }

export type BookingTourState = {
  adults: number
  children: number
  hotel: string
  room: string
  roomSharingName?: string
  optionalVisits: {
    city_name: LocaleProps
    visits: {
      image: {
        alt: LocaleProps
        asset: { _ref: string; _type: string }
      }
      description: LocaleProps
      title: LocaleProps
      price: {
        discounted_price: LocaleProps
      }
      selected?: boolean
    }[]

    count: number
  }[]
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
      number: string
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
    name: LocaleProps
    description: LocaleProps
    price: {
      discounted_price: LocaleProps
    }
  }[]
  hotelCost: number
  roomCost: number
  addOnes: number
  totalCost: number
  seletectedVisits: { cityName: string; visitName: string }[]
}

export type BookingActions = {
  setTripDetails: (newState: Partial<BookingTourState>) => void
  toggleOptionalVisit: (cityIndex: number, visitIndex: number) => void
  calculateAddOnes: () => void
  getSelectedVisits: () => {
    city_name: LocaleProps
    visit: { title: LocaleProps; description: LocaleProps; price: LocaleProps }
  }[]
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
    mobile: { code: "", number: "" },
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
  seletectedVisits: [],
  hotelCost: 0,
  roomCost: 0,
  addOnes: 0,
  totalCost: 0,
}

export const createBookingStore = (
  initState: BookingTourState = defaultInitState
) => {
  return createStore<BookingStore>()((set, get) => ({
    ...initState,

    setTripDetails: (newState) =>
      set((state) => ({
        ...state,
        ...newState,
      })),
    toggleOptionalVisit: (cityIndex: number, visitIndex: number) =>
      set((state) => {
        const newVisits = state.optionalVisits.map((city, cIndex) => {
          if (cIndex === cityIndex) {
            return {
              ...city,
              visits: city.visits.map((visit, vIndex) =>
                vIndex === visitIndex
                  ? { ...visit, selected: !visit.selected }
                  : visit
              ),
            }
          }
          return city
        })

        return { optionalVisits: newVisits }
      }),

    calculateAddOnes: () =>
      set((state) => {
        const addOnes = state.optionalVisits.reduce((total, city) => {
          const selectedVisits = city.visits.filter((visit) => visit.selected)
          const cityTotal = selectedVisits.reduce(
            (citySum, visit) =>
              citySum + parseFloat(visit.price.discounted_price.en),
            0
          )
          return total + cityTotal
        }, 0)
        return { addOnes }
      }),
    getSelectedVisits: () => {
      const state = get()
      return state.optionalVisits.flatMap((city) =>
        city.visits
          .filter((visit) => visit.selected)
          .map((visit) => ({
            city_name: city.city_name,
            visit: {
              title: visit.title,
              description: visit.description,
              price: visit.price.discounted_price,
            },
          }))
      )
    },
  }))
}
