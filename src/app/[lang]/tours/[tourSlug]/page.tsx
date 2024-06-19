import MaxWidth from "@/components/common/MaxWidth"

import { urlFor, urlForImage } from "@/lib/sanity/sanity-image"
import { getTourPage, getTourPageSeo } from "@/query/tour"
import Image from "next/image"
import { type FC } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Locale, getDictionary } from "@/language/getLanguage"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/TourDetails/HeroSection"
import MobileHeroSection from "@/components/TourDetails/MobileHeroSection"

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

  console.log(data.overview_card)
  const hero_section = data.hero_section
  const overview_card = data.overview_card
  return (
    <main>
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
    </main>
  )
}

export default TourDetailsPage
