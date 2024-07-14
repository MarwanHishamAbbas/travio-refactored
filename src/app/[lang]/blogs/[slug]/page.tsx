import { urlForImage } from "@/lib/sanity/sanity-image"
import { getDynamicBlogPageSeo, getMainDynamicBlogPage } from "@/query/blog"
import dynamic from "next/dynamic"
const BlogPage = dynamic(() => import("@/components/pages/blog-page"))

const extractTags = (pageData: any) => {
  const sections = pageData?.data?.sections || []
  const latestPosts = sections.find(
    (section: any) => section?._type === "latest_posts_section"
  )
  const tags = latestPosts?.filter_tags || []
  return tags.map((tag: any) => tag?.slug?.current)
}

export async function generateMetadata({ params }: any) {
  const { lang, slug } = params

  const seo = await getDynamicBlogPageSeo(slug)
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

const Index = async ({ params }: { params: any }) => {
  const { lang, slug } = params

  const pageData = await getMainDynamicBlogPage(slug)

  const tagsData = extractTags(pageData)

  return <BlogPage locale={lang} pageData={pageData} tags={tagsData} />
}

export default Index
