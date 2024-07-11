"use client"

import React, { useEffect, useRef, useState } from "react"

type TabsProp = {
  tabs: Array<{ name: string; href: string }>
}

function AppTabs({ tabs }: TabsProp) {
  const [isFixed, setIsFixed] = useState(false)
  const [currentTab, setCurrentTab] = useState(0)

  const tabsRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = () => {
    const scrollPosition = window.scrollY
    setIsFixed(scrollPosition > window.innerHeight / 1)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  function cNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
  }

  const handleClickScroll = (name: string) => {
    const element = document.getElementById(name)

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 50,
        behavior: "smooth",
      })
      window.history.pushState({}, "", `#${name}`)
    }
  }

  return (
    <div className="max-w-full relative">
      <div
        style={{
          position: isFixed ? "fixed" : "relative",
          top: 0,
          left: 0,
          zIndex: 1000,
          marginTop: isFixed ? "0" : "10px",
          backgroundColor: "white", // Optional: set a background color
          transition: "top 0.3s, position 0.3s, margin-top 0.3s", // Add transitions
        }}
        className="w-full border-b border-[rgba(20,13,49,0.10)]"
        ref={tabsRef}
      >
        <div className="w-full overflow-x-scroll">
          <div className="px-5">
            <nav
              className="flex lg:gap-16 gap-1 lg:justify-center lg:items-center justify-start items-start"
              aria-label="Tabs"
            >
              {tabs.map((tab, index) => (
                <button
                  key={tab?.name}
                  onClick={() => {
                    setCurrentTab(index)
                    handleClickScroll(tab.href)
                  }}
                  className={cNames(
                    currentTab === index
                      ? "border-orange text-darkBlue"
                      : "border-transparent text-gray-500 hover:border-gray-200 text-gray hover:text-gray-700",
                    "whitespace-nowrap md:border-b-4 border-b-[3px] font-satoshi border-orange md:py-4 md:px-4 px-2 py-[13px] lg:text-base text-xs font-medium"
                  )}
                  aria-current={currentTab ? "page" : undefined}
                >
                  {tab?.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppTabs
