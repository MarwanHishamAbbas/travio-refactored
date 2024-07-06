import { getAllHomePage, getHomePageSeo } from "@/query/home"
import { urlForImage } from "@/lib/sanity/sanity-image"
import HomePage from "@/components/pages/home"

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string
  }
}) {
  const { lang } = params

  const seo = await getHomePageSeo()
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
// revalidate: 1 hour
export const revalidate = 3600

export default async function Home({
  params,
}: {
  params: {
    lang: string
  }
}) {
  const homePage = await getAllHomePage()

  const { lang } = params

  return <HomePage pageData={homePage} locale={lang} />
}
