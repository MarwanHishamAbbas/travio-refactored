import { Locale, getDictionary } from "@/language/getLanguage"
import { type FC } from "react"

interface HomePageProps {
  params: {
    lang: Locale
  }
}

const HomePage: FC<HomePageProps> = async ({ params }) => {
  return <div>HomePage</div>
}

export default HomePage
