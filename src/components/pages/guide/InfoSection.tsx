import React, { useState } from "react"
import PortableText from "react-portable-text"

const removeSpace = (str: string) => {
  const newStr = str.replace(/\s/g, "-")
  return newStr.toLowerCase()
}

const InfoSection = ({ data, locale }: any) => {
  const [head, setHead] = useState(0)

  const handleClickScroll = (name: string) => {
    const element = document.getElementById(name)

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 150,
        behavior: "smooth",
      })
      window.history.pushState({}, "", `#${name}`)
    }
  }
  return (
    <div className="md:py-20 py-10 font-satoshi">
      <div className="lg:flex lg:flex-row lg:gap-x-[2rem] px-5 lg:px-[2rem] gap-20">
        <div className="flex gap-6 relative w-full max-w-[353px]">
          <div className="w-[343px] lg:block hidden">
            {data?.map((item: any, index: any) => (
              <div key={index} className="flex gap-4 w-full">
                <div
                  className={`w-0.5 lg:block hidden ${
                    head === index ? " bg-[#3FA9F5] " : " bg-[#e8e7ea] "
                  }}`}
                />

                <button
                  className="mb-2 w-full"
                  id={"#" + removeSpace(item.title?.[locale])}
                  onClick={() => {
                    setHead(index)
                    handleClickScroll(removeSpace(item.title?.[locale]))
                  }}
                >
                  <div
                    className={
                      head === index
                        ? "bg-[#3FA9F5] cursor-pointer text-white font-medium border-none rounded-lg px-3 py-2"
                        : "border-[1px] cursor-pointer text-darkBlue w-full text-base border-gray border-opacity-40 rounded-lg px-3 py-2"
                    }
                  >
                    {item.title?.[locale]}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile List */}
        {data?.map((item: any, index: any) => (
          <button
            key={index}
            onClick={() => {
              setHead(index)
              handleClickScroll(removeSpace(item?.title?.[locale]))
            }}
            className={`flex flex-row lg:hidden font-[500] justify-start items-center ${
              head === index ? "text-primary" : "text-darkBlue"
            }`}
          >
            <p>{index + 1}</p>
            <div
              className={`text-[14px] font-normal ${
                head === index
                  ? "underline cursor-pointer text-blue font-[500] border-none rounded-lg px-3 py-2"
                  : "cursor-pointer text-darkBlue font-[500] border-opacity-40 rounded-lg px-3 py-2"
              }`}
            >
              {item.title?.[locale]}
            </div>
          </button>
        ))}
        <div className="lg:w-2/3 md:mt-20 mt-10 lg:mt-0 w-full">
          {data?.map((item: any, index: any) => (
            <div
              key={index}
              id={removeSpace(item.title?.[locale])}
              className="mb-10"
            >
              <h2 className="md:text-2xl text-[20px] leading-[30px] font-semibold">
                {item.title?.[locale]}
              </h2>
              <div className="md:w-[89px] border-[#FFBB0B] border-b md:border-b-[3px] w-[75px] mt-1 md:mt-2.5 my-3 rounded-full" />
              {item.content?.en && (
                <PortableText
                  className="text-darkBlue md:text-[16px] md:leading-7 text-[14px] leading-5"
                  content={item.content?.[locale]}
                  serializers={{}}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfoSection
