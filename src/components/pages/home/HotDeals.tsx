import MaxWidth from "@/components/common/MaxWidth"
import SectionHeader from "@/components/common/SectionHeader"
import TourCard from "@/components/common/TourCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const CardsSection = ({ data, locale }: { data: any; locale: string }) => {
  return (
    <MaxWidth className="text-black w-full mt-[50px]">
      <SectionHeader
        subtitle={data?.title?.[locale]}
        title={data?.tagline?.[locale]}
      />
      <div className="h-fit relative z-20 ">
        <Carousel className={"gap-6 pb-3"}>
          <CarouselContent>
            {data.deals.map((data: any, i: number) => (
              <CarouselItem
                key={i}
                className="basis-3/4 md:basis-1/3 xl:basis-1/4"
              >
                <TourCard
                  key={i}
                  locale={locale}
                  link={data?.tour?.slug.current}
                  label={data?.label?.[locale]}
                  pic={data.tour.hero_section.image?.asset._ref}
                  mobilePic={data.tour.hero_section.image.mobile?.asset._ref}
                  tourType={data.tour.hero_section.title?.[locale]}
                  days={data.tour.overview_card?.duration?.[locale]}
                  cities={data.tour.overview_card.cities}
                  countries={data.tour.overview_card.countries}
                  old_price={
                    data.tour.price_overrides[0].price.discounted_price[locale]
                  }
                  price={
                    data.tour.price_overrides[0].price.initial_price[locale]
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className=" absolute hidden md:block w-[50px] top-0 p-3 h-full z-[100] bg-gradient-to-r from-transparent  via-[rgba(255,255,255,0.5)] to-white right-0" />
      </div>
    </MaxWidth>
  )
}

export default CardsSection
