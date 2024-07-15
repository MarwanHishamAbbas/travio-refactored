/* eslint-disable @next/next/no-img-element */
import React from "react"
import { useState } from "react"
import {
  // useRouter
  usePathname,
} from "next/navigation"

const Sidebar = ({ sections, locale }: any) => {
  const [selectedSection, setSelectedSection] = useState(null)
  const [selectedSubSection, setSelectedSubSection] = useState(null)
  const [nestedSlugSection, setNestedSection] = useState(null)

  //   const router = useRouter();
  const pathname = usePathname()

  const handleSectionClick = (sectionKey: any) => {
    setSelectedSection(sectionKey === selectedSection ? null : sectionKey)
  }

  const handleSubSectionClick = (subSectionSlug: any) => {
    setSelectedSubSection(
      subSectionSlug === selectedSubSection ? null : subSectionSlug
    )
    // router.push(subSectionSlug);
    window.history.pushState({}, "", `?slug=${subSectionSlug}`)
  }

  const handleNestedSection = (subSectionSlug: any) => {
    setNestedSection(
      subSectionSlug === nestedSlugSection ? null : subSectionSlug
    )
    // router.push(subSectionSlug);
    window.history.pushState({}, "", `?slug=${subSectionSlug}`)
  }

  return (
    <div className="sidebar w-full xl:max-w-[390px] flex flex-col gap-3">
      {sections.map((section: any, index: number) => (
        <div
          key={section._key}
          className={`flex flex-col ${
            selectedSection === section._key && " rounded-b-2xl shadow-md"
          }`}
        >
          <button
            onClick={() => handleSectionClick(section._key)}
            className="font-satoshi md:text-lg text-[14px] leading-6 py-3 px-4 bg-lightBlue rounded-t-2xl flex justify-between items-start"
          >
            <p className={`tree-title`}>{section?.tree_title?.[locale]}</p>
            <img
              src="/demo/down_icon.svg"
              height={20}
              width={20}
              alt=""
              className={`${
                selectedSection === section._key ? "-rotate-180" : ""
              } transition-all`}
            />
          </button>
          {selectedSection === section._key && (
            <div className="sections flex flex-col my-2">
              {section.sections.map((subSection: any) => (
                <div key={subSection._key}>
                  <button
                    className={`sub-section-title md:text-[14px] py-2.5 md:leading-[22px] px-6 font-satoshi text-[14px] leading-5 flex gap-4 ${
                      selectedSubSection === subSection?.slug?.current
                        ? "text-primary font-medium "
                        : " text-grey  "
                    }`}
                    onClick={() =>
                      handleSubSectionClick(subSection.slug.current)
                    }
                    title={subSection.slug.current}
                  >
                    <svg
                      className={`${
                        selectedSubSection === subSection?.slug?.current &&
                        "-rotate-180"
                      }`}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8685 14.9301C10.7617 14.9307 10.6559 14.9099 10.557 14.8689C10.4582 14.8278 10.3682 14.7674 10.2924 14.6909L5.42417 9.74348C5.27138 9.58821 5.18555 9.37761 5.18555 9.15803C5.18555 8.93844 5.27138 8.72785 5.42417 8.57258C5.57695 8.41731 5.78417 8.33008 6.00024 8.33008C6.21631 8.33008 6.42354 8.41731 6.57632 8.57258L10.8685 12.9428L15.1607 8.58083C15.3159 8.44574 15.5156 8.37515 15.7198 8.38316C15.924 8.39118 16.1177 8.47721 16.2622 8.62406C16.4067 8.77092 16.4913 8.96777 16.4992 9.1753C16.5071 9.38283 16.4377 9.58574 16.3047 9.74348L11.4365 14.6909C11.2853 14.8433 11.0814 14.9292 10.8685 14.9301Z"
                        fill={`${
                          selectedSubSection === subSection?.slug?.current
                            ? "#3FA9F5"
                            : "#140D31"
                        }`}
                      />
                    </svg>

                    {subSection?.title?.[locale]}
                  </button>
                  {selectedSubSection === subSection.slug.current && (
                    <div className="second-nested-section pl-16 flex flex-col gap-3">
                      {subSection.second_nested_section.map(
                        (nestedSection: any) => (
                          <div key={nestedSection._key} className="flex gap-2">
                            {nestedSlugSection ===
                            nestedSection?.slug?.current ? (
                              <img
                                src={"/demo/minus_icon_blue.svg"}
                                width={20}
                                height={20}
                                alt="Minus Icon"
                              />
                            ) : (
                              <img
                                src={"/demo/minus_icon.svg"}
                                width={20}
                                height={20}
                                alt="Minus Icon"
                              />
                            )}
                            <button
                              id={`${pathname}/${subSection.slug.current}${nestedSection.slug.current}`}
                              className={`text-grey font-satoshi md:text-[14px] text-[14px] leading-5 ${
                                nestedSlugSection ===
                                  nestedSection?.slug?.current &&
                                " text-primary"
                              }`}
                              onClick={() =>
                                handleNestedSection(
                                  nestedSection?.slug?.current
                                )
                              }
                            >
                              {nestedSection?.title?.[locale]}
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Sidebar
