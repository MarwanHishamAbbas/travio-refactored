"use client"

import React from "react"
import Image from "next/image"
import PortableText from "react-portable-text"

import styled from "styled-components"
import { SanityContentSection, SanityLocale } from "@/types/sanity"
import { urlFor } from "@/lib/sanity/sanity-image"
import MaxWidth from "@/components/common/MaxWidth"
import SectionHeader from "@/components/common/SectionHeader"
import BottomBar from "./BottomBar"

const RootStyle = styled.div`
  p {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  @media (max-width: 768px) {
    p,
    li,
    ul {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
    }
  }
`

const LayoutGroup = styled.div`
  div {
    display: flex;
    flex-direction: column;
    gap: 8px;

    p {
      font-size: 16px;
      line-height: 24px;
    }
  }

  @media (max-width: 768px) {
    div {
      gap: 6px;

      p {
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
`

export type ContentSectionProps = {
  data: SanityContentSection
  locale: string
}
export type PropsWithLocale<T> = T & { locale: SanityLocale }

const ContentSection = (props: PropsWithLocale<ContentSectionProps>) => {
  const {
    data: { title, tagline, content },
    locale,
  } = props

  // if (!content || content[locale]) return null;

  const PortableTextSerializer = {
    h3: (props: any) => {
      if (!props) return null

      return (
        <div className="">
          <h3
            className="font-bold text-2xl font-satoshi text-darkBlue"
            {...props}
          />
          <div className="md:w-[74px] md:my-2 my-1 border-b-[3px] border-[#FFBB0B] max-w-[25%]  rounded-full" />
        </div>
      )
    },

    ul: (props: any) => {
      if (!props) return null

      return (
        <ul className="list-disc pl-5">
          {props?.children?.map((child: any, index: number) => (
            <li key={index} className="mb-2 leading-6">
              {child}
            </li>
          ))}
        </ul>
      )
    },

    layout_group: (props: any) => {
      if (!props) return null

      return (
        <div className="flex w-full font-satoshi text-darkBlue max-md:flex-col  gap-4 md:gap-12">
          {props?.items[0]?.items?.map((item: any, index: number) => {
            return (
              <PortableText
                key={index}
                className={
                  item._type === "content_image"
                    ? `w-full ${
                        index
                          ? "order-first md:order-last"
                          : "order-last md:order-first"
                      }`
                    : ""
                }
                content={item}
                serializers={PortableTextSerializer}
              />
            )
          })}
        </div>
      )
    },

    layout_stack: (props: any) => {
      if (!props) return null

      return (
        <div className="flex max-lg:flex-col max-lg:gap-[20px] gap-[30px]">
          <LayoutGroup>
            <PortableText
              content={props?.items[1]?.text?.[locale]}
              serializers={PortableTextSerializer}
            />
          </LayoutGroup>
          <figure className="shrink-0 w-full  lg:max-w-[400px]  box-border">
            <Image
              alt={props?.alt}
              src={urlFor(props?.items[0]?.image?.asset?._ref)}
              width={400}
              height={310}
              className="rounded-[18px] object-fill w-full h-auto max-md:max-w-full max-md:min-h-[260px] max-md:rounded-[12px]"
            />
            <figcaption className="text-center mt-2 font-satoshi text-darkBlue text-opacity-75 text-xs md:text-sm font-normal md:font-medium leading-tight md:leading-snug">
              {props?.items[0]?.alt}
            </figcaption>
          </figure>
        </div>
      )
    },
  }

  return (
    <>
      <BottomBar />
      <MaxWidth id="overview" className=" font-satoshi text-darkBlue mt-16">
        <SectionHeader
          title={tagline?.[locale] as string}
          centerLine
          subtitle={title?.[locale] as string}
        />

        <RootStyle className="text-sm md:text-base mt-[48px] text-darkBlue  leading-[24px] font-normal">
          {content?.[locale] && (
            <PortableText
              content={content?.[locale] ? content?.[locale] : ""}
              className="flex flex-col gap-[10px] font-[500] md:gap-6 leading-normal md:leading-7 md:tracking-wide"
              serializers={PortableTextSerializer}
            />
          )}
        </RootStyle>
      </MaxWidth>
    </>
  )
}

export default ContentSection
