/* eslint-disable @next/next/no-img-element */
import { urlFor } from "@/lib/sanity/sanity-image"
import React, { useEffect, useRef, useState } from "react"

import {
  FacebookShare,
  TwitterShare,
  LinkedinShare,
  FacebookMessengerShare,
} from "react-share-kit"

// import { urlFor } from '../../../../sanity/lib/client'

const ArticleHeroSection = ({
  title,
  image,
  introduction,
  time,
  locale,
  author,
  slug,
  openSidebar,
}: {
  title: string
  image: any
  introduction: string
  time: string
  locale: string
  author: string
  slug: string
  openSidebar: () => void
}) => {
  const [isFixed, setIsFixed] = useState(false)

  const tabsRef = useRef<HTMLDivElement | null>(null)

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
    <div className="mt-[30px]">
      <div className="flex justify-between">
        <div className="lg:px-20 px-5">
          <h1 className="md:text-[40px] md:leading-[50px] text-[20xp] leading-[30px] text-darkBlue font-bold">
            {/* @ts-ignore */}
            {title?.[locale]}
          </h1>
          <h2 className="my-[18px] md:font-bold font-normal mb-7 md:text-darkBlue text-gray md:text-[14px] md:leading-[22px] text-[12px] leading-5">
            By {author} On{" "}
            <span className="text-[#FFBB0B] md:text-[14px] md:leading-[22px] md:font-bold font-medium text-[12px] leading-5">
              {/* @ts-ignore */}

              {time?.[locale]}
            </span>{" "}
          </h2>
        </div>
        <button
          onClick={openSidebar}
          className="bg-[#3FA9F5] z-50 flex items-center max-w-5 h-[60px] rounded-l-[4px] hover:cursor-pointer xl:hidden"
        >
          <DropDown />
        </button>
      </div>

      <div className="flex gap-[18px] items-center justify-center max-md:px-5">
        <div
          className="w-full max-lg:hidden max-w-[36px] bg-transparent"
          style={{
            position: isFixed ? "fixed" : "relative",
            top: 100,
            left: isFixed ? 20 : 0,
            zIndex: 1000,
            marginTop: isFixed ? "0" : "10px",
            // backgroundColor: "", // Optional: set a background color
            transition: "top 0.3s, position 0.3s, margin-top 0.3s", // Add transitions
          }}
          ref={tabsRef}
        >
          {/* <img src={"/demo/share.png"} alt="share" /> */}
          <p className="text-primary font-bold text-[10px] leading-3 text-center max-w-[36px]">
            Share
          </p>

          <div className="mt-1">
            <FacebookShare
              url={`https://travio-seven.vercel.app/en/blog${slug}`}
              size={36}
              borderRadius={8}
              // @ts-ignore
              quote={title?.[locale]}
              i18nIsDynamicList
            />

            <FacebookMessengerShare
              url={`https://travio-seven.vercel.app/en/blog${slug}`}
              size={36}
              borderRadius={8}
              appId={"dmm4kj9djk203k4liuf994p"}
            />

            <LinkedinShare
              url={`https://travio-seven.vercel.app/en/blog${slug}`}
              size={36}
              borderRadius={8}
            />

            <TwitterShare
              url={`https://travio-seven.vercel.app/en/blog${slug}`}
              size={36}
              borderRadius={8}
            />
          </div>
        </div>
        <img
          src={urlFor(image?.asset?._ref)}
          className="lg:max-w-[896px] lg:min-h-[500px] md:hidden"
          alt=""
        />
        <img
          src={urlFor(image?.mobile?.asset?._ref)}
          className="lg:max-w-[896px] lg:min-h-[500px] max-md:hidden"
          alt=""
        />
      </div>

      <p className="md:mt-7 mt-5 lg:pl-20 px-5 font-normal md:font-medium md:leading-7 md:opacity-70 text-[rgba(20, 13, 49, 0.75)] md:text-[16px] text-[14px] leading-6">
        {" "}
        {/* @ts-ignore */}
        {introduction?.[locale]}{" "}
      </p>
    </div>
  )
}

function DropDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.00001 7.5251C4.99944 7.42128 5.01835 7.31837 5.05566 7.22226C5.09296 7.12615 5.14793 7.03873 5.2174 6.96502L9.71509 2.23199C9.85625 2.08345 10.0477 2 10.2473 2C10.4469 2 10.6384 2.08345 10.7795 2.23199C10.9207 2.38053 11 2.582 11 2.79207C11 3.00214 10.9207 3.2036 10.7795 3.35214L6.80658 7.5251L10.772 11.6981C10.8949 11.849 10.959 12.0431 10.9517 12.2416C10.9445 12.4401 10.8662 12.6285 10.7327 12.769C10.5992 12.9094 10.4203 12.9917 10.2316 12.9994C10.043 13.0071 9.85849 12.9396 9.71509 12.8103L5.2174 8.07729C5.07891 7.93036 5.00084 7.73204 5.00001 7.5251Z"
        fill="white"
      />
    </svg>
  )
}

export default ArticleHeroSection
