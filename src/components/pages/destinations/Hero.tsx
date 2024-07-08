import React from "react"

import { usePathname } from "next/navigation"
import { urlFor } from "@/lib/sanity/sanity-image"
import Image from "next/image"
import MaxWidth from "@/components/common/MaxWidth"

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
        className="w-full relative mb-10"
      >
        <Image
          width={1000}
          height={1000}
          className={`w-full max-md:hidden object-cover md:rounded-[24px] rounded-none ${
            hideContent ? " min-h-[420px] " : " h-[420px] "
          }`}
          src={urlFor(data.image.asset._ref)}
          loading="lazy"
          alt={data?.alt?.[locale]}
        />
        <Image
          width={1000}
          height={1000}
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

      <MaxWidth>
        <h3 className="md:text-base leading-6 text-[14px]">
          {data.content?.[locale]}
        </h3>
      </MaxWidth>
    </>
  )
}

export default HeroSection
