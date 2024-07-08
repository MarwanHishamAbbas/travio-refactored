import { ComponentClass, FunctionComponent } from "react"
import dynamic from "next/dynamic"

import {
  // SanityBlogPageSectionNames,
  SanityDestinationSectionNames,
  SanitySectionNames,
  // SanityTourPageSectionNames,
  // SanityTourSectionNames,
} from "@/types/sanity"

const HeroSection = dynamic(() => import("@/components/pages/home/Hero"))
const FeatureSection = dynamic(() => import("@/components/pages/home/Feature"))
const DealsSection = dynamic(() => import("@/components/pages/home/HotDeals"))
const GallerySection = dynamic(() => import("@/components/pages/home/Gallery"))
const DestinationsSection = dynamic(
  () => import("@/components/pages/home/Destinations")
)

const Testimonials = dynamic(
  () => import("@/components/pages/home/Testimonials")
)

const BlogSection = dynamic(() => import("@/components/common/Blogs"))
const NewsletterSection = dynamic(
  () => import("@/components/common/NewsLetter")
)

const FAQSection = dynamic(() => import("@/components/common/FAQ"))
const PopularAttractions = dynamic(
  () => import("@/components/pages/home/OtherTours")
)

const HeroSectionTours = dynamic(
  () => import("@/components/pages/destinations/Hero")
)
const FeatureTourSection = dynamic(
  () => import("@/components/pages/destinations/FeatureTours")
)

const FilterTourSection = dynamic(
  () => import("@/components/pages/destinations/FilterTours")
)
const ReviewRatingSections = dynamic(
  () => import("@/components/pages/destinations/ReviewRating")
)

const CountryFacts = dynamic(
  () => import("@/components/pages/destinations/CountryFacts")
)

// import GetEarlyNews from "./form/Form";
const TopThingsToDo = dynamic(
  () => import("@/components/pages/destinations/ThingsToDo")
)

const ContactSection = dynamic(
  () => import("../pages/destinations/ContactSection")
)

// const BlogHeroSection = dynamic(() => import("./BlogHeroSection"))
// const InterestSection = dynamic(() => import("./InterestSection"))
// const FeatureTopBlogSection = dynamic(() => import("./FeatureTopBlogSection"))

// const AllBlogsSection = dynamic(
//   () => import("@/components/pages/AllBlogs-Page/FeatureBlogs"),
//   {
//     loading: () => <p>Loading...</p>,
//   }
// )

// // const FlexibleThings = dynamic(
// //   () => import("@/components/sections/FlexibleThings/FlexibleThings")
// // );

// // const GetEarlyNews = dynamic(() => import("@/components/sections/form/Form"));

// const GallerySection = dynamic(
//   () => import("@/components/molecules/TourGallery")
// )

// // const FlexibleThings = dynamic(() => import("./FlexibleThings/FlexibleThings"));

// const Testimonials = dynamic(
//   () => import("@/components/sections/HappyTravelers")
// )

// const DestinationsSection = dynamic(
//   () => import("@/components/pages/HomePage/Destination")
// )

// const TravelInformation = dynamic(
//   () => import("@/components/pages/DynamicTourPage/TraveInformation")
// )

// const ItinerarySection = dynamic(
//   () => import("@/components/pages/DynamicTourPage/ItinarySection")
// )

// const SummarySection = dynamic(
//   () => import("@/components/pages/DynamicTourPage/SummarySection")
// )

// // const ExcludedInTour = dynamic(() => import("./ExcludedInTour"));

// const MemorableExperiencesSection = dynamic(
//   () => import("@/components/pages/DynamicTourPage/MemoriableExperince")
// )

// const FlexibleThingsForTour = dynamic(
//   () => import("@/components/sections/FlexibleThings/ForTourSection")
// )

// const PriceList = dynamic(
//   () => import("@/components/pages/DynamicTourPage/PriceList")
// )

// const WhatsIncludedSection = dynamic(
//   () => import("@/components/pages/DynamicTourPage/InccludedInTour")
// )

// const AccommdationTypesSection = dynamic(
//   () => import("@/components/pages/DynamicTourPage/Accomdations")
// )

// const TourGallerySection = dynamic(
//   () => import("../molecules/TourGallery/TourGallerySection")
// )

// const ImageHeaderSection = dynamic(
//   () => import("@/components/sections/hero/HeroSection")
// )

// const OfficeLocations = dynamic(
//   () => import("../pages/About-Us/OfficeLocation")
// )

// export const BlogPageSectionsMap: {
//   [name in SanityBlogPageSectionNames]?:
//     | FunctionComponent<any>
//     | ComponentClass<any, any>
// } = {
//   image_header_section: BlogHeroSection,
//   show_new_letter_section: NewsletterSection,
//   interests_section: InterestSection,
//   featured_place_blogs_section: FeatureTopBlogSection,
//   featured_blogs_section: BlogSection,
//   all_blogs_section: AllBlogsSection,
// }

export const SectionMap: {
  [name in SanitySectionNames]?:
    | FunctionComponent<any>
    | ComponentClass<any, any>
} = {
  hero_section: HeroSection,
  feature_section: FeatureSection,
  deals_section: DealsSection,
  gallery_section: GallerySection,
  destinations_section: DestinationsSection,
  testimonial_section: Testimonials,
  featured_blogs_section: BlogSection,
  show_new_letter_section: NewsletterSection,
  faq_section: FAQSection,
  index_section: PopularAttractions,

  //   content_section: SummarySection,
  //   office_locations_section: OfficeLocations,
  //   image_header_section: ImageHeaderSection,
}

export const DestinationSectionsMap: {
  [name in SanityDestinationSectionNames]?:
    | FunctionComponent<any>
    | ComponentClass<any, any>
} = {
  image_header_section: HeroSectionTours,
  reviews_section: ReviewRatingSections,
  faq_section: FAQSection,
  all_blogs_section: BlogSection,
  featured_blogs_section: BlogSection,
  featured_tours_section: FeatureTourSection,
  tour_selection_section: FilterTourSection,
  at_glance_section: CountryFacts,
  top_things_section: TopThingsToDo,
  contact_agent_section: ContactSection,
}

// export const TourSectionsMap: {
//   [name in SanityTourSectionNames]?:
//     | FunctionComponent<any>
//     | ComponentClass<any, any>
// } = {
//   itinerary_section: ItinerarySection,
//   content_section: SummarySection,
//   memorable_experiences_section: MemorableExperiencesSection,
//   gallery_section: TourGallerySection,
//   whats_included_section: WhatsIncludedSection,
//   pricing_section: PriceList,
//   accommodation_types_section: AccommdationTypesSection,
//   feature_section: FlexibleThingsForTour,
//   featured_tours_section: FeatureTourSection,
//   travel_info_section: TravelInformation,
//   reviews_section: ReviewRatingSections,
//   faq_section: FAQSection,
// }
