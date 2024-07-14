/* eslint-disable @next/next/no-img-element */
import React from "react"

import Link from "next/link"
import { getChars } from "@/lib/utils"
import { urlFor } from "@/lib/sanity/sanity-image"

// import PortableText from 'react-portable-text'

// import { LocalizedString, localizedString } from '@/contexts/LocaleProvider'

// const PortableTextSerializer = {
//   locale_rich_text: (props: any) => {
//     return <p>{props.en[0].children[0].text}</p>
//   },
// }

function BlogDetailCard(props: {
  country: string
  title: string
  date: string
  image: any
  link: string
  excerpt: string
  author: string
  className?: string
  linkText?: string
}) {
  const { country, title, date, image, excerpt, link, author, linkText } = props
  return (
    <div className="md:max-w-[410px] md:min-h-[530px] max-w-[250px] min-h-[399px] rounded-[12px] md:rounded-[16px] mb-6 text-darkBlue font-satoshi shadow-xl shadow-[#f5f5f5]">
      <img
        src={urlFor(image)}
        alt="img"
        className="md:max-w-[410px] md:min-h-[300px] max-w-[250px] min-h-[190px] md:rounded-t-[16px] rounded-t-[12px]"
      />
      <div className="pt-3 md:px-[18px] md:pb-[18px] px-3 pb-3 flex flex-col gap-3">
        <div>
          <p className="uppercase md:text-[14px] md:leading-[22px] text-[12px] leading-5 text-primary font-bold">
            {country}
          </p>
          <h3 className="md:text-xll text-base mt-1 max-w-[340px] font-[700] capitalize">
            {title}
          </h3>
        </div>
        <div className="min-h-[66px]">
          <span className="text-[14px] leading-[22px] text-gray font-medium">
            {getChars(excerpt, 120)}
          </span>
          <Link href={link} className="underline text-primary ml-1">
            {linkText}
          </Link>
        </div>
        <p className="text-gray text-xs">
          By {author} On {date}
        </p>
      </div>
    </div>
  )
}

export default BlogDetailCard
