"use client"

import { Step, type StepItem, Stepper } from "@/components/ui/stepper"
import { useEffect, type FC } from "react"
import { Locale } from "@/language/getLanguage"
import { useBookingStore } from "@/store/BookingProvider"
import PeopleCount from "./TripDetails/PeopleCount"
import HotelChoosing from "./TripDetails/HotelChoosing"
import { useSearchParams } from "next/navigation"
import { generatePriceList } from "@/lib/dates"
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

  const data = {
    days: tourData?.timeline?.days,
    disabled: tourData?.timeline?.disabled,
    fixed_days: tourData?.timeline?.fixed_days,
    price: tourData?.overview_card?.price,
    price_overrides: tourData?.price_overrides,
    title: tourData?.hero_section?.title,
    weekly_schedule: tourData?.timeline?.timeline,
  }
  const prices = generatePriceList(data)

  const { setTripDetails } = useBookingStore((state) => state)
  const actual_tour = prices.find((p) => {
    return (
      p.from.getTime() === new Date(from).getTime() &&
      p.to.getTime() === new Date(to).getTime()
    )
  })

  useEffect(() => {
    const startDate = new Date(from)
    const endDate = new Date(to)

    setTripDetails({
      totalCost: Number(actual_tour?.currentPrice[locale]),
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
        initialPrice: Number(actual_tour?.actualPrice[locale]),
        discountedPrice: Number(actual_tour?.currentPrice[locale]),
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
    actual_tour?.actualPrice,
    actual_tour?.currentPrice,
    tourData.payment.hotel_types,
    tourData.payment.extras,
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
      <Stepper className="md:w-3/4 mx-auto" initialStep={2} steps={steps}>
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
