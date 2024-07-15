"use client"
import Layout from "@/components/layout/Layout"

import FeatureTourSection from "../blog-page/FeatureTours"
import NewsletterSection from "@/components/common/NewsLetter"
import MaxWidth from "@/components/common/MaxWidth"
import SectionHeader from "@/components/common/SectionHeader"
import Content from "./Content"
import HeroSection from "../destinations/Hero"
import FilterCountry from "./FilterCountry"
import Sidebar from "./Sidebar"

const DynamicTravelWiki = ({
  language,
  pageData,
  newLetterSection,
}: {
  language: string
  pageData: any
  newLetterSection: any
}) => {
  const { layout, data, wikiList } = pageData || {}
  const { sections, suggested_tour } = data || {}

  return (
    <Layout
      maxWidth={false}
      locale={language}
      globals={layout}
      promo_banner={layout?.banner}
      breadcrumbs={[
        {
          label: "wiki",
          value: "/",
        },
        {
          label: `${data?.tab_title?.[language]}`,
          value: `/wiki${data?.slug?.current}`,
        },
      ]}
    >
      <MaxWidth className="px-0">
        <HeroSection
          data={data?.image_hero?.header_section}
          locale={language}
        />
      </MaxWidth>

      <div className="max-lg:mt-[50px]">
        <SectionHeader
          title={data?.tagline?.[language]}
          subtitle={data?.title?.[language]}
          centerLine
        />
      </div>

      {/* <WikiSection wikiData={wikiData} filterWiki={filterWikiData} /> */}
      <div className="md:mt-12 mt-[50px]">
        <FilterCountry tabs={wikiList} locale={language} pageType="wiki" />
      </div>
      <MaxWidth className="flex xl:flex-row flex-col justify-between gap-10 px-0 md:mt-[68px] mt-[50px]">
        <Sidebar sections={sections} locale={language} />
        <Content sections={sections} locale={language} />
      </MaxWidth>
      <FeatureTourSection data={suggested_tour} locale={language} />

      <div className="mt-20 md:mb-[68px] mb-[52px]">
        <NewsletterSection data={newLetterSection} locale={language} />
      </div>
    </Layout>
  )
}

export default DynamicTravelWiki
