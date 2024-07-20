/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"
import Link from "next/link"

import Image from "next/image"
import MaxWidth from "@/components/common/MaxWidth"
import { getDictionary, Locale } from "@/language/getLanguage"
import { ArrowDown } from "lucide-react"

const OverViewCard = async ({
  data: overview_card,
  locale,
}: {
  data: any
  locale: Locale
}) => {
  const content = await getDictionary(locale)

  return (
    <MaxWidth className="mt-4 hidden md:block">
      <div className="flex items-center gap-8 bg-lightBlue rounded-2xl p-6 justify-between">
        <div className=" p-3 rounded-xl text-sm flex items-center gap-2">
          <Image
            className=""
            src="/icons/tour-page/duration.svg"
            alt="Calender Icon"
            width={35}
            height={35}
          />
          <div>
            <p className="text-grey lg:text-base text-[12px] max-lg:leading-5 font-medium whitespace-nowrap">
              {content.overviewTn.Duration}
            </p>
            <strong className="lg:text-xl max-lg:leading-5 whitespace-nowrap font-bold text-darkBlue">
              {overview_card.duration[locale]}
            </strong>
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
            <p className="text-grey lg:text-base text-[12px] max-lg:leading-5 font-medium whitespace-nowrap">
              {content.overviewTn.Countries}
            </p>
            <strong className="lg:text-xl max-lg:leading-5 whitespace-nowrap font-bold text-darkBlue">
              {overview_card.countries} Cities
            </strong>
          </div>
        </div>
        <div className=" p-3 rounded-xl text-sm border-l gap-2">
          <p className="text-grey lg:text-base text-[12px] max-lg:leading-5 font-medium whitespace-nowrap">
            {content.overviewTn.TripRating}
          </p>
          <div className="flex gap-2">
            <Image
              className=""
              src="/icons/tour-page/stars.svg"
              alt="Calender Icon"
              width={70}
              height={70}
            />
            <strong className="lg:text-xl max-lg:leading-5 whitespace-nowrap font-bold text-darkBlue">
              {overview_card.rating}
            </strong>
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
            <p className="text-grey lg:text-base text-[12px] max-lg:leading-5 font-medium whitespace-nowrap">
              {content.overviewTn.AboutThisTour}
            </p>
            <strong className="lg:text-xl max-lg:leading-5 whitespace-nowrap font-bold text-darkBlue">
              {overview_card.about[locale]}
            </strong>
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
            <p className="text-grey lg:text-base text-[12px] max-lg:leading-5 font-medium whitespace-nowrap">
              {content.overviewTn.PriceFrom}
            </p>
            <strong className="lg:text-xl max-lg:leading-5 whitespace-nowrap font-bold text-darkBlue">
              {overview_card.price.currency_symbol[locale]}
              {overview_card.price.discounted_price[locale]}
            </strong>

            <strong className="line-through opacity-50 ml-2 ">
              {overview_card.price.currency_symbol[locale]}
              {overview_card.price.initial_price[locale]}
            </strong>
          </div>
        </div>
        <div className="text-center border-l pl-3">
          <Button size={"lg"} className="rounded-full font-bold text-lg gap-2">
            <Link href="#pricing">
              {overview_card.cta_button.label[locale]}
            </Link>
            <ArrowDown />
          </Button>
          <p className="text-sm text-red mt-2">
            {overview_card.cta_helper_text[locale]}
          </p>
        </div>
      </div>
    </MaxWidth>
  )
}

export default OverViewCard
