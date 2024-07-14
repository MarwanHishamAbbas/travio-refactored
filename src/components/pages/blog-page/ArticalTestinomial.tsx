import { getTestimonials } from "@/query/common"
import useSWR from "swr"

import Testimonials from "../home/Testimonials"

const ArticalTestinomial = ({ locale }: { locale: string }) => {
  const { isLoading } = useSWR("getTestimonials", getTestimonials)

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      {/* {JSON.stringify(data.sections)} */}
      <div className="md:mb-[140px] mb-[50px]">
        <Testimonials locale={locale} />
      </div>
    </>
  )
}

export default ArticalTestinomial
