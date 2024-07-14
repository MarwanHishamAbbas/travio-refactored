/* eslint-disable @next/next/no-img-element */
import React from "react"

import Link from "next/link"
import { urlFor } from "@/lib/sanity/sanity-image"

const GallerySect = ({ data, locale }: any) => {
  return (
    <div className="mt-[67px] flex justify-center max-xl:flex-col max-xl:items-center gap-2.5 xl:gap-[30px]">
      <Link href={`/${locale}/${data?.image_0?.link?.url}`} className="">
        <img
          className="md:max-w-[647px] h-[230px] md:h-[430px] max-w-[335px] rounded-[16px]"
          src={urlFor(data?.image_0?.image?.asset?._ref)}
          alt=""
        />
      </Link>

      <div className="flex xl:flex-col gap-2.5 xl:gap-[30px]">
        <Link
          className="md:w-[300px] md:min-h-[200px] min-h-[108px] w-[162px]"
          href={`/${locale}/${data?.image_1?.link?.url}`}
        >
          <img
            src={urlFor(data?.image_1?.image?.asset?._ref)}
            className="md:rounded-[16px] rounded-[8px] w-full h-full object-cover"
            alt=""
          />
        </Link>

        <Link
          className="md:w-[300px] md:min-h-[200px] min-h-[108px] w-[162px]"
          href={data?.image_2?.link?.url}
        >
          <img
            src={urlFor(data?.image_2?.image?.asset?._ref)}
            className="md:rounded-[16px] rounded-[8px] w-full h-full object-cover"
            alt=""
          />
        </Link>
      </div>

      <div className="flex xl:flex-col gap-2.5 xl:gap-[30px]">
        <Link
          className=" md:w-[300px] md:min-h-[200px] h-[108px] w-[162px]"
          href={data?.image_3?.link?.url}
        >
          <img
            src={urlFor(data?.image_3?.image?.asset?._ref)}
            className="md:rounded-[16px] rounded-[8px] w-full h-full object-cover"
            alt=""
          />
        </Link>

        <Link
          className="md:w-[300px] md:min-h-[200px] h-[108px] w-[162px]"
          href={data?.image_4?.link?.url ? data?.image_4?.link?.url : "#"}
        >
          <img
            src={urlFor(data?.image_4?.image?.asset?._ref)}
            className="md:rounded-[16px] rounded-[8px] h-full w-full object-cover"
            alt=""
          />
        </Link>
      </div>
    </div>
  )
}

export default GallerySect
