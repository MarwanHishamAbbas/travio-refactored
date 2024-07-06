import Image from "next/image"

import { Button } from "@/components/ui/button"

import React from "react"
import Head from "next/head"
import { urlFor } from "@/lib/sanity/sanity-image"
import MaxWidth from "@/components/common/MaxWidth"
const HeroSection = ({ data, locale }: { data: any; locale: string }) => {
  const linearGradient =
    "linear-gradient(75.52deg, #000000 1.5%, rgba(0, 0, 0, 0.8) 9.18%, rgba(0, 0, 0, 0.7) 15.93%, rgba(0, 0, 0, 0.6) 37.5%, rgba(0, 0, 0, 0) 63.68%)"

  return (
    <div className="w-full ">
      <div
        className={
          "relative z-10 h-[50vh]  md:bottom-7 flex items-end lg:items-center justify-center"
        }
      >
        <div
          className={
            "w-full h-[50vh] max-md:hidden lg:h-full absolute top-0 left-0 -z-10"
          }
          style={{ background: linearGradient }}
        />
        <Image
          width={1440}
          height={538}
          className={
            "max-md:hidden absolute -z-20 left-0 top-0 w-full h-[50vh] lg:h-full object-cover"
          }
          src={urlFor(data.image?.asset?._ref)}
          alt={"hero"}
        />
        <div
          className={"w-full h-[50vh] md:hidden lg:h-full absolute top-0 -z-10"}
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 54.09%, rgba(0, 0, 0, 0.80) 96.01%)",
          }}
        />

        <>
          <Head>
            <link
              rel="preload"
              as="image"
              href={urlFor(data.image?.asset?._ref)}
            />
          </Head>
          <Image
            id="mobile-75i"
            width={600}
            // sizes="100vw"
            height={540}
            className={
              "absolute md:hidden max-w-full -z-20 left-0 top-0 w-full h-[50vh] lg:h-full object-cover"
            }
            src={urlFor(data.image?.mobile.asset?._ref)}
            alt={""}
          />
        </>

        <MaxWidth className="text-white z-10 w-full ">
          <div className="flex flex-col items-center md:items-start justify-center ">
            <div>
              <h1 className="text-3xl md:text-6xl text-center md:text-start font-black md:w-3/4">
                {data.title[locale]}
              </h1>
              <h3 className="text-sm md:text-xl mt-4 mb-10">
                {data?.subtitle?.[locale]}
              </h3>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2">
              <Button variant={"default"} className="rounded-full">
                {data?.cta_buttons[0]?.label?.[locale]}
              </Button>
              <Button variant={"navy"} className="rounded-full">
                {data?.cta_buttons[1]?.label?.[locale]}
              </Button>
            </div>
            <p className="text-xs w-full text-center md:w-1/4 md:text-white/60 mt-2 mb-8">
              {data?.cta_helper_text?.[locale]}
            </p>

            <footer className=" flex items-center relative bottom-0 pb-2">
              <div className="flex">
                <Image
                  className="max-md:hidden"
                  src={urlFor(data?.scores[0]?.asset?._ref)}
                  width={136}
                  height={73}
                  alt=""
                  quality={100}
                />
                <Image
                  quality={100}
                  width={136}
                  height={73}
                  // priority
                  className="md:hidden"
                  src={urlFor(data?.scores[0]?.mobile?.asset?._ref)}
                  alt=""
                />

                <svg
                  className="mx-[18px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2"
                  height="75"
                  viewBox="0 0 2 75"
                  fill="none"
                >
                  <path
                    d="M1 74L1 0.999997"
                    stroke="#FFBB0B"
                    stroke-width="0.689655"
                    strokeLinecap="round"
                  />
                </svg>

                <Image
                  className="max-md:hidden"
                  src={urlFor(data?.scores[1]?.asset?._ref)}
                  width={136}
                  height={73}
                  alt=""
                  quality={100}
                />
                <Image
                  // priority
                  quality={100}
                  width={136}
                  height={73}
                  className="md:hidden"
                  src={urlFor(data?.scores[1]?.mobile?.asset?._ref)}
                  alt=""
                />
              </div>
            </footer>
          </div>
        </MaxWidth>
      </div>
    </div>
  )
}

export default HeroSection
