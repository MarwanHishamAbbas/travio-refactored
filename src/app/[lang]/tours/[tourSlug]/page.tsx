import { urlForImage } from "@/lib/sanity/sanity-image"
import { getTourPage, getTourPageSeo } from "@/query/tour"

import React, { type FC } from "react"

import { Locale } from "@/language/getLanguage"

import HeroSection from "@/components/TourDetails/HeroSection"
import MobileHeroSection from "@/components/TourDetails/MobileHeroSection"
import { generatePriceList } from "@/lib/dates"
import Pricing from "@/components/TourDetails/Pricing/Pricing"

interface TourDetailsPageProps {
  params: {
    lang: Locale
    tourSlug: string
  }
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale; tourSlug: string }
}) {
  const { tourSlug, lang } = params

  const seo = await getTourPageSeo(tourSlug)
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

const TourDetailsPage: FC<TourDetailsPageProps> = async ({ params }) => {
  const data = await getTourPage(params.tourSlug)
  let prices = generatePriceList(data.sections[7])

  return (
    <main className="md:mt-4 md:space-y-14">
      {/* DeskTop Hero Section */}
      <HeroSection
        overview_card={data.overview_card}
        hero_section={data.hero_section}
        locale={params.lang}
      />

      {/* Mobile Hero Section */}
      <MobileHeroSection
        hero_section={data.hero_section}
        locale={params.lang}
        overview_card={data.overview_card}
      />
      <Pricing
        tourSlug={params.tourSlug}
        locale={params.lang}
        prices={prices}
      />
    </main>
  )
}

export default TourDetailsPage
