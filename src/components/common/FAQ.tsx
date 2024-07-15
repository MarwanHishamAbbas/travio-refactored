"use client"

import React from "react"
import MaxWidth from "./MaxWidth"
import SectionHeader from "./SectionHeader"
import { ChevronDown } from "lucide-react"

const FAQSection = ({ data, locale }: { data: any; locale: string }) => {
  const [open, setOpen] = React.useState(-1)
  return (
    <>
      <MaxWidth className="bg-white flex flex-col mt-16 w-full">
        <SectionHeader
          title={data?.title?.[locale]}
          subtitle={data?.tagline?.[locale]}
          centerLine
        />
        <div className="w-full space-y-5 md:space-y-6">
          {data.faqs?.map((faq: any, index: number) => (
            <div className="flex flex-col gap-5" key={index}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpen(open === index ? -1 : index)}
              >
                <ChevronDown
                  className={`${
                    open === index ? "" : "-rotate-90"
                  } transition-all size-5 shrink-0`}
                />

                <strong className="font-medium font-satoshi text-[12px] text-darkBlue md:text-xl leading-normal md:leading-[32px] md:tracking-[-0.6px]">
                  {faq?.question[locale]}
                </strong>
              </div>

              <div
                className={`${
                  open === index ? "" : "hidden"
                } ml-10 max-w-[90%] text-grey
              text-[12px] leading-5 lg:text-base font-satoshi transition-all
              `}
              >
                <p>{faq?.answer[locale]}</p>
              </div>
            </div>
          ))}
        </div>
      </MaxWidth>
    </>
  )
}

export default FAQSection
