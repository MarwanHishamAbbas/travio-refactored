import { urlForImage } from "@/lib/sanity/sanity-image"
import { getTourPage, getTourPageSeo } from "@/query/tour"

import React, { type FC } from "react"

import { Locale } from "@/language/getLanguage"

import HeroSection from "@/components/TourDetails/HeroSection"
import { TourSectionsMap } from "@/components/sections"

import MobileHeroSection from "@/components/TourDetails/MobileHeroSection"

import Layout from "@/components/layout/Layout"
import { topbarTn } from "@/lib/utils"
import AppTabs from "@/components/pages/tour/AppTabs"
import OverViewCard from "@/components/pages/tour/OverViewCard"

interface TourDetailsPageProps {
  params: {
    lang: Locale
    handle: string
  }
}

export async function generateMetadata({ params }: any) {
  const { handle, lang } = params

  const seo = await getTourPageSeo(handle)
  const meta = seo?.meta_data || {}
  const metaTitle = meta?.meta_title[lang]
  const metaDescription = meta?.meta_description[lang]
  const metaImage = meta?.meta_image
  const keywords = meta?.meta_keywords[lang]
  const imgUrl = urlForImage(metaImage?.asset?._ref)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords,
    image: imgUrl,
    language: lang,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
        {
          url: imgUrl, // Provide a larger image URL here
          width: 1600, // Adjust the width according to your preference
          height: 900, // Adjust the height according to your preference
          alt: metaTitle,
        },
      ],
      type: "website",
      locale: lang,
    },
  }
}

export const revalidate = 3600

// move it it global space
function transformArray(inputArray: any, lang: string) {
  if (!inputArray || inputArray.length === 0) return []
  return inputArray.map((item: any) => {
    return {
      label: item.title[lang] || item.title.en,
      value: item.url,
    }
  })
}

const TourDetailsPage: FC<TourDetailsPageProps> = async ({ params }) => {
  const { data, layout } = await getTourPage(params.handle)

  const breadcrumbs = transformArray(data?.breadcrumb?.breadcrumb, params.lang)

  const tabsData = [
    { name: topbarTn?.[params.lang]?.Overview, href: "overview" },

    { name: topbarTn?.[params.lang]?.TripHighlights, href: "price-list" },

    { name: topbarTn?.[params.lang]?.Itinerary, href: "itinerary" },

    { name: topbarTn?.[params.lang]?.Inclusions, href: "inclusions" },
    {
      name: topbarTn?.[params.lang]?.EssentialsTravelInformation,
      href: "travel-info",
    },

    { name: topbarTn?.[params.lang]?.Reviews, href: "reviews" },
  ]

  return (
    <Layout
      globals={layout}
      locale={params.lang}
      maxWidth={false}
      breadcrumbs={breadcrumbs}
    >
      <HeroSection
        overview_card={data.overview_card}
        hero_section={data?.hero_section}
        locale={params.lang}
      />
      <MobileHeroSection
        hero_section={data.hero_section}
        locale={params.lang}
        overview_card={data.overview_card}
      />
      <OverViewCard data={data.overview_card} locale={params.lang} />

      <AppTabs tabs={tabsData} />

      <div>
        {data?.sections?.map((section: any) => {
          const Component = TourSectionsMap[section?._type]
          return (
            <React.Fragment key={section._key}>
              {Component &&
                React.createElement(Component, {
                  data: section,
                  slug: data.slug,
                  locale: params.lang,
                })}
            </React.Fragment>
          )
        })}
      </div>
    </Layout>
  )
}

export default TourDetailsPage
