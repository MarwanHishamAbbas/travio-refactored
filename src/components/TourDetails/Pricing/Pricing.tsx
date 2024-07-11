import { type FC } from "react"
import MaxWidth from "../../common/MaxWidth"
import { Locale, getDictionary } from "@/language/getLanguage"
import Link from "next/link"

import Image from "next/image"
import DatePicker from "../../ui/date-picker"
import PricingList from "./PricingList"

interface PricingProps {
  locale: Locale
  handle: string
  prices: {
    from: Date
    to: Date
    actualPrice: { por: string; en: string; _type: string; es: string }
    currentPrice: { por: string; en: string; _type: string; es: string }
    availability?: boolean
  }[]
}

const Pricing: FC<PricingProps> = async ({ locale, prices, handle }) => {
  const content = await getDictionary(locale)
  return (
    <MaxWidth className="mt-16" id="pricing">
      <div className="bg-black/[0.03] p-4 rounded-2xl space-y-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div>
            <h1 className="text-sm md:text-base text-grey mb-2">
              {content.datesTn}
              <Link
                className="text-primary"
                href={`/${locale}/tailor_your_tour`}
              >
                {content.hereTn}
              </Link>
            </h1>
            <div className="flex items-center gap-2">
              <Image
                src="/icons/tour-page/lock.svg"
                alt="Lock Icon"
                width={25}
                height={25}
              />
              <p className="font-bold text-[14px] lg:text-base text-primary">
                {content.secureTn}
              </p>
            </div>
          </div>
          <DatePicker />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-10 text-sm md:text-lg font-bold md:px-3">
          <h3>{content.priceTitleTn.from} </h3>
          <h3>{content.priceTitleTn.to}</h3>
          <h1 className="hidden md:block"></h1>
          <h3>{content.priceTitleTn.price}</h3>
        </div>
        <PricingList
          content={content}
          prices={prices}
          locale={locale}
          handle={handle}
        />
      </div>
    </MaxWidth>
  )
}

export default Pricing
