"use client"

import React, { useState, useEffect } from "react"

interface Section {
  _type: string
  _key: string
  [x: string]: any
}

interface Props {
  sections: Section[]
  components: { [name: string]: React.ComponentType<any> }
  locale: string
  tags?: any
}

const Slicer: React.FC<Props> = ({ sections, components, locale, tags }) => {
  const [visibleSections, setVisibleSections] = useState(3)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY
      if (currentPosition > scrollPosition) {
        setVisibleSections(sections.length)
      }
      setScrollPosition(currentPosition)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sections, scrollPosition])

  return (
    <div>
      {sections.slice(0, visibleSections).map((section) => (
        <React.Fragment key={section._key}>
          {components[section._type] &&
            React.createElement(components[section._type], {
              data: section,
              locale,
              key: section._key,
              tags: section._type === "tour_selection_section" ? tags : null,
            })}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Slicer
