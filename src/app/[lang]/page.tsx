import LangSwitch from "@/components/layout/LangSwitch"
import { Locale, getDictionary } from "@/language/getLanguage"

import { type FC } from "react"

interface HomePageProps {
  params: {
    lang: Locale
  }
}

const HomePage: FC<HomePageProps> = async ({ params }) => {
  const content = await getDictionary(params.lang)
  return (
    <div>
      <h1>{content.tailTourTn}</h1>
    </div>
  )
}

export default HomePage
