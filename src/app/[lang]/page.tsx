import { Locale } from "@/language/getLanguage"
import { urlFor } from "@/lib/sanity/sanity-image"
import { getHomePage } from "@/query/layout"

import Image from "next/image"

import { type FC } from "react"

interface HomePageProps {
  params: {
    lang: Locale
  }
}

const HomePage: FC<HomePageProps> = async ({ params }) => {
  const data = await getHomePage()

  return (
    <div>
      <Image
        src={urlFor(data.sections[0].image.asset._ref)}
        alt={data.sections[0].image.alt?.[params.lang]}
        width={1000}
        height={1000}
        className="w-full"
      />
    </div>
  )
}

export default HomePage
