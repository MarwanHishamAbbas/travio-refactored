import React from "react"
import Image from "next/image"

// import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
// import { urlFor } from '@/sanity/client'
// import { SanityAtGlanceSection } from '@/sanity/types'

import Link from "next/link"
import MaxWidth from "@/components/common/MaxWidth"
import SectionHeader from "@/components/common/SectionHeader"
import { urlFor } from "@/lib/sanity/sanity-image"
// export type AtAGlanceSectionProps = {
//   data: SanityAtGlanceSection;
// };

const CountryFacts = (props: any) => {
  const {
    data: { tagline, title, useful_links_section, facts },
    locale,
  } = props

  return (
    <div className="text-darkBlue mt-16">
      <MaxWidth className="bg-[#F2FAFF] mx-auto max-w-[1312px] px-4 py-12">
        <SectionHeader
          title={tagline?.[locale]}
          subtitle={title?.[locale]}
          centerLine
        />

        <div className="pys-2 grid grid-flow-row grid-cols-2 md:grid-cols-4   md:px-10 gap-x-[15px] md:gap-x-[58px] mt-10 md:mt-16 gap-y-[30px] md:gap-y-12">
          {facts?.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className="flex md:gap-x-3  gap-y-[10px] md:gap-y-0  flex-col md:flex-row w-full  items-center "
              >
                <Image
                  className="max-md:w-[38px] max-md:h-[38px]"
                  alt={item.icon.alt}
                  src={urlFor(item.icon.asset?._ref)}
                  width={48}
                  height={48}
                />
                <div className=" text-center md:text-start  space-y-[2px]">
                  <h3 className="text-base font-satoshi md:text-lg font-medium  leading-normal md:leading-7">
                    {item?.title?.[locale]}
                  </h3>

                  <h3 className="text-xs md:text-sm text-gray font-satoshi  font-normal md:font-medium leading-tight md:leading-normal">
                    {item.subtitle?.[locale]}{" "}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>
        <div className="my-10 md:my-14 m-auto text-[#CFEAFD] bg-[#CFEAFD] w-10/12 " />
        <div>
          <div className="w-fit mx-auto">
            <h4 className="text-xl md:text-[24px] font-satoshi font-bold text-center leading-[30px]">
              {useful_links_section?.title?.[locale]}
            </h4>
            <div className=" md:w-2/3 w-1/2 my-2 text-yellow m-auto  border-b-[#FFBB0B]  rounded-full border-b-[3px]" />
          </div>
          <div className="py-2 grid grid-flow-row grid-cols-1 md:grid-cols-4 mt-10 md:mt-16 md:pl-[53px]  gap-y-[30px] md:gap-y-[42px]">
            {useful_links_section?.useful_links?.map(
              (item: any, index: any) => {
                return (
                  <div key={index}>
                    <Link href={item.url}>
                      <div className="flex font-satoshi items-center gap-x-2 ">
                        <Image
                          quality={100}
                          className="max-md:h-6 max-md:w-6"
                          alt={item.icon.alt?.[locale]}
                          src={urlFor(item.icon.asset._ref)}
                          width={28}
                          height={28}
                        />

                        <span className="text-base md:text-lg md:font-medium text-[18px] leading-normal md:leading-7 ">
                          {item.title?.[locale]}
                        </span>
                      </div>
                    </Link>
                  </div>
                )
              }
            )}
          </div>
        </div>
      </MaxWidth>
    </div>
  )
}

export default CountryFacts
