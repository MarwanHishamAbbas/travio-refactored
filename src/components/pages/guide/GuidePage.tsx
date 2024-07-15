"use client"
import Layout from "@/components/layout/Layout"
import { FC } from "react"

// import AppTabs from "@/components/molecules/AppTabs/AppTabse";

import MaxWidth from "@/components/common/MaxWidth"
import FilterCountry from "../wiki/FilterCountry"
import HeroSection from "../destinations/Hero"
import SectionHeader from "@/components/common/SectionHeader"
import InfoSection from "./InfoSection"

interface GuidePageProps {
  language: string
  pageData: any
}

const GuidePage: FC<GuidePageProps> = ({ language, pageData }) => {
  const { layout, data, guideList } = pageData || {}

  const slug = data?.slug?.current

  return (
    <Layout
      globals={layout}
      locale={language}
      breadcrumbs={[
        {
          label: "Guide",
          value: `/`,
        },
        {
          label: `${data?.tab_title?.[language]}`,
          value: `/guide${slug}`,
        },
      ]}
      promo_banner={layout?.banner}
      maxWidth={false}
    >
      <MaxWidth className="px-0">
        <HeroSection data={data.image_hero.header_section} locale={language} />
      </MaxWidth>
      <div className="max-md:mt-[40px]">
        <SectionHeader
          content={data.image_hero.header_section.content?.[language]}
          title={data?.tagline?.[language]}
          subtitle={data?.title?.[language]}
          centerLine
        />
        <div className="md:mt-[68px] mt-[50px]">
          <FilterCountry tabs={guideList} locale={language} pageType="guide" />
        </div>

        <MaxWidth className=" px-0">
          <InfoSection data={data?.sections} locale={language} />
        </MaxWidth>
      </div>
    </Layout>
  )
}

export default GuidePage
