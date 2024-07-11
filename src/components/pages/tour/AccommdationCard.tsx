/* eslint-disable @next/next/no-img-element */
import { urlFor } from "@/lib/sanity/sanity-image"
import React from "react"

// import Image from "next/image";
// import ReactStars from "react-stars";

// import { urlFor } from "@/sanity/client";
// import { SanityAccommodationSection } from "@/sanity/types";

export function Star() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.80979 0.58541C9.86966 0.401148 10.1303 0.401148 10.1902 0.58541L12.2002 6.77163C12.227 6.85404 12.3038 6.90983 12.3904 6.90983H20.895C19.0888 6.90983 19.1693 7.15775 19.0126 7.27163L13.7503 11.0949C13.6802 11.1459 13.6508 11.2361 13.6776 11.3185L15.6876 17.5048C15.7475 17.689 15.5366 17.8422 15.3799 17.7284L10.1176 13.9051C10.0475 13.8541 9.95254 13.8541 9.88244 13.9051L4.62013 17.7284C4.46338 17.8422 4.25249 17.689 4.31236 17.5048L6.32238 11.3185C6.34916 11.2361 6.31983 11.1459 6.24973 11.0949L0.987415 7.27163C0.830672 7.15775 0.911227 6.90983 1.10497 6.90983H7.60955C7.6962 6.90983 7.77299 6.85404 7.79976 6.77163L9.80979 0.58541Z"
        fill="#FFBB0B"
      />
    </svg>
  )
}

const AccomodationCard = ({ data, locale }: { data: any; locale: string }) => {
  return (
    <div className="rounded-2xl font-satoshi overflow-hidden  w-full place-self-center">
      <div className="text-center bg-[#1A4767] py-3 rounded-t-2xl items-center flex flex-col ">
        <h4 className="text-xl text-white font-semibold">{data.title?.en}</h4>
        <h5 className="text-white text-sm">{data.subtitle?.en}</h5>
        <div className="flex">
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
      </div>
      <div className="bg-[#ecf4ff] py-4 px-5 flex flex-col gap-4">
        {data.resorts?.map((item: any, index: number) => (
          <div key={index} className="flex flex-col">
            <div
              className="w-full h-36 rounded-xl overflow-hidden relative"
              key={index}
            >
              <img
                className="min-h-[123px] max-w-[271px] object-cover max-sm:hidden"
                src={urlFor(item.image.asset._ref)}
                alt={item.image.alt?.[locale]}
              />
              <img
                className="min-h-[123px] max-w-[271px] object-cover sm:hidden"
                src={urlFor(item.image.mobile.asset._ref)}
                alt={item.image.alt?.[locale]}
              />
            </div>
            <h6 className="text-base font-medium">{item.title?.[locale]}</h6>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AccomodationCard
