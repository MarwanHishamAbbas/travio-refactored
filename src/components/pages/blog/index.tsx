"use client"

import Layout from "@/components/layout/Layout"
import Slicer from "@/components/sanity/Slicer"

import { BlogPageSectionsMap } from "@/components/sections"

const MainBlogPage = ({ language, pageData }: any) => {
  const { layout, data, allBlogs } = pageData || {}

  return (
    <Layout
      breadcrumbs={[{ label: "Blog", value: "BLog" }]}
      locale={language}
      globals={layout}
      promo_banner={layout?.banner}
    >
      {/* MainBlog Page */}
      <Slicer
        locale={language}
        components={BlogPageSectionsMap}
        sections={
          data?.sections?.map((sec: any) =>
            sec?._type === "all_blogs_section"
              ? { ...sec, blogs: allBlogs }
              : sec
          ) as any
        }
      />
    </Layout>
  )
}

export default MainBlogPage
