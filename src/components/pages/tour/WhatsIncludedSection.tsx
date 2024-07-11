"use client"

import MaxWidth from "@/components/common/MaxWidth"
import { urlFor } from "@/lib/sanity/sanity-image"
import { SanityWhatsIncludedSection } from "@/types/sanity"
import Image from "next/image"
import { useState } from "react"
import PortableText from "react-portable-text"
import styled from "styled-components"

const RootStyle = styled.div`
  div {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  @media (max-width: 768px) {
    gap: 4px;
  }
`

export default function WhatsIncludedSection({
  data,
  locale,
}: {
  data: SanityWhatsIncludedSection
  locale: string
}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [expandedNotes, setExpandedNotes] = useState<any>([])

  const whiteStyle = {
    filter: "grayscale(100%) brightness(1000%) sepia(100%) hue-rotate(50deg)",
  }

  const yellowStyle = {
    filter:
      "invert(100%) sepia(100%) saturate(750%) hue-rotate(1454deg) brightness(115%) contrast(100%)",
  }

  // Function to toggle expansion of notes
  const toggleNoteExpansion = (index: number) => {
    if (expandedNotes.includes(index)) {
      setExpandedNotes(expandedNotes.filter((item: any) => item !== index))
    } else {
      setExpandedNotes([...expandedNotes, index])
    }
  }

  // Function to check if note is expanded
  const isNoteExpanded = (index: any) => {
    return expandedNotes.includes(index)
  }

  // Function to get shortened version of note
  const getShortenedNote = (note: any) => {
    const maxLength = 20
    if (note.length <= maxLength) return note
    return note.substring(0, maxLength) + "..."
  }

  return (
    <MaxWidth
      id="inclusions"
      className="flex flex-col py-7 mx-auto max-w-[1312px] px-4 font-satoshi relative"
    >
      <div>
        <h2 className="font-bold text-[20px] leading-[30px] lg:text-[24px] lg:leading-[34px] text-darkBlue">
          {data?.title?.[locale]}
        </h2>
        <div className="w-28 my-2 text-yellow border-[#FFBB0B]  rounded-full border-b-[3px] max-md:my-1" />
      </div>
      <div className="hidden divide-y divide-darkBlue/10 lg:block  my-3 lg:w-3/4  w-full">
        {data?.inclusion_list?.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_4fr] py-8 pb-7 gap-7"
            >
              <div className="flex items-center gap-2 self-start">
                <div className="w-7 h-7 relative">
                  <Image
                    //   @ts-ignore
                    src={item.icon ? urlFor(item.icon) : ""}
                    alt={item.icon?.alt?.[locale] ?? ""}
                    className="object-cover"
                    width={200}
                    height={200}
                  />
                </div>
                <p className="lg:text-[20px] text-nowrap lg:leading-7 text-base font-medium text-primary">
                  {item.title?.[locale]}
                </p>
              </div>
              <div className="flex flex-col">
                <RootStyle>
                  <PortableText
                    content={item.description?.[0]?.[locale] as any}
                  />
                </RootStyle>
                {/* {item?.description?.map((note, index) => {
                  return (
                    <p
                      className="md:text-base text-[14px] leading-6 md:font-medium font-normal text-darkBlue"
                      key={index}
                    >
                      {note?.[locale]}
                    </p>
                  );
                })} */}
              </div>
            </div>
          )
        })}
      </div>
      <div className=" lg:hidden text-base">
        {/* The Icons color need to be white for the background to be blue  ---> Done */}
        <div className=" flex flex-row  justify-evenly mt-10 bg-[#3FA9F5] px-4 pt-4 rounded-t-[8px] items-center gap-5">
          {data?.inclusion_list?.map((item, index) => (
            <div
              onClick={() => setCurrentIndex(index)}
              key={index}
              style={{
                borderBottom:
                  index === currentIndex
                    ? "3px solid #FFBB0B "
                    : "2px solid transparent",
              }}
              className="flex h-full pb-2 w-full justify-center  items-center transition-all border-b-orange-400 border-b-2 gap-2  self-start"
            >
              <div className="w-7 h-7  relative">
                <Image
                  width={1000}
                  height={1000}
                  style={whiteStyle}
                  //   @ts-ignore
                  src={item.icon ? urlFor(item.icon) : ""}
                  alt={item.icon?.alt?.[locale] ?? ""}
                  className="object-cover  w-6 h-6"
                />
              </div>
            </div>
          ))}
        </div>
        {data?.inclusion_list && (
          <div className="flex bg-white shadow-xl shadow-[#f5f5f5]  flex-col justify-start items-start gap-5 p-5">
            {
              <div className="flex gap-1.5 items-center">
                <Image
                  width={1000}
                  height={1000}
                  style={yellowStyle}
                  //   @ts-ignore
                  src={urlFor(data?.inclusion_list[currentIndex]?.icon)}
                  alt={
                    data?.inclusion_list[currentIndex]?.icon?.alt?.[locale] ??
                    ""
                  }
                  className="object-cover w-6 h-6"
                />

                <p className="lg:text-xl text-base font-medium text-darkBlue">
                  {data?.inclusion_list[currentIndex]?.title?.[locale]}
                  <div className=" w-12 my-1 text-yellow border-[#FFBB0B]  rounded-full border-[1.5px]" />
                </p>
              </div>
            }
            <div className="flex text-base flex-col">
              <RootStyle>
                <PortableText
                  content={
                    isNoteExpanded(currentIndex)
                      ? data?.inclusion_list[currentIndex]?.description?.[0]?.[
                          locale
                        ]
                      : getShortenedNote(
                          data?.inclusion_list[currentIndex]
                            ?.description?.[0]?.[locale]
                        )
                  }
                  serializers={{}}
                />
              </RootStyle>
              {/* @ts-ignore */}
              {data?.inclusion_list[currentIndex]?.description?.[0]?.[locale]
                ?.length > 20 && (
                <div className="flex justify-center mt-4">
                  <button
                    className="text-primary text-center text-base font-medium"
                    onClick={() => toggleNoteExpansion(currentIndex)}
                  >
                    {isNoteExpanded(currentIndex) ? "View Less" : "View More"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MaxWidth>
  )
}
