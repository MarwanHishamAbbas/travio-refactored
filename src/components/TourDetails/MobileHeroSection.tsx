import { Locale, getDictionary } from "@/language/getLanguage"
import { type FC } from "react"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import Image from "next/image"
import { urlFor } from "@/lib/sanity/sanity-image"
import MaxWidth from "../common/MaxWidth"
import { Button } from "../ui/button"
import Link from "next/link"
import { ArrowDown } from "lucide-react"

interface MobileHeroSectionProps {
  hero_section: any
  overview_card: any
  locale: Locale
}

const MobileHeroSection: FC<MobileHeroSectionProps> = async ({
  hero_section,
  locale,
  overview_card,
}) => {
  const content = await getDictionary(locale)
  return (
    <Carousel className="md:hidden">
      <CarouselContent className="-ml-4">
        {hero_section.images &&
          [hero_section.image, ...hero_section.images].map(
            (image: { asset: string }, idx: number) => (
              <CarouselItem key={idx}>
                <Image
                  className="h-full object-cover w-full"
                  src={urlFor(image.asset)}
                  alt={hero_section.image.alt?.[locale]}
                  width={500}
                  height={500}
                />
              </CarouselItem>
            )
          )}
      </CarouselContent>
      <div className=" bg-lightBlue -translate-y-14 py-8 px-3 rounded-t-3xl">
        <MaxWidth className="space-y-8">
          <h1 className="text-2xl text-center font-bold ">
            {hero_section.title?.[locale]}
          </h1>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-2 rounded-xl text-sm flex items-center gap-2">
              <Image
                className=""
                src="/icons/tour-page/duration.svg"
                alt="Calender Icon"
                width={25}
                height={25}
              />
              <div>
                <p className="text-grey">{content.overviewTn.Duration}</p>
                <strong className="text-base">
                  {overview_card.duration[locale]}
                </strong>
              </div>
            </div>
            <div className="bg-white p-2 rounded-xl text-sm flex items-center gap-2">
              <Image
                className=""
                src="/icons/tour-page/location.svg"
                alt="Calender Icon"
                width={25}
                height={25}
              />
              <div>
                <p className="text-grey">{content.overviewTn.Countries}</p>
                <strong className="text-base">
                  {overview_card.countries} Cities
                </strong>
              </div>
            </div>
            <div className="bg-white p-2 rounded-xl text-sm  gap-2">
              <p className="text-grey">{content.overviewTn.TripRating}</p>
              <div className="flex gap-2">
                <Image
                  className=""
                  src="/icons/tour-page/stars.svg"
                  alt="Calender Icon"
                  width={70}
                  height={70}
                />
                <strong className="text-base">{overview_card.rating}</strong>
              </div>
            </div>
            <div className="bg-white p-2 rounded-xl text-sm flex items-center gap-2">
              <Image
                className=""
                src="/icons/tour-page/card.svg"
                alt="Calender Icon"
                width={25}
                height={25}
              />
              <div>
                <p className="text-grey">{content.overviewTn.PriceFrom}</p>
                <strong>
                  <span className="text-base">
                    {" "}
                    {overview_card.price.currency_symbol[locale]}
                  </span>
                  {overview_card.price.discounted_price[locale]}
                </strong>

                <strong className="line-through opacity-50 ml-2">
                  {overview_card.price.currency_symbol[locale]}
                  {overview_card.price.initial_price[locale]}
                </strong>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button
              size={"lg"}
              className="rounded-full text-lg font-bold gap-2 w-3/4 mx-auto"
            >
              <Link href="#pricing">
                {overview_card.cta_button.label[locale]}
              </Link>
              <ArrowDown />
            </Button>
            <p className="text-sm text-red mt-2 font-bold">
              {overview_card.cta_helper_text[locale]}
            </p>
          </div>
        </MaxWidth>
      </div>
    </Carousel>
  )
}

export default MobileHeroSection
