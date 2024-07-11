"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Country } from "country-state-city"

import { A11y, Controller, Navigation, Scrollbar } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import { Button } from "@/components/ui/button"
import PortableText from "react-portable-text"
import {
  formFieldsTn,
  priceTitleTn,
  membersTn,
  moreTn,
  selNatTn,
  enqTn,
  submitTn,
  expandTn,
} from "@/lib/utils"
import { Swiper, SwiperSlide } from "swiper/react"
import MaxWidth from "@/components/common/MaxWidth"
import SectionHeader from "@/components/common/SectionHeader"
import { ChevronDown, Minus, Plus } from "lucide-react"
import { urlFor } from "@/lib/sanity/sanity-image"

export default function ItinerarySection({
  data,
  locale,
}: {
  data: any
  locale: string
}) {
  return (
    <MaxWidth
      id="itinerary"
      className="flex flex-col  md:gap-10 gap-7 mt-16 relative"
    >
      <SectionHeader
        title={data?.tagline?.[locale]}
        subtitle={data?.title?.[locale]}
        centerLine
      />

      <div className="flex lg:gap-7 gap-[30px] max-lg:flex-col-reverse">
        {/* Travel Schedule */}
        <TravelSchedule data={data?.itinerary_day_cards} locale={locale} />
        {/* Enquire Tab */}

        {/* <div className="sticky min-w-full"> */}
        <EnquireTab locale={locale} />
        {/* </div> */}
      </div>
    </MaxWidth>
  )
}

const TravelSchedule = ({ data, locale }: { data?: any; locale: string }) => {
  const [openStatus, setOpenStatus] = useState<boolean[]>(
    Object.assign({}, Array(data?.length ?? 0).fill(false))
  )

  useEffect(() => {
    setOpenStatus({ ...openStatus, "0": true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full flex flex-1 flex-col gap-5">
      <div className="flex justify-end w-full">
        <button
          className="text-[#3FA9F5] font-satoshi text-[16px] flex gap-2 font-bold lg:mr-8"
          onClick={() => {
            setOpenStatus(
              Object.assign({}, Array(data?.length ?? 0).fill(true))
            )
          }}
        >
          {/* @ts-ignore */}
          {expandTn?.[locale]}{" "}
          <div className="hidden lg:block">{<ChevronDown />}</div>
        </button>
      </div>
      <div className="flex  flex-col gap-5">
        {data?.map((day: any, index: number) => (
          <Expandable
            locale={locale}
            isOpen={openStatus[index]}
            toggleOpen={() => {
              setOpenStatus({ ...openStatus, [index]: !openStatus[index] })
            }}
            key={index}
            {...day}
            data={day}
          />
        ))}
      </div>
    </div>
  )
}

const EnquireTab = ({ locale }: any) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nationality: "",
    phone: "+1",
    from: "",
    to: "",
    members: "1",
    details: "",
  })
  const [mobileNumber, setMobileNumber] = useState({
    mobileCode: "+1",
    mobileNumber: "",
  })

  const setValue = (value: string, key: string) => {
    setFormData({ ...formData, [key]: value })
  }

  return (
    <div className="w-[282px] max-lg:hidden max-lg:min-w-full h-fit font-satoshi rounded-2xl border text-white overflow-hidden bg-lightBlue lg:mt-12 sticky top-0">
      <div className="py-2 px-5 bg-[#1A4767]">
        <div className="flex justify-between">
          <div className="">
            {/* @ts-ignore */}

            <p className="font-bold text-xl">{enqTn?.[locale]}</p>
            <div className="lg:w-1/2 w-1/3 my-2  md:mt-[10px] mt-1 border-[#FFBB0B] text-yellow rounded-full md:rounded-[3px] md:border-b-[3px] border-b-[1px]" />
          </div>
          <div className="relative w-7 h-7">
            <Image src={"/demo/contact_mail_icon.svg"} alt="" fill />
          </div>
        </div>
        <div className="flex gap-1">
          <Image
            src="/icons/whatsapp_logo.svg"
            height={12}
            width={12}
            alt="Whatsapp logo"
          />
          <p className="font-bold text-[10px]">+1 0000 000 000</p>
        </div>
      </div>
      <div className="p-[18px] flex flex-col gap-[18px]">
        <div className="flex  font-medium text-base text-black flex-col gap-2">
          {/* @ts-ignore */}

          <label htmlFor="name">{formFieldsTn?.[locale]?.name}*</label>
          <input
            id="name"
            type="text"
            className="border border-darkBlue/10 text-black rounded p-1 focus:outline-secondary"
            value={formData["name"]}
            onChange={(e) => {
              setValue(e.target.value, "name")
            }}
          />
        </div>
        <div className="flex  font-medium text-base text-black flex-col gap-2 ">
          {/* @ts-ignore */}

          <label htmlFor="email">{formFieldsTn?.[locale]?.email}*</label>
          <input
            id="email"
            type="text"
            className="border border-darkBlue/10 text-black rounded p-1 focus:outline-secondary"
            value={formData["email"]}
            onChange={(e) => {
              setValue(e.target.value, "email")
            }}
          />
        </div>
        <div className="flex font-medium text-base text-black flex-col gap-2">
          <label htmlFor="nationality">
            {/* @ts-ignore */}
            {formFieldsTn?.[locale]?.nationality}*
          </label>
          <select
            id="nationality"
            className="border bg-white border-darkBlue/10 text-black rounded p-1 py-2 focus:outline-secondary"
            value={formData["nationality"]}
            onChange={(e) => {
              setValue(e.target.value, "nationality")
            }}
          >
            <option value="" disabled>
              {/* @ts-ignore */}

              {selNatTn?.[locale]}
            </option>
            {Country.getAllCountries().map((item: any, index: any) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              )
            })}
            <option value="Nepal">Nepal</option>
            <option value="India">India</option>
          </select>
        </div>
        <div className="flex  font-medium text-base text-black flex-col gap-2">
          {/* @ts-ignore */}

          <label htmlFor="mobileNumber">{formFieldsTn?.[locale]?.mobile}</label>
          <div className="border bg-white text-base border-darkBlue/10 text-black rounded p-1 grid grid-cols-[1fr_7fr] gap-1 divide-x-2 divide-darkBlue/10 py-2">
            <input
              className="min-w-0 w-full flex focus:outline-secondary items-center justify-center h-full overflow-hidden focus:outline-none"
              id="mobileCode"
              value={mobileNumber["mobileCode"]}
              onChange={(e) => {
                setMobileNumber({
                  ...mobileNumber,
                  mobileCode: e.target.value || "+",
                })
                setValue(
                  mobileNumber["mobileCode"] + mobileNumber["mobileNumber"],
                  "phone"
                )
              }}
            />
            <input
              className="h-full min-w-0 w-full focus:outline-secondary overflow-hidden focus:outline-none px-2"
              id="mobileNumber"
              value={mobileNumber["mobileNumber"]}
              placeholder="Mobile Number"
              onChange={(e) => {
                setMobileNumber({
                  ...mobileNumber,
                  mobileNumber: e.target.value,
                })
                setValue(
                  mobileNumber["mobileCode"] + mobileNumber["mobileNumber"],
                  "phone"
                )
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 ">
          <div className="flex min-w-0 w-full font-medium text-base text-black flex-col gap-2">
            {/* @ts-ignore */}

            <label htmlFor="from">{priceTitleTn?.from?.[locale]}</label>
            <input
              id="from"
              type="date"
              className="border border-darkBlue/10 focus:outline-secondary text-black rounded p-1"
              value={formData["from"]}
              onChange={(e) => {
                setValue(e.target.value, "from")
              }}
            />
          </div>
          <div className="flex min-w-0 w-full font-medium text-base text-black flex-col gap-2">
            {/* @ts-ignore */}

            <label htmlFor="to">{priceTitleTn?.to?.[locale]}</label>
            <input
              id="to"
              type="date"
              className="border border-darkBlue/10 text-black rounded p-1 focus:outline-secondary"
              value={formData["to"]}
              onChange={(e) => {
                setValue(e.target.value, "to")
              }}
            />
          </div>
        </div>
        <div className="flex font-medium text-base text-black flex-col gap-2">
          {/* @ts-ignore */}

          <p>{membersTn?.[locale]}</p>
          <div className="border border-darkBlue/10 flex gap-2 bg-white p-2 justify-between">
            <div className="font-normal text-sm">
              {/* @ts-ignore */}
              {formFieldsTn?.[locale]?.adults} (+ 12 year)
            </div>
            <div className="flex">
              <div
                className="w-[22px] h-[22px] bg-yellow flex items-center justify-center"
                onClick={() => {
                  setValue(
                    Math.max(parseInt(formData["members"]) - 1, 1).toString(),
                    "members"
                  )
                }}
              >
                {
                  <Minus
                    className="bg-[#FFBB0B]  w-[22px] h-[22px]"
                    color="white"
                    width={"8px"}
                  />
                }
              </div>
              <div className="w-[22px] h-[22px] bg-darkBlue/10 text-black flex items-center justify-center select-none">
                {formData.members}
              </div>

              <div
                className="w-[22px] h-[22px] bg-yellow flex items-center justify-center"
                onClick={() => {
                  setValue(
                    Math.min(parseInt(formData["members"]) + 1, 30).toString(),
                    "members"
                  )
                }}
              >
                {
                  <Plus
                    className="bg-[#FFBB0B]  w-[22px] h-[22px]"
                    color="white"
                    width={"8px"}
                  />
                }
              </div>
            </div>
          </div>
        </div>
        <div className="flex  font-medium text-base text-black flex-col gap-2">
          {/* @ts-ignore */}

          <label htmlFor="details">{moreTn?.[locale]}</label>
          <textarea
            id="details"
            rows={3}
            className="border border-darkBlue/10 text-black focus:outline-secondary rounded p-1"
            value={formData["details"]}
            onChange={(e) => {
              setValue(e.target.value, "details")
            }}
          />
        </div>
        <Button
          //   onClick={() => {
          //     fetch("/api/email", {
          //       method: "POST",
          //       body: JSON.stringify({
          //         subject: "New Enquiry Request",
          //         text: `You received a new "Enquiry" request by ${formData?.name}! Following are the details:

          //             Duration: From - ${formData.from}, To - ${formData.to}
          //             Email: ${formData?.email}
          //             Nationality: ${formData?.nationality}
          //             Adults: ${formData?.members}
          //             Phone: ${formData?.phone}
          //             More info : ${formData?.details}
          //           `,
          //       }),
          //     }).then(() => {
          //       alert(
          //         `Request successfully submitted. You shall hear from us soon!`
          //       );
          //     });
          //   }}
          className="md:h-12 h-10 text-[14px] leading-5 bg-orange rounded-full"
        >
          {/* @ts-ignore */}
          {submitTn?.[locale]}
        </Button>
      </div>
    </div>
  )
}

const Expandable = ({
  data,
  isOpen,
  toggleOpen,
  locale,
}: {
  isOpen: boolean
  toggleOpen: any
  data: any
  locale: string
}) => {
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
    <div>
      <button
        className={`flex flex-nowrap items-start justify-between transition-all w-[100%] ${
          isOpen
            ? "bg-[#3FA9F5] text-white"
            : "bg-darkBlue/[0.02] text-darkBlue"
        }   px-7 md:py-4 py-3 ${isOpen ? "rounded-t-2xl  " : "rounded-2xl"}`}
        onClick={() => {
          toggleOpen()
        }}
      >
        <p className="font-bold lg:text-[20px] lg:leading-8  font-satoshi">
          {data.title[locale]}
        </p>
        <ChevronDown
          width={"24px"}
          height={"24px"}
          className={`${isOpen && "rotate-180"}`}
        />
      </button>
      <div
        className={`flex flex-col gap-6 transition-all  rounded-b-2xl ${
          !isOpen
            ? "overflow-hidden h-0"
            : "p-5 shadow shadow-[#f1f1f1] border-[0.2px] border-[#eeeeee]"
        }`}
        style={{
          boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="relative w-full h-[200px] overflow-hidden max-md:w-full max-md:h-[160px] md:max-w-[914px] md:min-h-[382px] rounded-2xl ">
            <Image
              alt=""
              src={urlFor(data?.image)}
              fill
              quality={100}
              className="object-cover w-full h-full"
            />
          </div>
          {/* <p className="flex-1 text-darkBlue text-[14px] leading-6 md:text-base font-satoshi">
            {data.description?.[locale]}
          </p> */}
          <PortableText
            className="flex-1 text-darkBlue text-base font-satoshi"
            content={data?.description?.[locale]}
            serializers={{}}
          />
        </div>
        <div className="flex flex-col gap-6">
          {data.itinerary_details_lists?.map((list: any, index: number) => (
            <ExpandableList
              key={index}
              title={list.title?.[locale] ?? ""}
              locale={locale}
              icon={list.icon}
              itinerary_details_list_items={list?.itinerary_details_list_items}
            />
          ))}
          <div className="flex gap-2">
            <Image
              width={1000}
              height={1000}
              src="/demo/add (1) 1.png"
              className="w-7 h-7"
              alt=""
            />
            <div>
              <p className="flex-1 md:text-xl text-base font-medium text-darkBlue tracking-tight font-satoshi">
                Optional Activities
              </p>
              <div className="w-20 my-2  md:mt-[10px] mt-1 border-[#FFBB0B] text-yellow rounded-full md:rounded-[3px] md:border-b-[3px] border-b-[1px]" />
            </div>
          </div>

          <div className="hidden md:flex gap-6 max-md:flex-col max-md:items-center max-md:gap-3">
            {data?.activity_cards?.map((data: any, i: number) => (
              <OptionalActivites
                key={i}
                title={data.name?.[locale]}
                img={data.image?.asset?._ref}
                level={data.level}
                desc={data.description?.[locale]}
                price={data.price}
              />
            ))}
          </div>
          <div className="md:hidden">
            <Swiper
              modules={[Navigation, Scrollbar, A11y, Controller]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              updateOnWindowResize
              observer
              observeParents
              onSwiper={setSwiper}
              slidesPerView={1}
            >
              {data?.activity_cards?.map((data: any, i: number) => (
                <SwiperSlide key={i}>
                  <OptionalActivites
                    title={data.name?.[locale]}
                    img={data.image?.asset?._ref}
                    level={data.level}
                    desc={data.description?.[locale]}
                    price={data.price}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <MaxWidth className="lg:gap-12 gap-[15px] px-4 flex justify-end md:hidden">
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

          {/* <ExpandableList
            key={data.itinerary_details_lists?.length}
            title="Special Information"
            locale={locale}
            icon={data.special_information?.icon}
            content={data.special_information?.description}
          /> */}
        </div>
      </div>
    </div>
  )
}

const OptionalActivites = ({ title, img, desc, price, level }: any) => {
  const isLow = level?.toLowerCase() === "low"
  const isMedium = level?.toLowerCase() === "medium"
  const isHigh = level?.toLowerCase() === "high"
  return (
    <div
      style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.06)" }}
      className="w-[95%] md:max-w-[302px]  font-satoshi text-darkBlue 
     rounded-[16px]"
    >
      <Image
        className="max-w-full rounded-t-[16px]"
        width={302}
        height={201}
        quality={100}
        src={urlFor(img)}
        alt="optional_activites"
      />

      <div className="flex flex-col md:gap-3 pt-4 px-4 pb-7">
        <p className=" md:text-xl text-darkBlue font-bold">{title}</p>

        <div className="flex gap-2.5 items-center max-md:hidden">
          <div className="flex gap-[5px] ">
            <div
              className={`w-3.5 h-3.5 border border-gray rounded-full ${
                isLow || isMedium || isHigh
                  ? " bg-[#3FA9F5] border-none "
                  : " bg-white "
              }`}
            />
            <div
              className={`w-3.5 h-3.5 border border-gray rounded-full ${
                isMedium || isHigh ? " bg-[#3FA9F5] border-none " : " bg-white "
              }`}
            />
            <div
              className={`w-3.5 h-3.5 border border-gray rounded-full ${
                isHigh ? " bg-[#3FA9F5] border-none " : " bg-white "
              }`}
            />
          </div>
          <p className="text-gray font-satoshi">{level}</p>
        </div>

        <div className="mt-3.5 flex gap-2 md:hidden ">
          <Image
            width={1000}
            height={1000}
            src="/demo/capital.png"
            className="w-5 h-5"
            alt=""
          />
          <p className="text-gray">{desc}</p>
        </div>

        <p className="text-primary mt-7 font-bold md:hidden underline underline-offset-2 text-[14px] leading-5">
          Read More
        </p>
      </div>
    </div>
  )
}

const ExpandableList = ({
  title,
  icon,
  itinerary_details_list_items,
  content,
  locale,
}: {
  title: string
  icon: any
  itinerary_details_list_items?: any
  content?: any
  locale: string
}) => {
  return (
    <div className="font-satoshi">
      <div className="flex gap-2">
        <div className="relative w-7 h-7">
          <Image
            width={1000}
            height={1000}
            alt=""
            src={urlFor(icon)}
            className="object-center"
          />
        </div>
        <div className="flex flex-col">
          <p className="flex-1 md:text-xl text-base font-medium text-darkBlue tracking-tight font-satoshi">
            {title}
          </p>
          <div className="w-20 my-2  md:mt-[10px] mt-1 border-[#FFBB0B] text-yellow rounded-full md:rounded-[3px] md:border-b-[3px] border-b-[1px]" />
        </div>
      </div>
      <div className="flex flex-col pl-7 gap-2">
        <PortableText
          content={itinerary_details_list_items?.[0]?.[locale]}
          serializers={{}}
        />
        {/* {itinerary_details_list_items?.map((item, index: number) => {
          return (
            <div
              key={index}
              className="flex flex-nowrap items-center text-base font-normal"
            >
              } {item?.[locale]}
            </div>
          );
        })} */}
        {content && (
          <p className="md:text-base text-[14px] leading-6 font-normal text-darkBlue font-satoshi">
            {content}
          </p>
        )}
      </div>
    </div>
  )
}
