import MaxWidth from "@/components/common/MaxWidth"
import SectionHeader from "@/components/common/SectionHeader"
import TourCard from "@/components/common/TourCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { SanityFeaturedToursSection } from "@/types/sanity"
import React from "react"
// import Image from "next/image";
// import Link from "next/link";

// import { urlFor } from "../../../../sanity/lib/client";

export type FeaturedTour = {
  data: SanityFeaturedToursSection
}

const FeatureTourSection = (FeaturedTour: any) => {
  const { locale } = FeaturedTour

  return (
    <MaxWidth className="text-black w-full mt-16">
      <SectionHeader
        subtitle={FeaturedTour?.data.tagline?.en}
        title={FeaturedTour?.data.title?.en}
        centerLine
      />
      {FeaturedTour?.data.tour_cards && (
        <div className=" relative ">
          <Carousel className={"gap-6 pb-3"}>
            <CarouselContent>
              {Array.isArray(FeaturedTour?.data?.tour_cards) &&
                FeaturedTour?.data?.tour_cards.length > 0 &&
                FeaturedTour?.data?.tour_cards?.map((item: any, i: number) => (
                  <CarouselItem
                    key={i}
                    className="basis-3/4 md:basis-1/3 xl:basis-1/4"
                  >
                    <TourCard
                      locale={locale}
                      link={item?.content?.slug?.current}
                      label={item?.badge_content?.[locale]}
                      pic={item?.content?.hero_section?.image.asset._ref}
                      mobilePic={
                        item?.content?.hero_section?.image.mobile.asset._ref
                      }
                      tourType={item?.content?.hero_section?.title?.[locale]}
                      days={item?.content?.overview_card?.duration?.[locale]}
                      cities={item?.content?.overview_card?.cities}
                      countries={item?.content?.overview_card?.countries}
                      old_price={
                        item?.content?.price_overrides[0]?.price?.initial_price[
                          locale
                        ]
                      }
                      price={
                        item?.content?.price_overrides[0]?.price?.initial_price[
                          locale
                        ]
                      }
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
          <div className=" absolute hidden md:block w-[50px] top-0 p-3 h-full z-[100] bg-gradient-to-r from-transparent  via-[rgba(255,255,255,0.5)] to-white right-0" />
        </div>
      )}
    </MaxWidth>
  )
}

export default FeatureTourSection
