"use client"

import React from "react"
import Image from "next/image"
import { PhotoProvider, PhotoView } from "react-photo-view"

// import { urlFor } from '@/sanity/client'

// import { SanityGallerySection, SanityImage } from '../../sanity/types'

import "react-photo-view/dist/react-photo-view.css"

import "swiper/css"
import "swiper/css/navigation"

import "react-photo-view/dist/react-photo-view.css"
import MaxWidth from "@/components/common/MaxWidth"
import { urlFor } from "@/lib/sanity/sanity-image"
import SwiperComponent from "@/components/swiper/SwiperComponent"

// import useWindowSize from "@/hooks/useWindows";
export type GallerySectionProps = {
  // data: SanityGallerySection
  data: any
  banner?: any
  locale: string
  forTourPage?: boolean
}

const TourGallery = (props: GallerySectionProps) => {
  const {
    data: { title, subtitle, images },
    locale,
    forTourPage,
  } = props

  const imgs: any[][] = []
  if (images) {
    let single = true
    for (let i = 0; i < images.length; i++) {
      if (single) {
        imgs.push([images[i]])
      } else {
        imgs.push(images.slice(i, i + 2))
        i++
      }
      single = !single
    }
  }

  return (
    <div
      className={`${
        forTourPage ? "bg-white" : "bg-[#F2FAFF]"
      } pt-5 md:pt-10 min-h-[522px] md:min-h-[522px] mt-[84px] text-black`}
    >
      <MaxWidth>
        <h2
          id="triphighlights"
          className={`${
            forTourPage
              ? "md:text-left text-center text-[24px] md:leading-[32px] md:pl-[107px] px-5 leading-[34px]"
              : "text-center text-[24px] px-5 md:text-[40px] leading-[32px] md:leading-[50px]"
          } font-satoshi text-darkBlue -tracking-[1.2px] font-bold`}
        >
          {title[locale]}
        </h2>
        {forTourPage && (
          <div className="border-b-[#FFBB0B] max-md:hidden mt-[10px] ml-[107px] w-[122px] border-b-[3px]" />
        )}

        <p
          className={`${
            forTourPage
              ? "md:pl-[107px] md:mt-3 px-5 max-md:text-center"
              : "text-center px-5"
          } text-sm font-satoshi  md:text-lg mt-[10px] md:mt-1.5 text-grey leading-[24px]`}
        >
          {subtitle[locale]?.substring(0, 5)[locale]}
          <span className="text-[#3FA9F5] font-satoshi font-medium opacity-100">
            {subtitle[locale]?.substring(5, 32)}
          </span>
          {subtitle[locale]?.substring(32)}
        </p>
        <div
          className={`${
            forTourPage ? "mt-12" : "mt-[10px] md:mt-2 mb-[30px]"
          } `}
        >
          {forTourPage ? null : (
            <Image
              quality={100}
              priority
              width={80}
              height={40}
              src={"/small-logo.svg"}
              alt={"small logo"}
              className={"mx-auto w-[80px] h-10"}
            />
          )}
        </div>
      </MaxWidth>
      <MaxWidth>
        <PhotoProvider maskOpacity={0.6}>
          <SwiperComponent
            className="gap-2 md:gap-2 lg:gap-2.5 !pb-0 !px-0 !pl-0"
            scrollCount={4}
            length={images?.length}
          >
            {imgs.slice(0, 3)?.map((image, i) =>
              i % 2 == 0 ? (
                <div
                  key={i}
                  className={
                    "min-w-[353px] md:min-w-[350px] w-full md:max-w-[350px] h-[247px] md:h-[320px]  overflow-hidden rounded-xl"
                  }
                >
                  <PhotoView key={i} src={urlFor(image[0])}>
                    <Image
                      src={urlFor(image[0])}
                      width={350}
                      height={320}
                      alt={"image"}
                      className={"w-full h-full flex-shrink-0"}
                      quality={100}
                      priority
                    />
                  </PhotoView>
                </div>
              ) : (
                <div
                  key={i}
                  className={
                    "w-full h-[247px] md:h-[320px] flex flex-col gap-2 lg:gap-2.5"
                  }
                >
                  <div
                    className={
                      "w-[152.2px] h-[118.3px] md:h-[160px] md:w-[160px] overflow-hidden rounded-xl "
                    }
                  >
                    <PhotoView key={i} src={urlFor(image[0])}>
                      <Image
                        src={urlFor(image[0])}
                        width={160}
                        height={160}
                        alt={"image"}
                        className={"object-cover w-full h-full"}
                        quality={100}
                        priority
                      />
                    </PhotoView>
                  </div>
                  {image[1] && (
                    <div
                      className={
                        "w-[152.2px] h-[118.3px] md:h-[160px] md:w-[160px] overflow-hidden rounded-xl "
                      }
                    >
                      <PhotoView key={i} src={urlFor(image[1])}>
                        <Image
                          src={urlFor(image[1])}
                          width={160}
                          height={160}
                          alt={"image"}
                          className={"object-cover w-full h-full"}
                          quality={100}
                          priority
                        />
                      </PhotoView>
                      <PhotoView key={i} src={urlFor(image[1])}>
                        <Image
                          src={urlFor(image[1])}
                          width={160}
                          height={160}
                          alt={"image"}
                          className={"object-cover w-full h-full"}
                          quality={100}
                          priority
                        />
                      </PhotoView>
                    </div>
                  )}
                </div>
              )
            )}
            <div
              className={
                "w-full  h-[247px]  md:h-[320px] flex flex-col gap-2 lg:gap-2.5 "
              }
            >
              <div
                className={
                  "w-[152.2px] md:w-[118.3px] h-full overflow-hidden rounded-xl "
                }
              >
                <PhotoView src={urlFor(imgs[5][0])}>
                  <Image
                    src={urlFor(imgs[5][0])}
                    width={160}
                    height={160}
                    alt={"image"}
                    className={"object-cover w-full h-full"}
                    quality={100}
                    priority
                  />
                </PhotoView>
              </div>
            </div>
            {imgs.slice(3, 6)?.map((image, i) =>
              i % 2 == 1 ? (
                <div
                  key={i}
                  className={
                    "min-w-[303px] w-full h-[247px]  md:h-[320px]   md:min-w-[310px] md:max-w-[400px]  overflow-hidden rounded-xl"
                  }
                >
                  <PhotoView key={i} src={urlFor(image[0])}>
                    <Image
                      src={urlFor(image[0])}
                      width={320}
                      height={320}
                      quality={100}
                      alt={"image"}
                      className={"w-full h-full flex-shrink-0 object-cover "}
                      priority
                    />
                  </PhotoView>
                </div>
              ) : (
                <div
                  key={i}
                  className={
                    "w-full  h-[247px]  md:h-[320px] flex flex-col gap-2 lg:gap-2.5 "
                  }
                >
                  <div
                    className={
                      "w-[152.2px] h-[118.3px] md:h-[160px] md:w-[160px] overflow-hidden rounded-xl "
                    }
                  >
                    <PhotoView key={i} src={urlFor(image[0])}>
                      <Image
                        src={urlFor(image[0])}
                        width={160}
                        height={160}
                        quality={100}
                        alt={"image"}
                        className={"object-cover w-full h-full"}
                        priority
                      />
                    </PhotoView>
                  </div>
                  {image[1] && (
                    <div
                      className={
                        "w-[152.2px] h-[118.3px] md:h-[160px] md:w-[160px] overflow-hidden rounded-xl "
                      }
                    >
                      <PhotoView key={i} src={urlFor(image[1])}>
                        <Image
                          src={urlFor(image[1])}
                          width={160}
                          height={160}
                          quality={100}
                          alt={"image"}
                          className={"object-cover w-full h-full"}
                          priority
                        />
                      </PhotoView>
                    </div>
                  )}
                </div>
              )
            )}
          </SwiperComponent>
        </PhotoProvider>
      </MaxWidth>
    </div>
  )
}

export default TourGallery
