"use client"
import Layout from "@/components/layout/Layout"

import AboutComapny from "./AboutCompany"
import OfficeLocations from "./OfficeLocation"
import AboutUs from "./AboutUs"
// import ReviewSection from "@/components/sections/reviews/Reviews";

// import TravlerReviews from "@/components/sections/HappyTravelers";

const AboutUsPage = ({ language, pageData }: any) => {
  const { layout } = pageData || {}

  const { pageData: SECTIONS_DATA } = pageData || {}

  const { sections: SECTIONS } = SECTIONS_DATA || {}

  const {
    [0]: ABOUT_US,
    [1]: ABOUT_COMPANY,
    // [2]: ,
    [3]: LOCATIONS,
  } = SECTIONS || {}

  return (
    <Layout
      breadcrumbs={[
        {
          value: `/${language}/about-us`,
          label: "About Us",
        },
      ]}
      locale={`${language}`}
      promo_banner={layout.banner}
      globals={layout}
    >
      <AboutUs data={ABOUT_US} locale={language} />

      <AboutComapny
        data={ABOUT_COMPANY}
        // offerData={ABOUT_COMPANY.offerData}
        locale={language}
      />

      {/* <div>
        <TravlerReviews />
      </div> */}

      {/* <div className="md:px-20 px-5"> */}
      <OfficeLocations
        title={LOCATIONS?.title[language]}
        data={LOCATIONS.locations}
        locale={language}
      />
      {/* </div> */}

      {/* <ReviewSection data={aboutReviewData} locale={language} /> */}
    </Layout>
  )
}

export default AboutUsPage
