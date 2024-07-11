import React from "react"
import Link from "next/link"

import "swiper/css"
import "swiper/css/navigation"

import Image from "next/image"
import { urlFor } from "@/lib/sanity/sanity-image"
import { DateFormat } from "@/lib/utils"
import MaxWidth from "./MaxWidth"
import SwiperComponent from "../swiper/SwiperComponent"

const BlogCard = ({ blog, locale }: any) => {
  return (
    blog && (
      <Link
        className={"flex-shrink-0 md:mt-12 mt-[30px]"}
        href={`/${locale}/blog${blog?.slug?.current}`}
      >
        <div className=" w-full">
          <div className={"rounded-3xl max-sm:rounded-[8px] overflow-hidden"}>
            {blog?.cover_image && (
              <Image
                priority
                height={460}
                width={410}
                quality={100}
                className="w-[250px] h-[280px] lg:w-[410px] lg:h-[460px] object-cover"
                src={urlFor(blog?.cover_image)}
                alt={`cover_image-${blog?.slug?.current}`}
              />
            )}
          </div>
          <div className="mt-4 font-satoshi">
            <h3 className="md:text-[20px] text-base max-w-[250px] md:max-w-[380px] font-bold md:font-medium md:leading-[32px] ">
              {process.env.NEXT_PUBLIC_DEVELOPMENT
                ? "10 Indonesian Destinations you should visit in this year"
                : blog?.title?.[locale]}
            </h3>

            <p className="mt-[6px] md:mt-2 text-[10px] md:text-xs font-normal leading-3 md:leading-[20px]  text-gray ">{`By ${
              blog?.auther?.name?.[locale]
            } ${
              blog?._updatedAt
                ? "on " + DateFormat(new Date(blog?._updatedAt))
                : ""
            }`}</p>
          </div>
        </div>
      </Link>
    )
  )
}

const BlogSection = (props: any) => {
  if (!props.data) return null

  const {
    data: { tagline, title, featured_blogs },
    locale,
  } = props

  return (
    <MaxWidth className="text-darkBlue md:mt-[84px] mt-[50px] md:mb-[68px] mb-[70px]">
      {/* <SectionHeader
        title={tagline?.[locale]}
        subtitle={title?.[locale]}
        centerLine
      /> */}
      <header className="font-satoshi">
        <p className="text-[#3FA9F5] text-[12px] md:text-base font-medium text-center uppercase leading-5">
          {tagline?.[locale]}
        </p>
        <div className="mt-2 md:mt-3 -tracking-[1.2px] w-fit mx-auto md:text-[40px] font-bold text-2xl md:leading-[50px] text-center">
          <h2>{title?.[locale]}</h2>
          <div className="w-[40px] mt-[4px] md:mt-[12px] md:w-[117px] mx-auto text-yellow  border-b-[#FFBB0B]  rounded-full border-b-[3px]" />
        </div>
      </header>
      <div className="relative">
        <SwiperComponent
          className={"gap-3 md:gap-6 w-full overflow-hidden "}
          length={featured_blogs?.length}
          scrollCount={2}
        >
          {featured_blogs?.map((blog: any, i: number) => (
            <BlogCard blog={blog} key={i} locale={locale} />
          ))}
        </SwiperComponent>

        <div className=" absolute hidden md:block w-40 top-0 p-3 h-full z-[300] bg-gradient-to-r from-transparent  via-[rgba(255,255,255,0.2)] to-white right-0" />
      </div>
    </MaxWidth>
  )
}

export default BlogSection
