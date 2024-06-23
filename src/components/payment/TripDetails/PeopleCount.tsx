import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useBookingStore } from "@/store/BookingProvider"
import { useEffect, type FC } from "react"

interface PeopleCountProps {}

const PeopleCount: FC<PeopleCountProps> = ({}) => {
  const { setTripDetails, adults, children, tripData } = useBookingStore(
    (state) => state
  )

  useEffect(() => {
    setTripDetails({
      totalCost:
        (adults + children) * tripData.initialPrice -
        (adults + children) * tripData.discountedPrice,
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
          <Input
            onChange={(e) => {
              setTripDetails({
                adults: Number(e.target.value),
              })
            }}
            type="number"
            defaultValue={1}
            max={10}
            min={1}
            placeholder="Adults (+12 year)"
          />
          <Input
            onChange={(e) =>
              setTripDetails({
                children: Number(e.target.value),
              })
            }
            type="number"
            max={10}
            min={0}
            placeholder="Children (3 - 11 year)"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default PeopleCount
