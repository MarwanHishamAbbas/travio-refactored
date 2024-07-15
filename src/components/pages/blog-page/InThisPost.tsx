import React, { useState } from "react"
import { removeSpace } from "./BlogContentSection"
// import PortableText from "react-portable-text";

const InThisPost = ({ data, locale }: any) => {
  const [active, setActive] = useState<number>(-1)

  function scrollToTitle(name: string) {
    const element = document.getElementById(name)

    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
      window.history.pushState({}, "", `#${name}`)
    }
  }

  return (
    <div className="lg:pl-20 px-5 ">
      <p className="mt-5 font-[500] text-grey md:text-base max-md:text-[14px]">
        Here are some of the most remarkable spots to explore:
      </p>
      <div className="px-5 mt-5 rounded-2xl  pb-5 py-1  bg-lightBlue text-center">
        <h2 className="text-[20px] md:text-[24px] font-[700] leading-[30px] md:leading-[34px] pt-[20px] md:pt-[16px] text-darkBlue">
          In this post
        </h2>
        <div className="w-[70px] md:w-[66px] md:mt-2 mt-0.5 mx-auto md:border-b-[3px] border-b-2 border-[#FFBB0B] h-1 rounded-full md:rounded-[3px] mb-5" />

        <div className="mt-[18px] grid md:px-40 grid-flow-row  lg:grid-cols-2 gap-y-3  m-auto">
          {data.map((item: any, index: number) => {
            if (item._type === "subsection") {
              return (
                <button
                  onClick={() => {
                    setActive(index)
                    scrollToTitle(removeSpace(item?.tagline?.[locale]))
                  }}
                  // href={`#S${item.tagline?.[locale]}`}
                  className={`flex md:text-[16px] md:leading-7 text-[12px] leading-5 ${active === index ? " decoration-primary underline-offset-4 underline" : " no-underline"}   ${
                    active === index ? " text-primary " : " text-darkBlue s"
                  }`}
                  key={index}
                >
                  {index + 1} . <p>{item.tagline?.[locale]}</p>
                  {/* <PortableText content={item.title?.en} serializers={{}} /> */}
                </button>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default InThisPost
