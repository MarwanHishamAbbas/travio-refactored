import { type FC } from "react"

interface TourPageProps {
  params: {
    lang: string
  }
}

const TourPage: FC<TourPageProps> = async ({ params }) => {
  return (
    <div>
      <h1>Tour Page</h1>
    </div>
  )
}

export default TourPage
