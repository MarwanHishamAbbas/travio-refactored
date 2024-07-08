import MaxWidth from "@/components/common/MaxWidth"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity/sanity-image"

import React from "react"

import styled from "styled-components"

interface RootProps {
  desktop: string
  mobile: string
}

const RootBg = styled.div<RootProps>`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${(props) => props.desktop});
    background-size: cover;
    background-position: center;
    z-index: 0;
  }

  @media (max-width: 768px) {
    &::before {
      background-image: url(${(props) => props.mobile});
    }
  }
`

const ContactSection = ({ data, locale }: { data: any; locale: string }) => {
  return (
    <MaxWidth className="mt-16">
      <RootBg
        className="max-w-[1280px] min-h-[502px] bg-[#edf7fe] md:rounded-[24px] rounded-none"
        desktop={urlFor(data.hero_image?.asset._ref)}
        mobile={urlFor(data.hero_image?.mobile.asset._ref)}
      >
        <div className="flex max-md:flex-col relative">
          <div className="flex flex-col z-50 max-md:items-center md:gap-[68px] gap-6 md:py-[68px] md:pl-12 py-10 px-5">
            <h4 className="md:text-[48px] max-md:text-center font-bold md:leading-[68px] text-2xl md:max-w-[720px]">
              {data.title?.[locale]}
            </h4>
            <Button className="md:h-12 h-10 w-fit max-md:text-[14px] max-md:leading-6 max-md:font-medium max-md:px-5 font-bold rounded-full">
              {data.cta?.label?.[locale]}
            </Button>
          </div>
        </div>
      </RootBg>
    </MaxWidth>
  )
}

export default ContactSection
