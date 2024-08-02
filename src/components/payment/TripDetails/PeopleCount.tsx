import { Card, CardContent } from "@/components/ui/card"
import { useBookingStore } from "@/store/BookingProvider"
import { Minus, Plus } from "lucide-react"
import { useEffect, type FC } from "react"

interface PeopleCountProps {}

const PeopleCount: FC<PeopleCountProps> = ({}) => {
  // const [adultsCount, setAdultsCount] = useState<number>(1)

  const { setTripDetails, adults, children, tripData } = useBookingStore(
    (state) => state
  )

  useEffect(() => {
    setTripDetails({
      totalCost: (adults + children) * tripData.discountedPrice,
    })
  }, [
    adults,
    children,
    setTripDetails,
    tripData.discountedPrice,
    tripData.initialPrice,
  ])

  return (
    <Card className="bg-lightBlue">
      <CardContent className="space-y-6">
        <h3 className="font-semibold text-base md:text-2xl">
          How many people are traveling?
        </h3>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="rounded-md border border-input bg-background px-3 py-2 w-full text-sm text-grey flex justify-between items-center">
            Adults (+12 year)
            <div className="flex items-center gap-2">
              <Minus
                onClick={() =>
                  setTripDetails({ adults: adults > 1 ? adults - 1 : 1 })
                }
                className="size-5 bg-primary stroke-white"
              />
              <span className="text-base text-black">{adults}</span>
              <Plus
                onClick={() =>
                  setTripDetails({ adults: adults < 10 ? adults + 1 : 10 })
                }
                className="size-5 bg-primary stroke-white"
              />
            </div>
          </div>

          <div className="rounded-md border border-input bg-background px-3 py-2 w-full text-sm text-grey flex justify-between items-center">
            Children (3 - 11 year)
            <div className="flex items-center gap-2">
              <Minus
                onClick={() =>
                  setTripDetails({ children: children > 0 ? children - 1 : 0 })
                }
                className="size-5 bg-primary stroke-white"
              />
              <span className="text-base text-black">{children}</span>
              <Plus
                onClick={() =>
                  setTripDetails({
                    children: children < 10 ? children + 1 : 10,
                  })
                }
                className="size-5 bg-primary stroke-white"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PeopleCount
