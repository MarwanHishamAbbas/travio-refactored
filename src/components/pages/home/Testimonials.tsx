"use client"

import MaxWidth from "@/components/common/MaxWidth"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { urlFor } from "@/lib/sanity/sanity-image"
import { truncateChar } from "@/lib/utils"
import { getTestimonials } from "@/query/common"
import { Star } from "lucide-react"
import Image from "next/image"
import React from "react"
import useSWR from "swr"

const Testimonials = ({ locale }: { locale: string }) => {
  const { data, isLoading } = useSWR("getTestimonials", getTestimonials)

  return (
    <div className=" bg-lightBlue py-14 mt-16 font-satoshi">
      <MaxWidth className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
        <div>
          <h2 className="text-xl md:text-4xl font-bold">
            <span className="text-primary md:text-black">
              {data?.sections[0].title[locale]?.substring(0, 16)}
            </span>
            <span className="text-primary">
              {data?.sections[0].title[locale]?.substring(16)}
            </span>
          </h2>
          <p className="text-sm font-medium md:text-base my-4 text-grey ">
            {data?.sections[0].subtitle?.[locale]}
          </p>
          {isLoading ? null : (
            <Image
              width={1000}
              height={230}
              src={urlFor(data?.sections[0].image)}
              alt="Image"
              className={" w-full h-[220px] object-cover rounded-3xl"}
            />
          )}
        </div>

        <Carousel className="col-span-3 self-center">
          <CarouselContent>
            {data?.sections[0].testimonials?.map((item: any, index: any) => (
              <CarouselItem key={index} className="md:basis-1/3 space-y-4">
                <div className="flex">
                  {[...Array(5)].map((_, idx) => {
                    return (
                      <Star
                        className="fill-orange stroke-orange size-5"
                        key={idx}
                      />
                    )
                  })}
                </div>
                <h1 className="font-bold">{item?.title[locale]}</h1>
                <p className="text-sm md:text-base">
                  {truncateChar(item.text[locale], 220)}
                </p>
                <div className="flex items-center gap-2">
                  <Image
                    alt={`country-${index}`}
                    className="size-10"
                    src={urlFor(item?.avatar?.asset?._ref)}
                    width={38}
                    height={38}
                    priority
                  />
                  <div className=" font-satoshi ">
                    <h4 className="font-bold text-darkBluetext-sm ">
                      {item?.name}
                    </h4>

                    <p className="text-xs text-grey">{item.time[locale]}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="text-center md:text-end space-x-4 mt-6">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        <Image
          src="/airp.png"
          height={200}
          width={200}
          quality={100}
          priority
          className="absolute -left-10 md:-left-5 -bottom-[160px] md:-bottom-[255px] max-md:w-[140px] max-md:rotate-12"
          alt="aeroplane"
        />
      </MaxWidth>
    </div>
  )
}

export default Testimonials
