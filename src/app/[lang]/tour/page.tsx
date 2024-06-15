import LangSwitch from "@/components/layout/LangSwitch"
import { type FC } from "react"

interface TourPageProps {
  params: {
    lang: string
  }
}

const TourPage: FC<TourPageProps> = async ({ params }) => {
  console.log(params.lang)
  return (
    <div>
      <LangSwitch locale="en" />
      <h1>Tour Page</h1>
    </div>
  )
}

export default TourPage
