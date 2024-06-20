import MaxWidth from "@/components/common/MaxWidth"
import { FC } from "react"
import { Locale } from "@/language/getLanguage"
import { urlForImage } from "@/lib/sanity/sanity-image"
import {
  getPaymentPage,
  getPromoCodes,
  getTourPaymentPageSeo,
} from "@/query/payment"
import BookingStepper from "@/components/payment/BookingStepper"

export async function generateMetadata({ params }: PaymentPageProps) {
  const { tourSlug, lang } = params

  const seo = await getTourPaymentPageSeo(tourSlug)
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
      type: "website",
      locale: lang,
    },
  }
}
interface PaymentPageProps {
  params: {
    tourSlug: string
    lang: Locale
  }
}

const PaymentPage: FC<PaymentPageProps> = async ({ params }) => {
  const data = await getPaymentPage(params.tourSlug)
  const promocodes = await getPromoCodes()
  console.log(data.payment)
  return (
    <main className="mt-4">
      <MaxWidth>
        <BookingStepper />
      </MaxWidth>
    </main>
  )
}

export default PaymentPage
