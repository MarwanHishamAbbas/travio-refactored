import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useRef } from "react"

const FilterCountry = ({
  tabs,
  locale,
  pageType,
}: {
  tabs: Array<{ name: object; href: string }>
  locale: string
  pageType: string
}) => {
  const params = useParams()

  const tabsRef = useRef<HTMLDivElement | null>(null)

  function cNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
  }

  return (
    <div className="max-w-full relative ">
      <div
        style={{
          position: "relative",
          top: 0,
          zIndex: 1000,
          marginTop: 0,
          backgroundColor: "white",
        }}
        className=" w-full border-b border-[rgba(20,13,49,0.10)]"
        ref={tabsRef}
      >
        <div className="w-full overflow-x-scroll">
          <div className="px-5">
            <nav
              className="flex gap-[30px] lg:items-center md:justify-center justify-start items-start"
              aria-label="Tabs"
            >
              {tabs.map((tab, index) => (
                <Link
                  key={index}
                  scroll={false}
                  href={`/${locale}/${pageType}${tab.href}`}
                  // onClick={() => setCurrentTab(index)}
                  className={cNames(
                    `/${params?.handle}` === tab?.href
                      ? "border-[#FFBB0B] text-darkBlue"
                      : "border-transparent text-grey-500 ",
                    "whitespace-nowrap border-b-4 font-satoshi border-orange py-4 px-2 lg:text-base text-sm font-medium"
                  )}
                >
                  {/* @ts-ignore */}
                  {tab?.name?.[locale]}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterCountry
