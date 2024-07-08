"use client"
import React, { useState } from "react"
import Image from "next/image"

import { filterTn, nextTn, prevTn, starTn } from "@/lib/utils"
import { Star } from "lucide-react"
import { urlFor } from "@/lib/sanity/sanity-image"
import SectionHeader from "@/components/common/SectionHeader"
import MaxWidth from "@/components/common/MaxWidth"

export function Pagination({
  onChange,
  total,
  pageSize,
  currentPage,
  locale,
}: {
  onChange: (page: number) => void
  total: number
  pageSize: number
  currentPage: number
  locale?: string | any
}) {
  return (
    <div className={"flex items-center justify-between w-full my-12"}>
      <button
        onClick={() => currentPage > 0 && onChange(currentPage - 1)}
        className={
          " border-[1px] rounded-full px-6 py-2 " +
          (currentPage > 0 ? "opacity-50" : "opacity-0 cursor-default")
        }
        type="button"
      >
        {/* @ts-ignore */}
        {prevTn?.[locale]}
      </button>
      <div className={"flex gap-3"}>
        {Array.from(Array(Math.ceil(total / pageSize)).keys()).map((x, i) => (
          <div
            key={i}
            onClick={() => onChange(i)}
            className={
              "md:w-12 md:h-12 h-10 w-10 flex items-center justify-center cursor-pointer " +
              (i === currentPage ? "bg-primary" : "")
            }
          >
            <div>{i + 1}</div>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          currentPage < Math.ceil(total / pageSize) - 1
            ? onChange(currentPage + 1)
            : null
        }
        className={
          "bg-black text-white rounded-full h-[42px] px-6 py-2 " +
          (currentPage < Math.ceil(total / pageSize) - 1
            ? ""
            : "opacity-0 cursor-default")
        }
        type="button"
      >
        {/* @ts-ignore */}

        {nextTn?.[locale]}
      </button>
    </div>
  )
}

const Filter = ({
  ratings,
  addSelectedRating,
  removeSelectedRating,
  selectedRating,
  locale,
}: {
  addSelectedRating: (x: number) => void
  removeSelectedRating: (x: number) => void
  selectedRating: number[]
  ratings: { count: number; stars: number }[]
  locale: string
}) => {
  const reverseRatings = [...ratings].reverse()

  return (
    <div
      className="rounded-xl shadow shadow-[#f1f1f1] md:w-[300px] my-2"
      style={{
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className=" py-[16px] tracking-wide font-medium rounded-t-2xl px-[18px] bg-[#ecf4ff] ">
        {/* @ts-ignore */}

        {filterTn?.[locale]}
      </div>
      <div className="flex flex-col px-6 py-5 gap-y-5 md:gap-y-8">
        {reverseRatings?.map((rating, idx) => (
          <div key={idx} className=" flex gap-x-2 justify-center items-center">
            <input
              onChange={(e) =>
                e.target.checked
                  ? addSelectedRating(rating.stars)
                  : removeSelectedRating(rating.stars)
              }
              checked={selectedRating.includes(rating.stars)}
              type="checkbox"
              className="w-fit"
            />
            <span className="text-sm  opacity-60 font-medium">
              {/* @ts-ignore */}
              {rating.stars} {starTn?.[locale]}
            </span>

            <span className="text-sm opacity-60 font-medium">
              {rating.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const RatingCard = ({
  title,
  review,
  country,
  name,
  date,
  star,
  varient,
}: any) => {
  return (
    <div
      className={
        "w-full rounded-2xl font-satoshi  px-[20px] py-[24px] space-y-[16px] shadow shadow-[#f1f1f1] border-[0.2px] border-[#eeeeee]"
      }
      style={{
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="flex  text-xl">
        {Array.from(Array(star).keys()).map((x, i) => (
          <Star key={i} />
        ))}
      </div>

      <h3 className="text-base font-satoshi font-bold leading-normal ">
        {title?.substring(0, 33)}...
      </h3>

      <h5 className="text-xs font-satoshi md:text-sm font-medium text-gray opacity-80 leading-[24px] md:leading-snug">
        {review}...
      </h5>
      <div className="flex font-satoshi gap-x-2 ">
        <div>
          <Image
            width={38}
            height={38}
            src={urlFor(country?.asset?._ref)}
            className="rounded-full h-[38px] w-[38px] max-sm:hidden"
            alt="country"
          />
          <Image
            width={38}
            height={38}
            src={urlFor(country?.mobile?.asset._ref)}
            className="rounded-full h-[38px] w-[38px] sm:hidden"
            alt="country"
          />
        </div>
        <div className="ml-2 md:ml-3 my-auto ">
          <h6 className="text-xs md:text-sm font-bold font-satoshi text-darkblue leading-tight md:leading-snug">
            {name}
          </h6>

          <h6 className="text-[10px] md:text-xs font-satoshi  font-medium  md:font-normal text-gray  leading-[20px]">
            {date}
          </h6>
        </div>
      </div>
    </div>
  )
}

const ReviewSection = (props: any) => {
  let {
    data: { title, tagline, reviews },
    locale,
  } = props

  const [pageNumber, setPageNumber] = useState(0)
  const [selectedRating, setSelectedRating] = useState<number[]>([])

  const ratings: { stars: number; count: number }[] = []
  ;[1, 2, 3, 4, 5].forEach((r) => {
    ratings.push({
      stars: r,
      count: 0,
    })
  })

  reviews?.forEach((r: any) => {
    if (r.rating && r.rating > 0 && r.rating <= 5)
      ratings[r.rating - 1 || 0].count++
  })

  if (selectedRating.length !== 0) {
    reviews = reviews?.filter(
      (x: any) => x.rating && selectedRating.includes(x.rating)
    )
  }

  // sort reviews based on rating higher rating
  reviews = reviews?.sort((a: any, b: any) => b.rating - a.rating)

  const pageSize = 3
  return (
    <MaxWidth
      id="reviews"
      className="pb-[50px] md:pt-[80px] pt-[50px] md:py-[80px]  text-black "
    >
      <SectionHeader
        title={tagline?.[locale]}
        subtitle={title?.[locale]}
        centerLine
      />

      <div className="flex font-satoshi gap-y-[30px] md:gap-x-5 px-0 lg:px-5 flex-col md:flex-row">
        <div className="w-full md:w-[430px] ">
          <Filter
            locale={locale}
            addSelectedRating={(rating) =>
              setSelectedRating((old) => [...old, rating])
            }
            removeSelectedRating={(rating) =>
              setSelectedRating((old) => old.filter((x) => x !== rating))
            }
            selectedRating={selectedRating}
            ratings={ratings}
          />
        </div>
        <div className="md:pl-2 space-y-5  md:col-span-4 w-full">
          <div className="space-y-5 md:space-y-2  ">
            {reviews
              ?.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize)
              .map((item: any, index: number) => (
                <RatingCard
                  key={index}
                  title={item.title?.[locale]}
                  name={item?.name.en}
                  star={item.rating}
                  review={item.text?.[locale]}
                  country={item.avatar}
                  date={item.time?.[locale]}
                />
              ))}
          </div>
          <Pagination
            currentPage={pageNumber}
            pageSize={pageSize}
            onChange={setPageNumber}
            locale={locale}
            total={reviews?.length || 0}
          />
        </div>
      </div>
    </MaxWidth>
  )
}

export default ReviewSection
