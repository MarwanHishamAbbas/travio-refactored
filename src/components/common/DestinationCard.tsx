import React from "react"
// import Image from "next/image";

import { displayNumber } from "@/lib/utils"
import { tourPackagesTn } from "@/lib/utils"

import Image from "next/image"
import { urlFor } from "@/lib/sanity/sanity-image"

const DestinationCard = ({ data, tourCount, locale }: any) => {
  const image = data?.image

  return (
    <div className="w-full h-fit font-satoshi">
      <div className={"  relative"}>
        {image && (
          <Image
            className="h-72 object-cover w-full rounded-3xl"
            src={urlFor(image)}
            alt=""
            priority
            quality={100}
            width={408}
            height={310}
          />
        )}
      </div>
      <h3 className=" text-lg font-bold">{data.destination?.name[locale]}</h3>
      {tourCount && (
        <p className="text-gray font-medium mt-0 md:mt-[2px] text-[12px] leading-5">
          {/* @ts-ignore */}
          {displayNumber(tourCount, tourPackagesTn?.[locale])}
        </p>
      )}
    </div>
  )
}

export default DestinationCard
