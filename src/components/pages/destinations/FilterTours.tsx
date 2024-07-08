"use client"

import React, { useEffect } from "react"

// import ToureTags from "./touerTags"

import useSWR from "swr"
import { useSearchParams } from "next/navigation"

// import FilterSidebar from "./FilterSideebar"

import MaxWidth from "@/components/common/MaxWidth"
import SectionHeader from "@/components/common/SectionHeader"
import { Loader2 } from "lucide-react"
import { getTourByTags } from "@/query/tour"
import TourCard from "@/components/common/TourCard"
import ToureTags from "./TourTags"
import FilterSidebar from "./FilterSidebar"

const FilterTourSection = ({ data, locale, tags }: any) => {
  const searchParams = useSearchParams()
  const urlTags = searchParams?.getAll("tag")
  const articalTags = urlTags && urlTags.length > 0 ? urlTags : tags

  const {
    data: tagsToures,
    mutate,
    isLoading,
  } = useSWR("/tagsToures", () => getTourByTags(articalTags))

  useEffect(() => {
    mutate("/blogsTags")
  }, [mutate, searchParams])

  return (
    <MaxWidth className="">
      <SectionHeader
        title={data.title?.[locale]}
        subtitle={data.tagline?.[locale]}
        centerLine
      />

      <section className="flex max-xl:flex-col gap-6">
        <div className="w-full max-w-[302px] max-xl:max-w-full">
          <FilterSidebar
            locale={locale}
            data={data?.destination_tags}
            priceTags={data?.price_tags}
            durationTags={data?.duration_tags}
          />
        </div>

        <div className="max-md:mt-10">
          <ToureTags data={data.tags} locale={locale} />

          <div className="grid xl:grid-cols-3 md:mt-5 mt-10 gap-6 lg:grid-cols-2 max-md:-grid-cols-1">
            {isLoading ? (
              <div className="min-h-[350px] flex items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              Array.isArray(tagsToures) &&
              tagsToures.length > 0 &&
              tagsToures.map((data: any, i: number) => (
                <TourCard
                  key={i}
                  locale={locale}
                  link={data?.slug.current}
                  label={data?.label?.[locale]}
                  pic={data.hero_section.image?.asset._ref}
                  mobilePic={data.hero_section.image.mobile?.asset._ref}
                  tourType={data.hero_section.title?.[locale]}
                  days={data.overview_card?.duration?.[locale]}
                  cities={data.overview_card.cities}
                  countries={data.overview_card.countries}
                  old_price={
                    data.price_overrides[0].price.discounted_price[locale]
                  }
                  price={data.price_overrides[0].price.initial_price[locale]}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </MaxWidth>
  )
}

export default FilterTourSection
