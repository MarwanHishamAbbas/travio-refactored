"use client"

/* eslint-disable @next/next/no-img-element */
import React from "react"

import { usePathname } from "next/navigation"
import { urlFor } from "@/lib/sanity/sanity-image"
import { Text } from "@/components/ui/text"

const HeroSection = ({ data, locale }: { data: any; locale: string }) => {
  const pathname = usePathname()

  const pattren = "/destinations/"

  const hideContent = pathname?.match(pattren)

  const linearGradient =
    "linear-gradient(75.52deg, #000000 1.5%, rgba(0, 0, 0, 0.8) 9.18%, rgba(0, 0, 0, 0.7) 15.93%, rgba(0, 0, 0, 0.6) 37.5%, rgba(0, 0, 0, 0) 63.68%)"

  return (
    <>
      <div
        style={{ boxShadow: linearGradient }}
        className="w-full relative mb-10 "
      >
        <img
          className={`lg:w-full max-md:hidden object-cover max-w-[1440px] mx-auto md:rounded-[24px] rounded-none ${
            hideContent ? " min-h-[420px] " : " h-[420px] "
          }`}
          src={urlFor(data.image.asset._ref)}
          loading="lazy"
          alt={data?.alt?.[locale]}
        />
        <img
          className="w-full md:hidden min-h-[200px]"
          src={urlFor(data.image.mobile.asset._ref)}
          loading="lazy"
          alt={data?.alt?.[locale]}
        />
        <h1
          id={"headerGet"}
          className="font-satoshi lg:w-full text-white max-lg:hidden font-black absolute z-50 bottom-12 text-center text-[56px] leading-[72px]"
        >
          {data.header?.[locale]}
        </h1>
      </div>
      <div className="md:px-20 px-5 mt-12 items-center flex flex-col">
        <Text
          variant={"darkblue"}
          fontWeight={"default"}
          className="md:text-base leading-6 text-[14px]"
        >
          {data.content?.[locale]}
        </Text>
      </div>
    </>
  )
}

export default HeroSection
