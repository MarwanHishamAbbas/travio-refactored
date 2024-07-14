import dynamic from "next/dynamic"

import { urlForImage } from "@/lib/sanity/sanity-image"
import { getBlogPage, getBlogPageSeo } from "@/query/blog"
const MainBlogPage = dynamic(() => import("@/components/pages/blog"))

export async function generateMetadata({ params }: any) {
  const { lang } = params

  const seo = await getBlogPageSeo()
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

export default async function Index({ params }: any) {
  const { lang } = params
  const blogPage = await getBlogPage()

  return (
    <>
      <MainBlogPage language={lang} pageData={blogPage} />
    </>
  )
}
