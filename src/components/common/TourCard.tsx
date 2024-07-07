import React from "react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/lib/sanity/sanity-image"
import { Button } from "../ui/button"

import { cardButtonTn, saveTn } from "@/lib/utils"
import { CarouselItem } from "../ui/carousel"
import { Calendar, Globe, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter } from "../ui/card"

const TourCard = ({
  pic,
  tourType,
  label,
  days,
  cities,
  countries,
  mobilePic,
  old_price,
  price,
  link,
  locale,
}: any) => {
  // Function to format the price with a comma after every third digit
  const formattedPrice = (price: any) => {
    // if (price === typeof string) {
    const convPrice = parseInt(price)

    // }
    return convPrice.toLocaleString()
  }

  return (
    <CarouselItem className="basis-3/4 md:basis-1/3 xl:basis-1/4">
      <Link href={`/${locale}/tours${link}`} className="relative">
        {label && (
          <span className="bg-red absolute m-3 right-0 px-3 py-1 text-white font-bold text-[10px] md:text-[12px] md:leading-5 rounded-full">
            {label}
          </span>
        )}
        <Card className="h-full flex flex-col justify-between">
          <Image
            width={1000}
            height={1000}
            src={urlFor(pic)}
            alt={`pic-${link}`}
            className="h-44 md:h-56 object-cover w-full"
          />
          <CardContent>
            <h1 className="text-base md:text-xl text-darkBlue font-bold">
              {" "}
              {tourType}
            </h1>
            <div className="flex flex-wrap md:items-center justify-between gap-2 text-grey my-2 text-xs md:text-sm">
              <div className="flex items-center  ">
                <Calendar className="size-5" />
                <span>{days}</span>
              </div>
              <div className="flex items-center md:text-sm ">
                <Globe className="size-5" />
                <span>{countries} Countries</span>
              </div>
              <div className="flex items-center md:text-sm ">
                <MapPin className="size-5" />
                <span>{cities} Cities</span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <h1 className="line-through text-grey font-semibold text-xs md:text-base">
                ${formattedPrice(old_price)}
              </h1>

              <div className="text-right">
                <h1 className="text-base md:text-lg font-black text-darkBlue ">
                  From ${formattedPrice(price)}
                </h1>
                <h1 className="text-xs text-red font-bold ">
                  {/* @ts-ignore */}
                  {saveTn?.[locale]} ${formattedPrice(old_price - price)}
                </h1>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full rounded-full">
              {/* @ts-ignore */}
              {cardButtonTn?.[locale]}
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </CarouselItem>
  )
}

export default TourCard
