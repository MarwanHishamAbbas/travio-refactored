import { type FC } from "react"
import MaxWidth from "../common/MaxWidth"
import Image from "next/image"
import { urlFor } from "@/lib/sanity/sanity-image"
import { Locale, getDictionary } from "@/language/getLanguage"
import { Button } from "../ui/button"
import Link from "next/link"

interface HeroSectionProps {
  hero_section: any
  locale: Locale
  overview_card: any
}

const HeroSection: FC<HeroSectionProps> = async ({
  hero_section,
  overview_card,
  locale,
}) => {
  const content = await getDictionary(locale)
  return (
    <MaxWidth className="hidden md:block space-y-8">
      <div className="md:grid md:grid-cols-3 md:gap-6 ">
        <div className="relative col-span-2">
          <Image
            src={urlFor(hero_section.image.asset)}
            alt={hero_section.image.alt?.[locale]}
            width={1000}
            height={1000}
            className=" h-full object-cover rounded-2xl"
          />
          <h1 className="hidden md:block md:absolute bottom-4 left-4 text-white text-5xl font-extrabold">
            {hero_section.title?.[locale]}
          </h1>
        </div>
        <div className="space-y-6">
          {hero_section.images &&
            hero_section.images.map((image: { asset: string }, idx: number) => (
              <Image
                className=" rounded-2xl"
                key={idx}
                src={urlFor(image.asset)}
                alt={hero_section.image.alt?.[locale]}
                width={1000}
                height={1000}
              />
            ))}
        </div>
      </div>
      <div className="flex items-center gap-8 bg-lightBlue rounded-2xl p-3 justify-between">
        <div className=" p-3 rounded-xl text-sm flex items-center gap-2">
          <Image
            className=""
            src="/icons/tour-page/duration.svg"
            alt="Calender Icon"
            width={25}
            height={25}
          />
          <div>
            <p className="text-grey">{content.overviewTn.Duration}</p>
            <strong>{overview_card.duration[locale]}</strong>
          </div>
        </div>
        <div className=" p-3 rounded-xl text-sm flex items-center gap-2 border-l ">
          <Image
            className=""
            src="/icons/tour-page/location.svg"
            alt="Calender Icon"
            width={25}
            height={25}
          />
          <div>
            <p className="text-grey">{content.overviewTn.Countries}</p>
            <strong>{overview_card.countries} Cities</strong>
          </div>
        </div>
        <div className=" p-3 rounded-xl text-sm border-l gap-2">
          <p className="text-grey">{content.overviewTn.TripRating}</p>
          <div className="flex gap-2">
            <Image
              className=""
              src="/icons/tour-page/stars.svg"
              alt="Calender Icon"
              width={70}
              height={70}
            />
            <strong>{overview_card.rating}</strong>
          </div>
        </div>
        <div className=" p-3 rounded-xl text-sm flex items-center gap-2 border-l ">
          <Image
            className=""
            src="/icons/tour-page/add-user.svg"
            alt="Calender Icon"
            width={25}
            height={25}
          />
          <div>
            <p className="text-grey">{content.overviewTn.AboutThisTour}</p>
            <strong>{overview_card.about[locale]}</strong>
          </div>
        </div>
        <div className=" p-3 rounded-xl border-l text-sm flex items-center gap-2">
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
              {overview_card.price.currency_symbol[locale]}
              {overview_card.price.discounted_price[locale]}
            </strong>

            <strong className="line-through opacity-50 ml-2">
              {overview_card.price.currency_symbol[locale]}
              {overview_card.price.initial_price[locale]}
            </strong>
          </div>
        </div>
        <div className="text-center border-l pl-3">
          <Button size={"lg"} className="rounded-full" asChild>
            <Link href="#pricing">
              {overview_card.cta_button.label[locale]}
            </Link>
          </Button>
          <p className="text-sm text-red mt-2">
            {overview_card.cta_helper_text[locale]}
          </p>
        </div>
      </div>
    </MaxWidth>
  )
}

export default HeroSection
