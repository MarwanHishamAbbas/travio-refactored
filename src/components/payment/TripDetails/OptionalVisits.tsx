import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

import { Locale } from "@/language/getLanguage"
import { urlFor } from "@/lib/sanity/sanity-image"
import { useBookingStore } from "@/store/BookingProvider"
import Image from "next/image"
import { type FC } from "react"

interface OptionalVisitsProps {
  locale: Locale
}

const OptionalVisits: FC<OptionalVisitsProps> = ({ locale }) => {
  const {
    tripData,
    optionalVisits,
    toggleOptionalVisit,
    calculateAddOnes,
    getSelectedVisits,
  } = useBookingStore((state) => state)

  const handleVisitChnage = (cityIndex: number, visitIndex: number) => {
    toggleOptionalVisit(cityIndex, visitIndex)
    console.log("Seletected", getSelectedVisits())
    calculateAddOnes()
  }

  return (
    <Card className="bg-lightBlue">
      <div className="bg-primary px-6 py-4 text-center text-white text-lg md:text-2xl font-semibold">
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
              <div className="gap-2 md:gap-4 flex items-center justify-between w-full  font-medium text-primary">
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
                  <div className="gap-2 md:gap-4 flex">
                    <Image
                      src={urlFor(visit?.image.asset._ref)}
                      alt={visit.image.alt[locale]}
                      width={1000}
                      height={1000}
                      className=" size-20 md:w-36 md:h-24 bg-grey object-cover rounded-2xl"
                    />
                    <div>
                      <h3 className="text-2xl font-medium">
                        {visit?.title[locale]}
                      </h3>
                      <p className="text-sm md:text-base text-grey md:w-3/4">
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
                      disabled={!visit.selected && selectedCount >= maxCount}
                    />
                    <p>
                      {tripData.currency}
                      {Number(
                        visit?.price.discounted_price?.[locale] ?? 0
                      )}{" "}
                      Extra
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default OptionalVisits
