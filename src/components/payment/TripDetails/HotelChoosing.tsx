import { Card, CardContent } from "@/components/ui/card"
import { Locale } from "@/language/getLanguage"
import { Star } from "lucide-react"
import { type FC } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useBookingStore } from "@/store/BookingProvider"

interface HotelChoosingProps {
  hotelTypes: any[]
  locale: Locale
}

const HotelChoosing: FC<HotelChoosingProps> = ({ hotelTypes, locale }) => {
  const { setTripDetails } = useBookingStore((state) => state)

  const handleHotelChange = (hotelName: string, hotelPrice: number) => {
    setTripDetails({
      hotel: hotelName,
      hotelCost: Number(hotelPrice),
    })
  }

  return (
    <Card className="bg-lightBlue">
      <div className="bg-primary px-6 py-4 text-center text-white text-lg md:text-2xl font-semibold">
        <h1>Hotel Choosing</h1>
      </div>
      <CardContent>
        <RadioGroup
          defaultValue={hotelTypes[0].name[locale]}
          onValueChange={(e) => {
            const selectedHotel = hotelTypes.find(
              (hotel) => hotel.name[locale] === e
            )
            setTripDetails({
              hotel: e,
              roomTypes: selectedHotel.rooms,
              roomCost: Number(
                selectedHotel.rooms[0].price.discounted_price[locale]
              ),
            })

            handleHotelChange(
              selectedHotel.name[locale],
              selectedHotel.price.discounted_price
                ? selectedHotel.price.discounted_price[locale]
                : 0
            )
          }}
        >
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
                <p className="text-sm md:text-base text-grey">
                  {hotel.description[locale]}
                </p>
              </div>
              <div className="text-right text-primary md:text-lg font-medium">
                <RadioGroupItem
                  value={hotel.name[locale]}
                  id={hotel.name[locale]}
                />
                {hotel.price.discounted_price ? (
                  <p>
                    {hotel.price.currency_symbol[locale]}
                    {hotel.price.discounted_price[locale]} Extra
                  </p>
                ) : (
                  <p>{hotel.price.currency_symbol[locale]}0</p>
                )}
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

export default HotelChoosing
