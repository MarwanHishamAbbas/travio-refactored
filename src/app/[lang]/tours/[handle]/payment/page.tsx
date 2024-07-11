import MaxWidth from "@/components/common/MaxWidth"
import { FC } from "react"
import { Locale } from "@/language/getLanguage"
import { urlForImage } from "@/lib/sanity/sanity-image"
import { getPaymentPage, getTourPaymentPageSeo } from "@/query/payment"
import BookingStepper from "@/components/payment/BookingStepper"
import { BookingStoreProvider } from "@/store/BookingProvider"

export async function generateMetadata({ params }: PaymentPageProps) {
  const { handle, lang } = params

  const seo = await getTourPaymentPageSeo(handle)
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
    handle: string
    lang: Locale
  }
}

const PaymentPage: FC<PaymentPageProps> = async ({ params }) => {
  const data = await getPaymentPage(params.handle)

  return (
    <main className="my-8">
      <MaxWidth>
        <BookingStoreProvider>
          <BookingStepper tourData={data} locale={params.lang} />
        </BookingStoreProvider>
      </MaxWidth>
    </main>
  )
}

export default PaymentPage
