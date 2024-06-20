"use client"

import { useState, type FC } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion"
import { DateFormat, getPriceSymbol } from "@/lib/utils"
import { Button } from "../../ui/button"
import { ArrowRight, ChevronDown, Info } from "lucide-react"
import { Locale } from "@/language/getLanguage"
import Link from "next/link"

interface PricingListProps {
  content: any
  locale: Locale
  tourSlug: string
  prices: {
    from: Date
    to: Date
    actualPrice: { por: string; en: string; _type: string; es: string }
    currentPrice: { por: string; en: string; _type: string; es: string }
    availability?: boolean
  }[]
}

const PricingList: FC<PricingListProps> = ({
  content,
  prices,
  locale,
  tourSlug,
}) => {
  const [slice, setSlice] = useState<number>(5)
  return (
    <div>
      <Accordion type="single" className="space-y-4">
        {prices.slice(0, slice).map((price, idx) => (
          <AccordionItem
            value={idx.toString()}
            key={idx}
            className="bg-white rounded-2xl "
          >
            <AccordionTrigger className="grid grid-cols-3  md:grid-cols-5 gap-10 text-left text-xs md:text-lg font-medium">
              <p>{DateFormat(price.from, true)}</p>
              <p>{DateFormat(price.to, true)}</p>
              <p className="hidden md:block">
                {price.availability || "Available"}
              </p>
              <span className="flex items-center flex-col md:flex-row gap-1 ">
                <p>
                  {getPriceSymbol(locale)}
                  {price.currentPrice[locale]}
                </p>
                <span className="text-sm text-grey line-through">
                  {getPriceSymbol(locale)}
                  {price.actualPrice[locale]}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-3xl md:text-5xl font-bold text-red">
                      {getPriceSymbol(locale)}
                      {price.currentPrice[locale]}
                    </p>
                    <p className="text-sm md:text-xl text-grey line-through">
                      {getPriceSymbol(locale)}
                      {price.actualPrice[locale]}
                    </p>
                  </div>
                  <p className="text-grey  font-normal text-xs  md:text-sm flex items-center gap-1">
                    {content.perPersonTn} {content.doubleSeaterTn}
                    <Info className="size-6" />
                  </p>
                  <p className="md:text-sm font-satoshi text-xs font-normal text-darkBlue ">
                    {content.roomTypeTn}
                    <span className="text-primary font-medium">
                      {" "}
                      {content.exactTn}
                    </span>
                  </p>
                  <p className="md:text-sm font-satoshi font-normal text-darkblue text-[12px] leading-5">
                    <span className="text-[#3FA9F5] font-medium">
                      {content.tripTn}
                    </span>{" "}
                    {content.personalizeTn}
                  </p>
                </div>
                <Button
                  className="rounded-full bg-red hover:bg-red/80 gap-2"
                  size={"lg"}
                  asChild
                >
                  <Link
                    href={`/${locale}/tours/${tourSlug}/payment?from=${new Date(
                      price.from
                    ).getTime()}&to=${new Date(price.to).getTime()}`}
                  >
                    {content.bookTourTn} <ArrowRight />
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="text-center mt-4">
        <Button variant={"link"} onClick={() => setSlice(slice + 5)}>
          {content.viewMoreTn}
          <ChevronDown />
        </Button>
      </div>
    </div>
  )
}

export default PricingList
