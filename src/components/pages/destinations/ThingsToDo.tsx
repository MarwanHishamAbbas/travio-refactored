import React from "react"

import Link from "next/link"

// import Container from "@/components/molecules/container";

import { Button } from "@/components/ui/button"
import SectionHeader from "@/components/common/SectionHeader"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { urlFor } from "@/lib/sanity/sanity-image"
import Image from "next/image"
import MaxWidth from "@/components/common/MaxWidth"

const TopThingsToDo = (props: any) => {
  const { data, locale } = props

  return (
    <MaxWidth className="mt-16">
      <div>
        <SectionHeader
          title={data.tagline?.[locale]}
          subtitle={data?.title?.[locale]}
          centerLine
        />

        <Carousel className={"gap-6 pb-3 "}>
          <CarouselContent>
            {data?.top_things?.map((item: any, index: any) => {
              if (!item) return null
              return (
                <CarouselItem key={index}>
                  <div className="rounded-[16px] md:max-w-[302px] max-w-[270px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)] bg-white relative h-min font-satoshi">
                    <Link href={item?.link?.en} className="">
                      <Image
                        loading="lazy"
                        width={1000}
                        height={1000}
                        alt={""}
                        className="md:max-w-[302px] max-w-[270px] min-h-[220px] "
                        src={urlFor(item?.image.asset._ref)}
                      />
                    </Link>
                    <div className="p-4 font-satoshi flex flex-col gap-2">
                      <h2 className="my-1 text-xl text-darkBlue max-w-[270px] font-bold max-md:text-base">
                        {item?.title?.[locale]}
                      </h2>
                      <h3 className="md:font-medium text-grey max-w-[270px] md:text-[14px] md:leading-[22px] leading-5 text-[12px] font-normal">
                        {item?.description?.[locale]}
                      </h3>

                      <Link href={item?.link?.en} className="">
                        <Button className="md:h-[42px] h-10 mt-[10px] font-bold w-full rounded-full">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </MaxWidth>
  )
}

export default TopThingsToDo
