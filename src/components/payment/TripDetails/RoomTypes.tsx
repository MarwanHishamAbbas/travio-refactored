import { Card, CardContent } from "@/components/ui/card"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Locale } from "@/language/getLanguage"
import { urlFor } from "@/lib/sanity/sanity-image"
import { useBookingStore } from "@/store/BookingProvider"
import Image from "next/image"
import { type FC } from "react"

interface RoomTypesProps {
  locale: Locale
  defaultRoomTypes: any
}

const RoomTypes: FC<RoomTypesProps> = ({ locale, defaultRoomTypes }) => {
  const { roomTypes, tripData, setTripDetails } = useBookingStore(
    (state) => state
  )

  console.log(defaultRoomTypes[0])

  const handleRoomChange = (roomName: string, roomPrice: number) => {
    setTripDetails({
      room: roomName,
      roomCost: roomPrice,
    })
  }

  return (
    <Card className="bg-lightBlue">
      <div className="bg-primary px-6 py-4 text-center text-white text-lg md:text-2xl font-semibold">
        <h1>Room Types</h1>
      </div>
      <CardContent>
        <RadioGroup
          defaultValue={defaultRoomTypes[0].name[locale]}
          onValueChange={(e) => {
            const selectedRoom = roomTypes.find(
              (hotel) => hotel.name[locale] === e
            )
            setTripDetails({ room: selectedRoom?.name[locale] })

            handleRoomChange(
              selectedRoom?.name[locale] ?? e,
              selectedRoom?.price.discounted_price
                ? Number(selectedRoom?.price.discounted_price?.[locale])
                : 0
            )
          }}
        >
          {roomTypes.map((roomType, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b border-orange py-6 "
            >
              <div className="gap-2 md:gap-4 flex">
                <Image
                  src={urlFor(roomType?.image.asset._ref)}
                  alt="Image"
                  width={1000}
                  height={1000}
                  className=" size-20 md:w-36 md:h-24 bg-grey object-cover rounded-2xl"
                />
                <div>
                  <h3 className="text-2xl font-medium">
                    {roomType?.name[locale]}
                  </h3>
                  <p className="text-sm md:text-base text-grey">
                    {roomType?.description[locale]}
                  </p>
                </div>
              </div>
              <div className="text-right text-primary md:text-lg font-medium">
                <RadioGroupItem
                  value={roomType?.name[locale]}
                  id={roomType?.name[locale]}
                />
                <p>
                  {tripData.currency}
                  {Number(roomType?.price.discounted_price?.[locale] ?? 0)}{" "}
                  Extra
                </p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

export default RoomTypes
