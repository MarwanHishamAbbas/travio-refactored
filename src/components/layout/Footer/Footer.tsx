"use client"

import Image from "next/image"
import Link from "next/link"
import Footer__links from "./FooterLink"
import Address from "./Address"
import useWindowSize from "@/hooks/useWindows"
import { urlFor } from "@/lib/sanity/sanity-image"
import MaxWidth from "@/components/common/MaxWidth"

const Footer = ({ footer, language }: any) => {
  const windows = useWindowSize()
  const isMobile = windows.width < 768

  const logo = urlFor(footer?.logo?.asset?._ref)
  const mobileLogo = urlFor(footer?.logo?.mobile?.asset?._ref)

  return (
    <div className="w-full bg-lightBlue mt-16">
      <MaxWidth>
        <div className="flex max-lg:flex-wrap justify-between gap-5 lg:gap-[166px] py-5 lg:py-20">
          {/* Left side */}
          <div className="flex flex-col gap-2 mb-0 md:max-w-[364px] w-full">
            <div className="flex flex-col-reverse lg:flex-col justify-start items-start">
              <div className="mt-9 lg:mt-0">
                <div className="flex flex-col gap-1 md:gap-2">
                  <div className="relative w-[198px] flex items-start justify-start md:w-[260px] h-[45px] md:h-[65px]">
                    <Image
                      width={1000}
                      height={1000}
                      src={isMobile ? mobileLogo : logo}
                      className=""
                      alt="Company logo"
                    ></Image>
                  </div>
                  <h1 className="font-normal leading-[22px] text-[14px]">
                    <Link
                      href={`/${language}`}
                      className="flex gap-1 items-center text-[14px] leading-[22px] md:text-base md:font-normal font-medium text-blue"
                    >
                      {footer?.title?.[language]?.substring(0, 13)}
                      <h1 className="md:font-bold font-medium">
                        {footer?.title?.[language]?.substring(13, 30)}
                      </h1>
                    </Link>
                  </h1>
                  <h1 className="md:font-normal font-medium text-[14px] leading-6 md:text-base mt-[18px]">
                    {footer?.description?.[language]}
                  </h1>
                </div>

                <p className="text-grey text-sm md:text-base font-medium md:font-normal leading-[24px] mt-5"></p>
              </div>
              <div className="flex flex-wrap gap-5 md:gap-6 lg:mt-10 mt-0 w-full justify-center lg:justify-start">
                {footer?.socials?.map((item: any, index: number) => {
                  return (
                    <Link href={language + item?.link} key={index}>
                      <Image
                        width={20}
                        height={20}
                        src={urlFor(item.icon)}
                        alt={item?.icon?.alt?.[language]}
                      />
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className="lg:flex hidden  flex-wrap gap-2 px-4 md:px-0 mt-auto">
              {footer?.payment_methods?.map((item: any, index: number) => {
                return (
                  <Image
                    width={50}
                    height={32}
                    src={urlFor(item?.icon)}
                    alt=""
                    key={index}
                    className="w-[50px]  h-[32px]"
                  />
                )
              })}
            </div>
          </div>
          {/* Right side */}
          <div className="grow flex flex-col gap-4 text-darkBlue">
            <div className="grid grid-cols-3 gap-3 justify-between">
              {footer?.link_groups?.map((item: any, index: number) => {
                return (
                  <Footer__links
                    heading={item?.title?.[language]}
                    items={item?.links || []}
                    locale={language}
                    key={index}
                  />
                )
              })}
            </div>
            <div className="hidden md:block border-grey opacity-20" />
            <h1 className="psb-2 font-bold text-base md:text-lg leading-[24px] pt-7">
              {footer?.locations?.title?.[language]}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12 gap-5">
              {footer?.locations?.locations?.map((item: any, index: number) => {
                return (
                  <Address
                    // address={localizedString(item.address)}
                    address={item?.address?.[language] || ""}
                    email={item?.email || ""}
                    // heading={localizedString(item.title)}
                    heading={item?.title?.[language] || ""}
                    // number={localizedString(item.phone_number)}
                    number={item?.phone_number?.[language] || ""}
                    key={index}
                  />
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap lg:hidden  py-5 px-4 md:px-0 gap-2 mt-auto">
          {footer?.payment_methods?.map((item: any, index: number) => {
            return (
              <Image
                width={50}
                height={32}
                src={urlFor(item.icon)}
                alt={item?.icon?.alt?.[language]}
                key={index}
                className="w-[40px] md:w-[50px] h-[26px] md:h-[32px]"
              />
            )
          })}
        </div>
      </MaxWidth>
      <div className="border-blue/20" />
      <h1 className="text-[12px] md:text-base leading-5 md:leading-[24px] text-center py-3">
        {footer?.copyright_text?.[language]}
      </h1>
    </div>
  )
}

export default Footer
