import React from "react"

import { readMoreTn } from "@/lib/utils"
import SectionHeader from "@/components/common/SectionHeader"
import SwiperComponent from "@/components/swiper/SwiperComponent"
import { urlFor } from "@/lib/sanity/sanity-image"
import BlogDetailCard from "./BlogCard"
import MaxWidth from "@/components/common/MaxWidth"

const FeatureBlogs = ({ data, locale }: any) => {
  return (
    <MaxWidth>
      <SectionHeader
        title={data?.tagline?.[locale]}
        subtitle={data?.title?.[locale]}
        centerLine
      />
      <div className="h-fit relative">
        <SwiperComponent
          className={"gap-6 md:mt-[48px] mt-[30px]"}
          length={data?.blogs?.length}
          scrollCount={3}
        >
          {/* <Container className="flex flex-col mx-auto max-w-[1312px] px-4 mt-20 items-center"> */}
          <div className="flex flex-wrap w-full pl-2">
            {data?.blogs?.map((blog: any, index: number) => {
              return (
                <BlogDetailCard
                  country={blog?.destination?.name?.[locale]}
                  excerpt={blog?.introduction?.[locale]}
                  image={blog?.cover_image ? urlFor(blog.cover_image) : ""}
                  link={`/${locale}/blog${blog.slug?.current}`}
                  title={blog?.title?.[locale]}
                  date={blog?.time?.[locale]}
                  author={blog?.auther?.name?.[locale]}
                  key={index}
                  //   @ts-ignore
                  linkText={readMoreTn?.[locale]}
                />
              )
            })}
          </div>
          {/* </Container> */}
        </SwiperComponent>
        <div className=" absolute hidden md:block w-[150px] top-0 p-3 h-full   bg-gradient-to-r from-transparent  via-[rgba(255,255,255,0.5)] to-white right-0" />
      </div>
    </MaxWidth>
  )
}

export default FeatureBlogs
