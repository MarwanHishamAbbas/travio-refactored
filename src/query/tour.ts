import { client } from "@/utils/sanity/client"
import { pageLayout } from "./home"

export async function getTourPage(slug: string) {
  const tourPageQuery = `*[_type == "tour_page"  && slug.current == "/${slug}"][0]{
        ...,
        destination->,
        sections[] {
          ...,
          _type == "featured_tours_section" => {
            ...,
            tour_cards[] {
              ...,
              content->
            }
          },
          _type == "tour_selection_section" => {
            ...,
            tags[]->
          },
            _type == "itinerary_section" => {
          ...,
          itinerary_day_cards[] {
            ...,
            activity_cards[]->{
              ...,
            }
          }
        },
          _type == "pricing_section" => {
            ...,
            "weekly_schedule": ^.timeline.timeline,
            "days": ^.timeline.days,
            "fixed_days": ^.timeline.fixed_days,
            "disabled": ^.timeline.disabled,
            "price_overrides": ^.price_overrides,
            "price": ^.overview_card.price,
          },
          _type == "memorable_experiences_section" => {
            ...,
            experience_cards[]->{
              ...,
              wiki->{
                slug
              }
            }
          },
          _type == "other_tours_section" => {
            ...,
            tour_cards[] {
              ...,
              content->
            }
          }
        },
    }`

  const query = `{
      "layout":  ${pageLayout},
      "data": ${tourPageQuery}
    }`

  return await client.fetch(query)
}
// for Page SEO
export async function getTourPageSeo(slug: string) {
  const query = `*[_type == "tour_page" && slug.current == "/${slug}"][0]{
      meta_data
    }`

  return await client.fetch(query)
}

// return slug of all the tours
export async function getAllhandles() {
  const query = `*[_type == "tour_page"]{
      slug
    }`

  return await client.fetch(query)
}

// get toures on base of the tags slug
export async function getTourByTags(tags: string[]) {
  if (!tags.length) {
    return []
  }

  const query = `*[_type == "tour_page"  && 
    count(tags[@->slug.current in ${JSON.stringify(tags)}]) > 0
   ]{
    slug,
    overview_card,
    hero_section,
    price_overrides
  }
  `

  return await client.fetch(query)
}
