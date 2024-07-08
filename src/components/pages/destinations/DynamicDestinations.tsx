"use client"
import Layout from "@/components/layout/Layout"
import Slicer from "@/components/sanity/Slicer"

import { DestinationSectionsMap } from "@/components/sections"

const DynamicDestionations = ({ language, pageData, tags }: any) => {
  const { layout, data } = pageData

  return (
    <Layout
      locale={`${language}`}
      promo_banner={layout?.banner}
      globals={layout}
      maxWidth={false}
      breadcrumbs={[
        {
          label: "Destinations",
          value: `${language}`,
        },
        {
          label: `${data.name?.[language]}`,
          value: `${data.slug?.current || "/"}`,
        },
      ]}
    >
      <Slicer
        locale={language}
        sections={data.sections}
        components={DestinationSectionsMap}
        tags={tags}
      />
    </Layout>
  )
}

export default DynamicDestionations
