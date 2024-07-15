"use client"

// import { SanityAccommodationSection } from "@/sanity/types";
import React from "react"

import { A11y, Controller, Navigation, Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import MaxWidth from "@/components/common/MaxWidth"
import AccomodationCard from "./AccommdationCard"

export default function AccommdationTypesSection({
  data,
  locale,
}: {
  data: any
  locale: string
}) {
  const [swiper, setSwiper] = React.useState<any>()
  const prevRef = React.useRef<any>()
  const nextRef = React.useRef<any>()

  React.useEffect(() => {
    if (swiper) {
      swiper.params && (swiper.params.navigation.prevEl = prevRef.current)
      swiper.params && (swiper.params.navigation.nextEl = nextRef.current)
      swiper.navigation && swiper.navigation.init()
      swiper.navigation && swiper.navigation.update()
    }
  }, [swiper])

  return (
    <MaxWidth className="flex flex-col relative gap-10 mt-16">
      <div className=" w-full">
        <div className=" pl-5 md:pl-0">
          <h2 className="text-darkBlue font-satoshi font-bold text-xl lg:text-2xl text-c">
            {data?.title?.[locale]}
          </h2>
          <div className="md:w-[117px] w-[89px] md:mt-1 border-[#FFBB0B] text-yellow rounded-full md:rounded-[3px] border-b-[3px]" />
        </div>
        <div className=" pl-5 mt-2 md:pl-0 md:font-normal font-medium">
          <span className="text-grey font-satoshi text-base mt-3 lg:text-lg">
            {data.subtitle?.[locale]?.substring(0, 18)}
          </span>
          <span className="text-[#3FA9F5] font-satoshi text-base mt-3 lg:text-lg">
            {data.subtitle?.[locale]?.substring(18)}
          </span>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Scrollbar, A11y, Controller]}
        className="external-buttons w-full"
        breakpoints={{
          319: {
            width: 320,
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            width: 1024,
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1025: {
            width: 1280,
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        updateOnWindowResize
        observer
        observeParents
        onSwiper={setSwiper}
      >
        <div className="flex overflow-x-scroll mt-2 max-w-5xl w-full gap-6">
          {data?.accommodation_types?.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <AccomodationCard data={item} locale={locale} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      <MaxWidth className="lg:gap-12 gap-[15px] px-4  relative flex justify-end">
        <button
          className={
            "rounded-full bg-[#3FA9F5] h-7 w-7 md:h-10 flex items-center justify-center md:w-10  -translate-y-1/2 cursor-pointer "
          }
          ref={prevRef}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={"scale-x-[-1]"}
          >
            <path
              d="M12.6003 8.97526C12.6009 9.07719 12.581 9.17823 12.5419 9.27259C12.5027 9.36696 12.445 9.45278 12.372 9.52515L7.64945 14.1721C7.50123 14.318 7.30021 14.3999 7.09061 14.3999C6.881 14.3999 6.67998 14.318 6.53177 14.1721C6.38356 14.0263 6.30029 13.8285 6.30029 13.6222C6.30029 13.416 6.38356 13.2182 6.53177 13.0723L10.7034 8.97526L6.53964 4.87817C6.41069 4.73001 6.34331 4.53943 6.35097 4.34451C6.35862 4.14958 6.44074 3.96468 6.58091 3.82675C6.72109 3.68881 6.909 3.60801 7.1071 3.60048C7.30519 3.59295 7.49887 3.65925 7.64945 3.78613L12.372 8.43311C12.5174 8.57737 12.5994 8.77208 12.6003 8.97526Z"
              fill="white"
            />
          </svg>
        </button>

        <button
          className={
            "rounded-full bg-[#3FA9F5] h-7 w-7  md:h-10 flex items-center justify-center md:w-10 md:top-1/2 -translate-y-1/2 cursor-pointer"
          }
          ref={nextRef}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6003 8.97526C12.6009 9.07719 12.581 9.17823 12.5419 9.27259C12.5027 9.36696 12.445 9.45278 12.372 9.52515L7.64945 14.1721C7.50123 14.318 7.30021 14.3999 7.09061 14.3999C6.881 14.3999 6.67998 14.318 6.53177 14.1721C6.38356 14.0263 6.30029 13.8285 6.30029 13.6222C6.30029 13.416 6.38356 13.2182 6.53177 13.0723L10.7034 8.97526L6.53964 4.87817C6.41069 4.73001 6.34331 4.53943 6.35097 4.34451C6.35862 4.14958 6.44074 3.96468 6.58091 3.82675C6.72109 3.68881 6.909 3.60801 7.1071 3.60048C7.30519 3.59295 7.49887 3.65925 7.64945 3.78613L12.372 8.43311C12.5174 8.57737 12.5994 8.77208 12.6003 8.97526Z"
              fill="white"
            />
          </svg>
        </button>
      </MaxWidth>
    </MaxWidth>
  )
}
