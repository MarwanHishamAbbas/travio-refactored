/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import MaxWidth from "@/components/common/MaxWidth"
import { urlFor } from "@/lib/sanity/sanity-image"
import Link from "next/link"

// import { urlFor } from "../../../sanity/lib/client";

const FeatureTopBlogSection = (props: any) => {
  const {
    data: { cards },
  } = props
  return (
    <MaxWidth className={" font-satoshi md:mt-16 mt-[90px]"}>
      <div>
        <div className="mb-[30px] md:mb-12 flex flex-col lg:items-center items-start">
          <p className="text-primary text-xs md:text-base  font-medium uppercase leading-tight md:leading-normal">
            EXPLORE COUNTRIES
          </p>

          <h2 className="text-[24px] flex flex-col relative justify-start md:items-center md:text-[40px] leading-[32px] md:leading-tight  -tracking-[1.2px] mt-2 md:mt-3  w-fit  font-bold">
            Travel Inspiration by Destination
            <div className="w-[85px] md:w-[117px] border-[#FFBB0B] text-yellow mt-1 md:mt-3 rounded-full md:rounded-[3px] md:border-b-[3px] border-b-[2px]" />
          </h2>
        </div>

        <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 lg:gap-7">
          {cards.map((card: any, i: number) => {
            return (
              <Link
                key={i}
                href={`/${props.locale}/blogs` + card?.link?.slug?.current}
                className={
                  "bg-red relative rounded-2xl overflow-hidden lg:" +
                  ((i + 1) % 3 === Math.floor(i / 3) ? "col-span-2" : "")
                }
              >
                <div
                  className={
                    "absolute bottom-2 font-bold lg:text-base text-[10px] leading-3 text-white left-3 bg-[#3FA9F5] rounded-2xl px-4 py-1.5"
                  }
                >
                  {card?.name?.[props.locale]}
                </div>
                {card?.link?.sections?.map((section: any, i: number) => (
                  <div key={i}>
                    {section?.image && (
                      <>
                        <img
                          src={urlFor(section?.image?.asset?._ref)}
                          className={
                            "w-full max-md:rounded-[8px] object-cover block h-[224px] max-md:hidden"
                          }
                          alt={section?.header?.[props.locale]}
                        />
                        <img
                          src={urlFor(section?.image?.mobile?.asset?._ref)}
                          className={
                            "w-full max-md:h-[120px] max-md:rounded-[8px] object-cover block md:hidden"
                          }
                          alt={section?.header?.[props.locale]}
                        />
                      </>
                    )}
                  </div>
                ))}
              </Link>
            )
          })}
        </div>
      </div>
    </MaxWidth>
  )
}

export default FeatureTopBlogSection
