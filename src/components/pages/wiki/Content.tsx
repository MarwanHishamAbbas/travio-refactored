import React, { useEffect, useState } from "react"
import PortableText from "react-portable-text"
import { useSearchParams } from "next/navigation"
// import styled from "styled-components";

// const Wrapper = styled.div`
//   & h1 {
//     font-size: 24px;
//     line-height: 34px;
//     font-weight: bold;
//   }
// `;

const serializers = {
  normal: (props: any) => <p className=""> {props.children}</p>,

  h1: (props: any) => (
    <h1 className="text-[24px] leading-[34px] font-bold">
      {props.children}
      <div className="border-b-[3px] border-b-[#FFBB0B] w-[118px]" />
    </h1>
  ),
  h2: (props: any) => (
    <h2 className="text-base leading-6 font-bold mt-5"> {props.children}</h2>
  ),

  link: ({ href, children }: any) => (
    <a href={href} className="text-blue-500 hover:underline">
      {children}
    </a>
  ),
}

const Content = ({ sections, locale }: any) => {
  const router = useSearchParams()
  const slug = router?.get("slug")

  const [editorValue, setEditorValue] = useState(null)

  const findContent = (sections: any, slug: any) => {
    for (let section of sections) {
      for (let subSection of section.sections) {
        for (let nestedSection of subSection.second_nested_section) {
          if (nestedSection.slug.current === slug) {
            return nestedSection?.content?.[locale]
          }
        }
      }
    }
  }

  const content = findContent(sections, slug)

  useEffect(() => {
    if (content) {
      setEditorValue(content)
    }
  }, [content, slug])

  return (
    <div className="content font-satoshi text-darkBlue px-4">
      {/* <Wrapper> */}
      {editorValue ? (
        <PortableText content={editorValue} serializers={serializers} />
      ) : null}
      {/* </Wrapper> */}
    </div>
  )
}

export default Content
