import MaxWidth from "@/components/common/MaxWidth"
import SectionHeader from "@/components/common/SectionHeader"
import TourCard from "@/components/common/TourCard"
import { Carousel, CarouselContent } from "@/components/ui/carousel"

// const TourCard = dynamic(() => import("@/components/molecules/cards/Card"))

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
                price={data.tour.price_overrides[0].price.initial_price[locale]}
              />
            ))}
          </CarouselContent>
        </Carousel>
        <div className=" absolute hidden md:block w-[50px] top-0 p-3 h-full z-[100] bg-gradient-to-r from-transparent  via-[rgba(255,255,255,0.5)] to-white right-0" />
      </div>
    </MaxWidth>
  )
}

export default CardsSection
