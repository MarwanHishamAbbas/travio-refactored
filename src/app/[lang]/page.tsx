import { Locale, getDictionary } from "@/language/getLanguage"
import { urlFor } from "@/lib/sanity/sanity-image"
import { getHomePage } from "@/query/layout"
import { api } from "@/trpc/server"

import Image from "next/image"

import { type FC } from "react"

interface HomePageProps {
  params: {
    lang: Locale
  }
}

const HomePage: FC<HomePageProps> = async ({ params }) => {
  const content = await getDictionary(params.lang)
  const data = await getHomePage()
  const list = await api.booking.getList()
  console.log(list)

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
