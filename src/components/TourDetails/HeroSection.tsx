"use client"

import { type FC } from "react"
import MaxWidth from "../common/MaxWidth"
import Image from "next/image"
import { urlFor } from "@/lib/sanity/sanity-image"
import { Locale } from "@/language/getLanguage"
import { PhotoProvider, PhotoView } from "react-photo-view"

interface HeroSectionProps {
  hero_section: any
  locale: Locale
  overview_card: any
}

const HeroSection: FC<HeroSectionProps> = ({
  hero_section,
  overview_card,
  locale,
}) => {
  return (
    <PhotoProvider maskOpacity={0.6}>
      <MaxWidth className="hidden md:block space-y-8">
        <div className="flex gap-6">
          <div className="relative ">
            <div
              className="bottom-0 h-[170px] max-md:h-[100px] max-lg:bottom-10 rounded-b-[16px] max-md:top-[112px] max-lg:rounded-none"
              style={{
                position: "absolute",
                width: "100%",
                background:
                  "linear-gradient(360deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0) 82%)",
                zIndex: 1,
              }}
            />
            <PhotoView src={urlFor(hero_section?.image?.mobile?.asset?._ref)}>
              <Image
                src={urlFor(hero_section.image.asset)}
                alt={hero_section.image.alt?.[locale]}
                width={1000}
                height={212}
                className="lg:rounded-[16px] rounded-none min-h-[480px] max-md:min-h-[212px]  object-cover cursor-pointer"
              />
            </PhotoView>
            <h1 className="hidden lg:block left-8 font-black absolute z-50 bottom-[13px] text-white font-satoshi text-[56px] leading-[66px]">
              {hero_section?.title?.[locale]}
            </h1>
          </div>
          <div className="space-y-7">
            {hero_section.images &&
              hero_section.images.map((image: any, idx: number) => (
                <PhotoView
                  src={image?.asset?._ref ? urlFor(image.asset._ref) : ""}
                  key={idx}
                >
                  <Image
                    className="h-[226px] max-w-[336px] rounded-2xl object-cover cursor-pointer"
                    src={urlFor(image.asset)}
                    alt={hero_section.image.alt?.[locale]}
                    width={1000}
                    height={1000}
                  />
                </PhotoView>
              ))}
          </div>
        </div>
      </MaxWidth>
    </PhotoProvider>
  )
}

export default HeroSection
