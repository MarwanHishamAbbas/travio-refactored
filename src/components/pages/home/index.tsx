"use client"

import Layout from "@/components/layout/Layout"
import Slicer from "@/components/sanity/Slicer"
import { SectionMap } from "@/components/sections"

const HomePage = ({ pageData, locale }: { pageData: any; locale: string }) => {
  const { layout } = pageData || {}

  return (
    <Layout
      breadcrumbs={[]}
      locale={locale}
      globals={layout}
      promo_banner={layout?.banner}
      maxWidth={false}
    >
      <Slicer
        locale={locale}
        // @ts-expect-error
        components={SectionMap}
        sections={pageData?.pageData?.sections}
      />
    </Layout>
  )
}

export default HomePage
