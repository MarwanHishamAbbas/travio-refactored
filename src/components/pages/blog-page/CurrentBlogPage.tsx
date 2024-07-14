"use client"

import React, { useEffect, useState } from "react"
import Layout from "@/components/layout/Layout"
import ArticleHeroSection from "./ArticleHeroSection"
import BlogContentSection from "./BlogContentSection"
import InThisPost from "./InThisPost"

import BlogReview from "@/components/pages/blog-page/BlogReview"
import BlogSidebar from "@/components/pages/blog-page/BlogSidebar"

import "swiper/css"
import "swiper/css/navigation"
import SharingOpt from "@/components/common/SharingOpt"
import useWindowSize from "@/hooks/useWindows"

import ArticalTestinomial from "./ArticalTestinomial"

import { ProgressBar } from "@nadfri/react-scroll-progress-bar"
import styled from "styled-components"
import BottomBar from "../tour/BottomBar"

import FeatureBlogs from "../blog/AllBlogs"
import NewsletterSection from "@/components/common/NewsLetter"
import FeatureTourSection from "./FeatureTours"

const RootProgressStyle = styled.div`
  /* div {
    height: 2px;
  } */
`

export default function CurrentBlogPage({
  locale,
  pageData,
  newsLetterSection,
}: any) {
  const { layout, data } = pageData || {}
  const [showBlogSidebar, setShowBlogSidebar] = useState(false)
  const windows = useWindowSize()
  const isLaptop = windows.width < 1284

  function OpenSidebar() {
    setShowBlogSidebar(!showBlogSidebar)
  }

  const [isFixed, setIsFixed] = useState(false)

  const handleScroll = () => {
    const scrollPosition = window.scrollY
    setIsFixed(scrollPosition > window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Layout
      breadcrumbs={[
        {
          value: "/blogs",
          label: "Blog",
        },
        {
          value: "/egypt-blog",
          label: "8 best things to do in Cairo",
        },
      ]}
      locale={locale}
      globals={layout}
      promo_banner={layout?.banner}
      maxWidth={false}
    >
      {/* shows progresbar when page is scroll */}
      <RootProgressStyle>
        <ProgressBar
          height="4px"
          color1="rgba(20, 13, 49, 0.1)"
          color2="#3FA9F5"
          position={`${isFixed ? "fixed" : "relative"}`}
        />
      </RootProgressStyle>

      <div className="font-satoshi">
        <div className="flex md:gap-8 bg-white w-full max-w-[1440px] mx-auto">
          <div className="w-full max-w-[1000px]">
            <ArticleHeroSection
              title={data?.title}
              image={data?.cover_image}
              author={data?.auther?.name?.[locale]}
              introduction={data?.introduction}
              time={data?.time}
              locale={locale}
              openSidebar={OpenSidebar}
              slug={data?.slug?.current}
            />

            <InThisPost data={data?.subsections} locale={locale} />

            <div className="flex flex-col gap-[10px] items-center justify-center mt-5">
              <p className="lg:hidden text-primary text-[12px] leading-3">
                Share
              </p>
              <div className="lg:hidden flex items-center justify-center gap-1">
                <SharingOpt
                  url={`https://travio-seven.vercel.app/en/blog${data?.slug?.current}`}
                  appId="dmm4kj9djk203k4liuf994p"
                />
              </div>

              <BlogContentSection
                actualData={data?.subsections}
                locale={locale}
              />

              <div className="lg:hidden flex items-center justify-center gap-1">
                <SharingOpt
                  url={`https://travio-seven.vercel.app/en/blog${data?.slug?.current}`}
                />
              </div>
            </div>
          </div>

          {showBlogSidebar && isLaptop ? (
            <div
              className={`absolute z-30 ml-auto right-0 max-xl:top-[140px] max-lg:top-[100px] max-md:top-[80px] sidebar  ${
                showBlogSidebar
                  ? "transition ease-in-out delay-150 translate-x-1"
                  : "transition-transform translate-x-full"
              }`}
            >
              <BlogSidebar data={data?.sidebar} locale={locale} />
            </div>
          ) : (
            <div>
              <BlogSidebar data={data?.sidebar} locale={locale} />
            </div>
          )}
        </div>

        <div>
          <BlogReview data={data?.auther} locale={locale} />
        </div>

        <FeatureTourSection data={data?.suggested_tour} locale={locale} />

        <div className="w-full max-w-[1440px] mx-auto max-md:mt-[50px] bg-transparent">
          <FeatureBlogs data={data?.related_articles} locale={locale} />
        </div>

        <ArticalTestinomial locale={locale} />

        <NewsletterSection data={newsLetterSection} locale={locale} />
      </div>

      <BottomBar />
    </Layout>
  )
}
