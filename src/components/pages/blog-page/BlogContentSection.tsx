/* eslint-disable @next/next/no-img-element */
import React from "react"
import PortableText from "react-portable-text"
import styled from "styled-components"

import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity/sanity-image"

const RootStyle = styled.div`
  p {
    font-size: 16px;
    line-height: 28px;
    font-weight: normal;
    color: #140d31;
  }

  @media (max-width: 768px) {
    p {
      font-size: 12px;
      line-height: 20px;
      font-weight: normal;
    }
  }
`

export const removeSpace = (str: string) => {
  const newStr = str.replace(/\s/g, "-")
  return newStr.toLowerCase()
}

const BlogContentSection = ({ actualData, locale }: any) => {
  const PortableTextSerializer = {
    h3: (props: any) => {
      if (!props) return null

      return (
        <div className="">
          <h3 className="font-bold text-2xl font-satoshi text-darkBlue">
            {props.children}
          </h3>
          <div className="md:w-[74px] border-b md:my-2 my-1 md:border-b-[3px] border-[#FFBB0B] max-w-[25%]  rounded-full" />
        </div>
      )
    },

    ul: (props: any) => {
      if (!props) return null

      return (
        <ul className="list-disc pl-5">
          {props.children.map((child: any, index: any) => (
            <li key={index} className="mb-2 leading-6">
              {child}
            </li>
          ))}
        </ul>
      )
    },

    ol: (props: any) => {
      if (!props) return null

      return (
        <ol className="list-decimal pl-5">
          {props.children.map((child: any, index: any) => (
            <li key={index} className="mb-2 leading-6">
              {child}
            </li>
          ))}
        </ol>
      )
    },

    li: (props: any) => {
      if (!props) return null

      return <li className="mb-2 leading-6">{props.children}</li>
    },

    p: (props: any) => {
      if (!props) return null

      return (
        <p className="text-darkBlue md:text-[16px] md:leading-7 text-[12px] font-normal leading-5">
          {props.children}
        </p>
      )
    },

    div: (props: any) => {
      if (!props) return null

      return <div {...props}>{props.children}</div>
    },

    // span: (props) => {
    //   if (!props) return null;

    //   return <span {...props}>{props.children}</span>;
    // },

    // strong: (props) => {
    //   if (!props) return null;

    //   return <strong {...props}>{props.children}</strong>;
    // },

    a: (props: any) => {
      if (!props) return null

      return <a {...props}>{props.children}</a>
    },

    em: (props: any) => {
      if (!props) return null

      return <em {...props}>{props.children}</em>
    },

    layout_group: (props: any) => {
      if (!props) return null

      return (
        <>
          <div className="flex flex-col gap-6 relative">
            <img
              src={urlFor(props?.items[0]?.items[1]?.image?.asset?._ref)}
              className="xl:max-w-[896px] md:min-h-[567px] max-sm:w-full mt-[18px]"
              alt=""
              style={{ aspectRatio: 1.5 }}
            />
            {props?.items[0]?.items[0].text?.[locale] && (
              <RootStyle>
                <PortableText
                  content={props?.items[0]?.items[0].text?.[locale]}
                />
              </RootStyle>
            )}
          </div>
        </>
      )
    },
  }

  return (
    <div className="mt-10 flex flex-col md:gap-[68px] gap-[50px] lg:pl-20 px-5">
      {actualData.map((item: any, index: any) => {
        if (item._type === "subsection") {
          return (
            <div key={index} className="text-black gap-[18px] flex flex-col ">
              <div className="flex flex-col gap-[10px] md:text-[14px] md:leading-[34px] font-bold text-[20px] leading-[30px]">
                <p
                  id={removeSpace(item?.tagline?.[locale])}
                  // onClick={() => }
                  className="text-[24px] leading-[34px] font-bold text-darkBlue"
                >
                  {item?.tagline?.[locale]}
                </p>
                <div className="border md:border-b-[3px] border-b border-[#FFBB0B] md:w-[88px} w-[101px]" />
                {item?.content?.[locale]?.map((content: any, i: number) => (
                  <RootStyle key={i}>
                    <PortableText
                      content={content}
                      serializers={PortableTextSerializer}
                    />
                  </RootStyle>
                ))}
              </div>
            </div>
          )
        } else if (item._type === "bannerSection") {
          return (
            <div key={index}>
              <BannerSection
                image={item.image}
                description={item.description}
                title={item.title}
                locale={locale}
              />
            </div>
          )
        } else {
          return null
        }
      })}
    </div>
  )
}

function BannerSection({
  image,
  title,
  description,
  locale,
}: {
  image: any
  title: string
  description: string
  locale: string
}) {
  return (
    <div className="flex items-center max-w-[896px] md:min-h-[188px]">
      <div className="bg-[#3FA9F5] w-[50%] md:rounded-l-[16px] rounded-l-[6px] max-md:h-[100px]">
        <div className="flex gap-5 items-center">
          <img
            className="opacity-50 max-md:h-[100px] rounded-l-[6px] md:rounded-l-[16px] md:h-full"
            src="/demo/banner2.png"
            alt="banner"
          />
          <div className="">
            <p className="text-white md:text-[14px] md:leading-[22px] md:font-bold text-[8px] leading-3 font-medium">
              {/* @ts-ignore */}
              {title?.[locale]}
            </p>
            <p className="text-white md:text-[28px] md:leading-[36px] md:font-bold text-[12px] leading-[18px] font-medium">
              {/* @ts-ignore */}
              {description?.[locale]}
            </p>
            <Button className="bg-white text-primary md:text-[14px] md:leading-[22px] md:font-bold text-[8px] leading-3 font-medium md:mt-[26px] mt-[11px] max-md:h-5 max-md:max-w-[66px] rounded-full">
              View tours
            </Button>
          </div>
        </div>
      </div>

      <div className="w-[50%]">
        <img
          className="max-md:h-[100px] h-[188px] rounded-e-[6px] md:rounded-e-[16px]"
          src={urlFor(image?.asset?._ref)}
          alt="bannerTourPhoto"
        />
      </div>
    </div>
  )
}

export default BlogContentSection
