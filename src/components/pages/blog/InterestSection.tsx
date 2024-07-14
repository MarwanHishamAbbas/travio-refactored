/* eslint-disable @next/next/no-img-element */
import MaxWidth from "@/components/common/MaxWidth"
import { urlFor } from "@/lib/sanity/sanity-image"
import Link from "next/link"

const InterestSection = (props: any) => {
  const {
    data: { title, tagline, interests },
    locale,
  } = props as any

  return (
    <MaxWidth className="md:my-[68px] my-[50px] flex flex-col justify-center items-center font-satoshi ">
      <h2 className="text-primary text-sm lg:text-base font-medium text-center">
        {tagline?.[locale]}
      </h2>
      <h4 className="lg:text-4xl text-2xl mt-3 font-[700] text-darkBlue text-center">
        {title?.[locale]}
      </h4>
      <div className="w-[85px] md:w-[117px] border-[#FFBB0B] mt-1 md:mt-3 rounded-full md:rounded-[3px] md:border-b-[3px] border-b-[2px]" />

      <div
        style={{
          boxShadow: "0px 4px 20px 0px #0000000F",
        }}
        className="grid grid-flow-row gap-3 gap-y-[30px] md:grid-cols-3 grid-cols-2 rounded-[16px] w-full px-2 lg:px-10 lg:pt-12 lg:pb-12 pb-[30px] pt-[30px] md:mt-12 mt-10"
      >
        {interests &&
          interests.map((item: any, index: any) => (
            <div
              key={index}
              className="font-satoshi text-darkBlue max-md:h-[94px]"
            >
              <div
                className={
                  index % 3 === 2
                    ? ""
                    : "md:border-r md:border-opacity-25 md:border-gray"
                }
              >
                <Link
                  href={`/${locale}/blogs${item?.link?.slug?.current}`}
                  className="justify-center items-center text-center flex flex-col"
                >
                  <div className="w-full md:max-w-[104px] bg-[#F2FAFF] max-w-[60px] md:p-[18px] p-[10px] h-full rounded-[8px]">
                    <img
                      // style={{ margin: "auto" }}
                      src={urlFor(item.icon)}
                      className="w-full md:max-w-[68px] md:min-h-[68px] max-w-[40px] min-h-[40px] md:rounded-[8px] rounded-[4px]"
                      alt=""
                    />
                  </div>
                  <p className="text-center text-base max-md:text-[14px] max-md:leading-5 md:my-5 my-2.5 font-medium text-primary">
                    {item.name?.[props.locale]}
                  </p>
                </Link>
              </div>
              {index <= 2 && (
                <div className="md:block hidden mt-12 border-opacity-25 border-b border-[rgba(20, 13, 49, 0.1)]" />
              )}
              {(index + 1) % 3 === 0 && (
                <div
                  className={
                    index !== interests.length - 1
                      ? "mt-12 border-opacity-25 border-gray"
                      : "hidden"
                  }
                />
              )}
            </div>
          ))}
      </div>
    </MaxWidth>
  )
}

export default InterestSection
