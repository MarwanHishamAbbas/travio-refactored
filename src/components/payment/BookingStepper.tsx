"use client"

import {
  Step,
  type StepItem,
  Stepper,
  useStepper,
} from "@/components/ui/stepper"
import { Button } from "@/components/ui/button"

import { useEffect, type FC } from "react"
import { Locale } from "@/language/getLanguage"
import { useBookingStore } from "@/store/BookingProvider"
import PeopleCount from "./TripDetails/PeopleCount"
import HotelChoosing from "./TripDetails/HotelChoosing"
import { useSearchParams } from "next/navigation"
import { generatePriceList } from "@/lib/dates"
import RoomTypes from "./TripDetails/RoomTypes"

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

  const actual_tour = prices.find((p) => {
    return (
      p.from.getTime() === new Date(from).getTime() &&
      p.to.getTime() === new Date(to).getTime()
    )
  })

  const { setTripData, setTripDetails } = useBookingStore((state) => state)
  useEffect(() => {
    const startDate = new Date(from)
    const endDate = new Date(to)

    setTripData({
      tripData: {
        image: tourData.hero_section.image,
        title: tourData.hero_section.title[locale],
        days: tourData.overview_card.duration[locale],
        countries: tourData.overview_card.countries,
        cities: tourData.overview_card.cities,
        startDate: startDate.toDateString(),
        endDate: endDate.toDateString(),
        initialPrice: actual_tour?.actualPrice[locale],
        discountedPrice: actual_tour?.currentPrice[locale],
        currency: pricingData.price.currency_symbol[locale],
      },
    })
    setTripDetails({
      totalCost: actual_tour?.currentPrice[locale],
      roomTypes: tourData.payment.hotel_types[0].rooms,
      roomCost:
        tourData.payment.hotel_types[0].rooms[0].price.discounted_price[locale],
    })
  }, [
    from,
    to,
    locale,
    pricingData,
    setTripData,
    setTripDetails,
    tourData.hero_section.image,
    tourData.hero_section.title,
    tourData.overview_card.cities,
    tourData.overview_card.countries,
    tourData.overview_card.duration,
    actual_tour?.actualPrice,
    actual_tour?.currentPrice,
    tourData.payment.hotel_types,
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
        </div>
      ),
    },
    { label: "Your Details" },
    { label: "Payment" },
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
        <Footer />
      </Stepper>
    </div>
  )
}

export default BookingStepper
const Footer = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
    isDisabledStep,
  } = useStepper()
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        {/* Booking Button */}
        {hasCompletedAllSteps ? (
          <Button
            onClick={resetSteps}
            variant="outline"
            className=" rounded-full"
            size={"lg"}
          >
            Reset
          </Button>
        ) : (
          <div className="flex items-center justify-center w-full gap-6 md:gap-10">
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              variant="outline"
              className="flex-1 rounded-full"
              size={"lg"}
            >
              Back
            </Button>
            <Button
              className="flex-1 rounded-full"
              size={"lg"}
              onClick={nextStep}
            >
              {isLastStep ? "Book" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
