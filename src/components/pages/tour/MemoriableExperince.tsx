import React from "react"
import Image from "next/image"
import Link from "next/link"

import SectionHeader from "@/components/common/SectionHeader"
import MaxWidth from "@/components/common/MaxWidth"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { urlFor } from "@/lib/sanity/sanity-image"

export default function MemorableExperiencesSection({
  data,
  locale,
}: {
  data: any
  locale: string
}) {
  return (
    <div className="flex flex-col mt-16">
      <SectionHeader
        title={data?.tagline?.[locale]}
        subtitle={data?.title?.[locale]}
        centerLine
      />

      <div className="w-full bg-lightBlue">
        <MaxWidth className="flex flex-col  relative py-8 ">
          <Carousel>
            <CarouselContent>
              {data?.experience_cards?.map((card: any, index: number) => (
                <CarouselItem className="basis-3/4 md:basis-1/4 " key={index}>
                  <Card data={card} locale={locale} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="text-end space-x-4 mt-6">
              <CarouselPrevious className="lg:absolute" />
              <CarouselNext className="lg:absolute" />
            </div>
          </Carousel>
        </MaxWidth>
      </div>
    </div>
  )
}

const Card = ({ data, locale }: { data: any; locale: string }) => {
  if (!data) return null

  return (
    <Link href={`/${locale}/wiki${data.wiki?.slug?.current}`}>
      <div className=" rounded-2xl overflow-hidden bg-white shadow-md m-1">
        <div className="md:min-h-[220px] min-h-[180px] relative">
          <Image
            alt=""
            src={urlFor(data?.image?.asset?._ref)}
            quality={100}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 max-lg:{pt-3 pb-[15px] px-[15px] flex flex-col gap-1">
          <p className="font-bold md:text-xl max-md:{text-base} font-satoshi text-darkBlue">
            {data.title?.[locale]}
          </p>
          <p className="md:font-medium md:text-[14px] md:leading-[22px] font-normal text-[12px] leading-5 font-satoshi text-grey">
            {data.description?.[locale]}
          </p>
        </div>
      </div>
    </Link>
  )
}
