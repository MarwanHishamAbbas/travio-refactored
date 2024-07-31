/* eslint-disable @next/next/no-img-element */
"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { getPriceSymbol, DateFormat } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Any } from "next-sanity"
import { Input } from "@/components/ui/input"
import {
  bookTourTn,
  datesTn,
  doubleSeaterTn,
  exactTn,
  hereTn,
  perPersonTn,
  personalizeTn,
  priceTitleTn,
  roomTypeTn,
  secureTn,
  tripTn,
  viewLessBtn,
  viewMoreTn,
} from "@/lib/utils"
import {
  formatDateToYYYYMMDD,
  generateNewPriceList,
  stripTime,
} from "@/lib/dates"
import MaxWidth from "@/components/common/MaxWidth"
import { ChevronDown } from "lucide-react"
import { useBookingStore } from "@/store/BookingProvider"

interface SinglePrice {
  from: Date
  to: Date
  availability?: "Available" | "Full" | "Almost Full" | "Attention"
  bookingLink?: string
  currentPrice?: Any
  actualPrice?: any
  roomType?: string
}

const MAPPINGS = {
  Available: {
    color: "text-darkBlue",
    availablecolor: "text-darkBlue",
    availability: "Available",
  },
  Full: {
    color: "text-grey",
    availablecolor: "text-grey italic",
    availability: "Full",
  },
  "Almost Full": {
    color: "text-darkBlue",
    availablecolor: "text-red",
    availability: "Almost Full",
  },
  Attention: {
    color: "text-red",
    availablecolor: "",
    availability: "Available",
  },
}

// write a function that takes start date and end date and returns the price for that week using the the function generatePriceList

function PriceList({
  data,
  slug,
  locale,
  duration,
}: {
  data: any
  slug: any
  locale: string
  duration?: number
}) {
  const [selected, setSelected] = React.useState(-1)
  const [collapsed, setCollapsed] = React.useState(false)
  const [show, setShow] = React.useState(10)
  const [startMonth, setStartMonth] = React.useState(new Date())
  const setSelectedTrip = useBookingStore((state) => state.setSelectedTrip)

  let prices: SinglePrice[] = generateNewPriceList(
    data,
    locale,
    duration
  ).filter(
    (tour) => stripTime(tour.from).getTime() >= stripTime(startMonth).getTime()
  )

  React.useEffect(() => {
    setCollapsed(window.innerWidth < 768)
    window.addEventListener("resize", () => {
      setCollapsed(window.innerWidth < 768)
    })
  }, [])

  return (
    <MaxWidth
      className=" bg-[rgba(20,13,49,0.02)]  lg:bg-transparent mt-16"
      id="pricing"
    >
      <div
        className={` transition-all font-semibold rounded-2xl lg:bg-[rgba(20,13,49,0.02)] bg-transparent bg-opacity-60 w-full  py-3 lg:px-5 px-0`}
      >
        <div className="flex-col font-satoshi  lg:flex-row  flex justify-between">
          <div className="gap-3 flex flex-col my-2">
            <h1 className="tracking-wide max-md:text-[14px] text-grey font-medium">
              {/* @ts-ignore */}
              {datesTn?.[locale]}
              <Link
                className="text-[#3FA9F5]"
                href={"/" + locale + "/tailor_your_tour"}
              >
                {/* @ts-ignore */}

                {hereTn?.[locale]}
              </Link>
            </h1>
            <div className="flex items-center gap-2">
              <img
                src="/demo/lock_icon.svg"
                height={24}
                width={24}
                alt="lock"
              />
              <p className="font-bold text-[14px] lg:text-base text-[#3FA9F5]">
                {/* @ts-ignore */}

                {secureTn?.[locale]}
              </p>
            </div>
          </div>
          <div className="my-3 flex flex-col justify-end items-end font-semibold ">
            <div className="md:w-max w-max">
              <Input
                type="date"
                min={formatDateToYYYYMMDD(new Date())}
                name="startMonth"
                placeholder="Select a date"
                id=""
                onChange={(e) => {
                  setStartMonth(new Date(e.target.value))
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className={`md:grid  flex frow-row justify-start gap-10 md:gap-2 w-full text-[14px]  py-3 px-2 font-medium lg:text-[20px] lg:leading-8 ${
              collapsed ? " grid-cols-6" : "grid-cols-12"
            }`}
          >
            <h1 className="text-left ml-5 lg:col-span-2 text-darkBlue font-satoshi col-span-1">
              {/* @ts-ignore */}

              {priceTitleTn?.from?.[locale]}
            </h1>
            <p></p>
            <h1 className="lg:col-span-3 font-satoshi text-darkBlue col-span-1">
              {/* @ts-ignore */}

              {priceTitleTn.to?.[locale]}
            </h1>

            <>
              {/* <p className="lg:col-span-3"></p> */}
              <h1 className="lg:col-span-6 font-satoshi text-darkBlue col-span-1 md:ml-0 ml-[65px] text-center">
                {/* @ts-ignore */}

                {priceTitleTn.price?.[locale]}
              </h1>
            </>
          </div>
          {prices.map((price, index) =>
            index < show ? (
              <div
                className={`rounded-lg text-darkBlue   transition-all ${
                  selected !== index
                    ? "bg-white py-1 "
                    : "bg-[#3FA9F5] shadow-md text-white"
                }`}
                key={index}
              >
                <div
                  className={`md:grid flex justify-between items-center font-bold  gap-2 py-[7px] md:px-2 px-5 cursor-pointer text-xl ${
                    collapsed ? " grid-cols-6" : "grid-cols-12"
                  }`}
                  onClick={() => {
                    selected === index ? setSelected(-1) : setSelected(index)
                  }}
                >
                  <p
                    className={`md:col-span-2 font-satoshi whitespace-nowrap  text-base md:leading-6 max-md:text-[10px] max-md:leading-[12px] max-md:w-[72px] ${
                      collapsed
                        ? "text-[12px] max-md:leading-3 md:text-sm ml-2"
                        : "ml-5"
                    }`}
                  >
                    {DateFormat(price.from, true)}
                  </p>

                  <img
                    src={
                      selected === index
                        ? "/demo/arrow_icon.svg"
                        : "/demo/arrow_blue.svg"
                    }
                    height={9}
                    width={40}
                    alt=""
                    className="my-auto hidden md:block mx-auto"
                  />
                  <svg
                    className="block md:hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M10.6674 8.15491C10.6679 8.06431 10.6503 7.97449 10.6154 7.89062C10.5806 7.80674 10.5293 7.73045 10.4645 7.66612L6.26663 3.53547C6.13489 3.40584 5.9562 3.33301 5.76989 3.33301C5.58357 3.33301 5.40489 3.40584 5.27314 3.53547C5.1414 3.66511 5.06738 3.84093 5.06738 4.02427C5.06738 4.2076 5.1414 4.38342 5.27314 4.51306L8.98124 8.15491L5.28014 11.7968C5.16552 11.9285 5.10562 12.0979 5.11243 12.2711C5.11923 12.4444 5.19222 12.6088 5.31682 12.7314C5.44143 12.854 5.60846 12.9258 5.78454 12.9325C5.96062 12.9392 6.13279 12.8803 6.26663 12.7675L10.4645 8.63682C10.5937 8.50859 10.6666 8.33552 10.6674 8.15491Z"
                      fill="#FFBB0B"
                    />
                  </svg>
                  <p
                    className={`md:col-span-2 whitespace-nowrap font-satoshi max-md:text-[10px] max-md:leading-3 text-base w-[75px] ${
                      collapsed && "text-[12px] max-md:leading-3"
                    }`}
                  >
                    {DateFormat(price.to, true)}
                  </p>

                  <>
                    <p
                      className={`md:col-span-3 font-satoshi text-center text-[10px] max-md:leading-3 md:text-base ${
                        MAPPINGS[price.availability || "Available"]
                          .availablecolor
                      } ${selected === index ? "text-white" : ""}`}
                    >
                      {MAPPINGS[price.availability || "Available"].availability}
                    </p>

                    <div
                      className={`md:col-span-2 font-satoshi  text-[10px] max-md:leading-3 md:text-base text-center md:flex items-center gap-2 ${
                        MAPPINGS[price.availability || "Available"].color
                      } ${selected === index ? "opacity-0" : ""}`}
                    >
                      <p>
                        {getPriceSymbol(locale)} {price.currentPrice?.[locale]}
                      </p>
                      {price.actualPrice && (
                        <p
                          className={`line-through font-satoshi text-grey text-[8px] font-bold md:text-xs`}
                        >
                          {getPriceSymbol(locale)} {price.actualPrice?.[locale]}
                        </p>
                      )}
                    </div>
                    <ChevronDown
                      height={20}
                      width={20}
                      className={`ml-auto block
                     my-auto transition-all ${
                       selected === index && "-rotate-180"
                     }`}
                    />
                  </>
                </div>
                {selected === index && (
                  <div className="bg-white text-darkBlue lg:p-8 p-5 rounded-b-lg col-span-full flex justify-between">
                    <div className="flex gap-2 flex-col">
                      <div className="flex font-satoshi gap-3 items-center">
                        <p
                          className={`${
                            MAPPINGS[price.availability || "Available"].color
                          } font-bold whitespace-nowrap text-destructive ${
                            collapsed
                              ? "text-2xl"
                              : " text-[40px] leading-[50px] "
                          }`}
                        >
                          ${price.currentPrice?.[locale]}
                        </p>
                        {price.actualPrice && (
                          <h1
                            className={`text-grey line-through md:text-[24px] leading-9 font-bold whitespace-nowrap ${
                              collapsed
                                ? "md:text-[24px] text-sm leading-9"
                                : "text-2xl"
                            }`}
                          >
                            {getPriceSymbol(locale)}
                            {price.actualPrice?.[locale]}
                          </h1>
                        )}
                        {collapsed && (
                          <Link
                            onClick={() => {
                              setSelectedTrip({
                                from: price.from,
                                to: price.to,
                                price: price.currentPrice,
                                initialPrice: price.actualPrice,
                              })
                            }}
                            href={`/${locale}/tours/${slug?.current}/payment`}
                            className={`flex items-center`}
                          >
                            <Button
                              variant={"destructive"}
                              className="!bg-red font-satoshi flex items-center justify-center gap-1 text-sm leading-[18px] font-semibold"
                            >
                              {/* @ts-ignore */}

                              {bookTourTn?.[locale]}
                            </Button>
                          </Link>
                        )}
                      </div>
                      <p className="text-grey font-satoshi mt-3 font-normal text-[10px] max-md:leading-5 md:text-sm">
                        {/* @ts-ignore */}
                        {perPersonTn?.[locale]} {/* @ts-ignore */}
                        {price.roomType || doubleSeaterTn?.[locale]}
                      </p>
                      <p className="md:text-sm font-satoshi text-[12px] font-normal text-darkBlue leading-5">
                        {/* @ts-ignore */}

                        {roomTypeTn?.[locale]}
                        <span className="text-[#3FA9F5] font-medium">
                          {" "}
                          {/* @ts-ignore */}
                          {exactTn?.[locale]}
                        </span>
                      </p>
                      <p className="md:text-sm font-satoshi font-normal text-darkBlue text-[12px] leading-5">
                        <span className="text-[#3FA9F5] font-medium">
                          {/* @ts-ignore */}

                          {tripTn?.[locale]}
                        </span>{" "}
                        {/* @ts-ignore */}
                        {personalizeTn?.[locale]}
                      </p>
                    </div>
                    {!collapsed && (
                      <Link
                        onClick={() => {
                          setSelectedTrip({
                            from: price.from,
                            to: price.to,
                            price: price.currentPrice,
                            initialPrice: price.actualPrice,
                          })
                        }}
                        href={`/${locale}/tours/${slug?.current}/payment`}
                        className={`flex items-center`}
                      >
                        <Button
                          variant={"destructive"}
                          className="!bg-red flex text-base md:h-12 h-10 items-center font-bold justify-center gap-2 px-5 !py-3 !my-auto"
                        >
                          {/* @ts-ignore */}
                          {bookTourTn?.[locale]}{" "}
                          <Image
                            height={10}
                            width={20}
                            alt=""
                            src="/demo/white_arrow.png"
                          />
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : null
          )}
          {show < prices.length ? (
            <div
              onClick={() => {
                setShow(show + 4)
              }}
              className="text-center font-satoshi flex gap-x-2 items-center justify-center text-base lg:text-base font-semibold my-3 text-[#3FA9F5] cursor-pointer"
            >
              {/* @ts-ignore */}
              {viewMoreTn?.[locale]} <ChevronDown />
            </div>
          ) : (
            <div
              onClick={() => {
                setShow(show - 4)
              }}
              className="text-center font-satoshi  text-base lg:text-lg font-semibold flex gap-x-2 items-center justify-center my-3 text-[#3FA9F5] cursor-pointer"
            >
              {/* @ts-ignore */}

              {viewLessBtn?.[locale]}
              <div className="rotate-180">
                <ChevronDown />
              </div>
            </div>
          )}
        </div>
      </div>
    </MaxWidth>
  )
}

export default PriceList
