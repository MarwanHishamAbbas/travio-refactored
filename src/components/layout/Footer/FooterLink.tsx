import React from "react"
import Link from "next/link"
import { SanityLink } from "@/types/sanity"

// import { localizedString } from '@/contexts/LocaleProvider'

const Footer__links = ({
  heading,
  items,
  locale,
}: {
  heading: string
  items: SanityLink[]
  // items: any;
  locale: string
}) => {
  return (
    <div className="flex gap-2 flex-col text-darkblue font-satoshi">
      <h1 className="psb-2 font-bold text-base md:text-lg leading-[24px]">
        {heading}
      </h1>
      {items.map((item, index) => {
        return (
          <Link
            href={locale + item.url || ""}
            key={index}
            className="text-[12px] md:text-[16px] md:font-medium leading-[24px] md:leading-normal text-dimSecondary"
          >
            {item?.text?.[locale]}
            {/* {localizedString(item.text)} */}
          </Link>
        )
      })}
    </div>
  )
}

export default Footer__links
