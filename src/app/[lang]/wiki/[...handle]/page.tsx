import DynamicTravelWiki from "@/components/pages/wiki/DynamicTravelWiki"
import { urlForImage } from "@/lib/sanity/sanity-image"
import { getnewLetterSection } from "@/query/common"
import { getWikiPage, getWikiPageSeo } from "@/query/wiki"

export async function generateMetadata({ params }: any) {
  const { lang, handle } = params

  const seo = await getWikiPageSeo(handle)
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
      ],
      type: "website",
      locale: lang,
    },
  }
}

export const revalidate = 3600

const Index = async ({ params }: any) => {
  const { handle, lang } = params
  const firstSlug = handle[0]

  const pageData = await getWikiPage(firstSlug)
  const newLetterSection = await getnewLetterSection()

  return (
    <DynamicTravelWiki
      language={lang}
      pageData={pageData}
      newLetterSection={newLetterSection}
    />
  )
}

export default Index
