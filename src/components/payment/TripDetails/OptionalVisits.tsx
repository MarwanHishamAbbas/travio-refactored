import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useStepper } from "@/components/ui/stepper"

import { Locale } from "@/language/getLanguage"
import { urlFor } from "@/lib/sanity/sanity-image"
import { useBookingStore } from "@/store/BookingProvider"
import Image from "next/image"
import { type FC } from "react"

interface OptionalVisitsProps {
  locale: Locale
}

const OptionalVisits: FC<OptionalVisitsProps> = ({ locale }) => {
  const { tripData, optionalVisits, toggleOptionalVisit, calculateAddOnes } =
    useBookingStore((state) => state)

  const { nextStep } = useStepper()

  const handleVisitChnage = (cityIndex: number, visitIndex: number) => {
    toggleOptionalVisit(cityIndex, visitIndex)

    calculateAddOnes()
  }

  return (
    <>
      <Card className="bg-lightBlue">
        <div className="bg-primary px-6 py-4 text-white text-lg md:text-2xl font-semibold">
          <h1>Optional Visits</h1>
        </div>
        <CardContent>
          {optionalVisits.map((optionalVisit, cityidx) => {
            const selectedCount = optionalVisit.visits.filter(
              (visit) => visit.selected
            ).length
            const maxCount = optionalVisit.count
            return (
              <div key={cityidx} className=" border-b border-orange py-6 ">
                <div className="gap-2 md:gap-4 flex flex-col md:flex-row md:items-center md:justify-between w-full  font-medium text-primary">
                  <h3 className="text-2xl">
                    {optionalVisit?.city_name?.[locale]} Tours
                  </h3>
                  <p>
                    Choose up to ({selectedCount} / {maxCount})
                  </p>
                </div>
                {optionalVisit.visits.map((visit, visitidx) => (
                  <div
                    key={visitidx}
                    className="flex items-center justify-between py-4 "
                  >
                    <div className="gap-2 md:gap-4 flex flex-col">
                      <div className="flex items-end justify-between">
                        <div className="flex md:items-center gap-2 flex-col md:flex-row">
                          <Image
                            src={urlFor(visit?.image.asset._ref)}
                            alt={visit.image.alt[locale]}
                            width={1000}
                            height={1000}
                            className=" size-20 md:w-36 md:h-24 bg-grey object-cover rounded-2xl"
                          />
                          <div>
                            <h3 className="text-xl font-medium">
                              {visit?.title[locale]}
                            </h3>
                            <p className="text-xs md:text-sm text-grey md:w-3/4">
                              {visit?.description[locale]}
                            </p>
                          </div>
                        </div>
                        <div className="text-right text-primary md:text-lg font-medium">
                          <Checkbox
                            checked={visit.selected || false}
                            onClick={() => {
                              handleVisitChnage(cityidx, visitidx)
                            }}
                            disabled={
                              !visit.selected && selectedCount >= maxCount
                            }
                          />
                          <p className="whitespace-nowrap">
                            {tripData.currency}
                            {Number(
                              visit?.price.discounted_price?.[locale] ?? 0
                            )}{" "}
                            Extra
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </CardContent>
      </Card>
      <div className="flex flex-col gap-6 p-10 rounded-2xl border border-darkBlue/10">
        <h3 className="md:text-2xl text-base font-bold text-darkBlue">
          Would you like help with extras?
        </h3>
        <div className="md:text-base text-xs leading-5 font-medium text-grey flex flex-col gap-5">
          <p>
            We can help you book transfers, accommodation, insurance and flights
            (note: flights and insurance are only available in some regions).
          </p>
          <p>
            Contact our adventure consultants via phone or live chat to discuss
            your options.
          </p>
        </div>
      </div>
      <div className="text-right">
        <Button className=" rounded-full w-2/5" size={"lg"} onClick={nextStep}>
          Next
        </Button>
      </div>
    </>
  )
}

export default OptionalVisits
