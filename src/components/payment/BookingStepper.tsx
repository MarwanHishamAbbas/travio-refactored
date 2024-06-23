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

interface BookingStepperProps {
  tourData: any
  locale: Locale
}

const BookingStepper: FC<BookingStepperProps> = ({ tourData, locale }) => {
  const { setTripData, setTripDetails } = useBookingStore((state) => state)
  useEffect(() => {
    setTripData({
      tripData: {
        image: tourData.hero_section.image,
        title: tourData.hero_section.title[locale],
        days: tourData.overview_card.duration[locale],
        countries: tourData.overview_card.countries,
        cities: tourData.overview_card.cities,
        startDate: tourData.timeline.timeline.start_date,
        endDate: tourData.timeline.timeline.end_date,
        initialPrice: tourData.overview_card.price.initial_price[locale],
        discountedPrice: tourData.overview_card.price.discounted_price[locale],
        currency: tourData.overview_card.price.currency_symbol[locale],
      },
    })
    setTripDetails({
      totalCost: tourData.overview_card.price.discounted_price[locale],
    })
  }, [
    locale,
    setTripData,
    setTripDetails,
    tourData.hero_section.image,
    tourData.hero_section.title,
    tourData.overview_card.cities,
    tourData.overview_card.countries,
    tourData.overview_card.duration,
    tourData.overview_card.price.currency_symbol,
    tourData.overview_card.price.discounted_price,
    tourData.overview_card.price.initial_price,
    tourData.timeline.timeline.end_date,
    tourData.timeline.timeline.start_date,
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
