import { type FC } from "react"

import Image from "next/image"
import { urlFor } from "@/lib/sanity/sanity-image"
import { useBookingStore } from "@/store/BookingProvider"
import { Calendar, Globe2, MapPin } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface SideBarProps {}

const SideBar: FC<SideBarProps> = ({}) => {
  const {
    tripData,
    adults,
    children,
    totalCost,
    roomCost,
    hotelCost,
    addOnes,
  } = useBookingStore((state) => state)

  return (
    <aside className=" lg:flex flex-col h-fit md:sticky top-10 gap-8 mt-10 md:mt-0">
      <Card className="bg-lightBlue w-full">
        <CardContent className="">
          <div className=" space-y-2 ">
            <h3 className="text-2xl font-semibold text-center">
              Selected Tour
            </h3>
            <div className="h-0.5 bg-orange w-1/4 mx-auto"></div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {tripData.image.asset._type.length !== 0 && (
                <Image
                  src={urlFor(tripData?.image.asset._ref)}
                  alt="Image"
                  width={1000}
                  height={1000}
                  className=" h-64 object-cover "
                />
              )}
              <div className="p-4 space-y-4">
                <h3 className="text-base md:text-lg font-semibold">
                  {tripData.title}
                </h3>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-grey">
                  <div className="flex items-center md:text-sm ">
                    <Calendar className="size-5" />
                    <span>{tripData.days}</span>
                  </div>
                  <div className="flex items-center md:text-sm ">
                    <Globe2 className="size-5" />
                    <span>{tripData.countries} Countries</span>
                  </div>
                  <div className="flex items-center md:text-sm ">
                    <MapPin className="size-5" />
                    <span>{tripData.cities} Cities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-lightBlue hidden lg:block">
        <div className="flex items-center justify-between py-2 px-10 bg-primary text-white text-sm">
          <p>Trip Start</p>
          <p>Trip End</p>
        </div>
        <CardContent className="flex items-center justify-between">
          <p className="text-center">
            {tripData.startDate} <br />{" "}
            <span className="text-sm text-grey">London, UK</span>
          </p>
          <div className="h-10 bg-orange w-0.5 "></div>
          <p className="text-center">
            {tripData.endDate} <br />{" "}
            <span className="text-sm text-grey">London, UK</span>
          </p>
        </CardContent>
      </Card>
      <Card className="bg-lightBlue mt-8 md:mt-0">
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <p>Passengers</p>
            <div>
              <p>{adults} Adults</p>
              <p>{children} Children</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p>Tour Package</p>

            <p>
              {adults + children} x {tripData.currency}
              {tripData.initialPrice}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Hotel Cost</p>

            <p>
              {tripData.currency}
              {hotelCost}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Room Cost</p>

            <p>
              {tripData.currency}
              {roomCost}
            </p>
          </div>
          {addOnes > 0 && (
            <div className="flex justify-between">
              <p>Add Ones</p>
              <p>
                {tripData.currency}
                {addOnes}
              </p>
            </div>
          )}
          <div className="flex justify-between">
            <p>Discount</p>

            <p className="text-green-400">
              -{tripData.currency}
              {(adults + children) * tripData.initialPrice -
                (adults + children) * tripData.discountedPrice}
            </p>
          </div>
          <div className="h-0.5 bg-orange w-full mx-auto"></div>
          <div className="flex justify-between">
            <p>Total Price</p>
            <p className="text-xl font-semibold">
              {tripData.currency}
              {Number(totalCost + addOnes + roomCost + hotelCost)}
            </p>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Add Promo Code" />
            <Button>Apply</Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}

export default SideBar
