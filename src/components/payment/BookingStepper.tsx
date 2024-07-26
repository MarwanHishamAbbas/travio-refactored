"use client"

import { Step, type StepItem, Stepper } from "@/components/ui/stepper"
import { useEffect, type FC } from "react"
import { Locale } from "@/language/getLanguage"
import { useBookingStore } from "@/store/BookingProvider"
import PeopleCount from "./TripDetails/PeopleCount"
import HotelChoosing from "./TripDetails/HotelChoosing"
import { useSearchParams } from "next/navigation"

import RoomTypes from "./TripDetails/RoomTypes"
import OptionalVisits from "./TripDetails/OptionalVisits"
import { getPriceSymbol } from "@/lib/utils"
import PersonalForm from "./PersonalDetails/PersonalForm"
import PayBooking from "./PayBooking/PayBooking"

interface BookingStepperProps {
  tourData: any
  locale: Locale
}

const BookingStepper: FC<BookingStepperProps> = ({ tourData, locale }) => {
  const pricingData = tourData?.sections?.find(
    (section: any) => section._type === "pricing_section"
  )

  const searchParams = useSearchParams()
  const from = Number(searchParams?.get("from"))
  const to = Number(searchParams?.get("to"))

  const { setTripDetails, selectedTrip } = useBookingStore((state) => state)

  console.log(selectedTrip)

  useEffect(() => {
    const startDate = new Date(selectedTrip.from)
    const endDate = new Date(selectedTrip.to)

    setTripDetails({
      totalCost: selectedTrip.price,
      roomTypes: tourData.payment.hotel_types[0].rooms,
      roomCost: Number(
        tourData.payment.hotel_types[0].rooms[0].price.discounted_price[locale]
      ),
      optionalVisits: tourData.payment.extras,
      tripData: {
        image: tourData.hero_section.image,
        title: tourData.hero_section.title[locale],
        days: tourData.overview_card.duration[locale],
        countries: tourData.overview_card.countries,
        cities: tourData.overview_card.cities,
        startDate: startDate.toDateString(),
        endDate: endDate.toDateString(),
        initialPrice: selectedTrip.initialPrice,
        discountedPrice: selectedTrip.price,
        currency: getPriceSymbol(locale),
      },
    })
  }, [
    from,
    to,
    locale,
    pricingData,
    setTripDetails,
    tourData.hero_section.image,
    tourData.hero_section.title,
    tourData.overview_card.cities,
    tourData.overview_card.countries,
    tourData.overview_card.duration,

    tourData.payment.hotel_types,
    tourData.payment.extras,
    selectedTrip,
  ])
  const steps = [
    {
      label: "Trip Extra",
      component: (
        <div className="space-y-8">
          <PeopleCount />
          <HotelChoosing
            hotelTypes={tourData.payment.hotel_types}
            locale={locale}
          />
          <RoomTypes
            defaultRoomTypes={tourData.payment.hotel_types[0].rooms}
            locale={locale}
          />
          <OptionalVisits locale={locale} />
        </div>
      ),
    },
    {
      label: "Your Details",
      component: <PersonalForm />,
    },
    {
      label: "Payment",
      component: <PayBooking />,
    },
  ] satisfies StepItem[]

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper className="md:w-3/4 mx-auto" initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          return (
            <Step key={index} {...stepProps}>
              <div>{stepProps.component}</div>
            </Step>
          )
        })}
      </Stepper>
    </div>
  )
}

export default BookingStepper
