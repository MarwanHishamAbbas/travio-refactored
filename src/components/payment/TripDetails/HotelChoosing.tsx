import { Card, CardContent } from "@/components/ui/card"
import { Locale } from "@/language/getLanguage"
import { Star } from "lucide-react"
import { type FC } from "react"

interface HotelChoosingProps {
  hotelTypes: any[]
  locale: Locale
}

const HotelChoosing: FC<HotelChoosingProps> = ({ hotelTypes, locale }) => {
  console.log(hotelTypes)
  return (
    <Card className="bg-lightBlue">
      <div className="bg-primary px-6 py-4 text-center text-white text-lg md:text-2xl font-semibold">
        <h1>Hotel Choosing</h1>
      </div>
      <CardContent>
        {hotelTypes.map((hotel: any, idx: number) => (
          <div
            key={idx}
            className="flex items-center justify-between border-b border-orange py-6 "
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-medium">{hotel.name[locale]}</h3>
              <div className="flex gap-1">
                {[...Array(hotel.rating)].map((_, idx) => {
                  return (
                    <Star
                      className="fill-orange stroke-orange size-5"
                      key={idx}
                    />
                  )
                })}
              </div>
              <p>{hotel.description[locale]}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default HotelChoosing
