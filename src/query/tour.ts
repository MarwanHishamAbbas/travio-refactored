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
export async function getTourByTags(
  tags: string[],
  locale: string,
  duration: string,
  priceTag: string,
  destinationTags: string[]
) {
  if (!tags.length) {
    return []
  }

  const searchTags = `count(tags[@->slug.current in ${JSON.stringify(tags.concat(destinationTags))}])`

  if (!duration) {
    console.log("no duration")
  }
  if (!priceTag) {
    console.log("no Price Tag")
  }

  const searchDuration = duration.trim() === "7-14 Days" ? "12 Days" : duration

  const durationQuery = searchDuration
    ? `&& overview_card.duration.[${JSON.stringify(locale)}] == ${JSON.stringify(searchDuration)}`
    : ""

  const priceQuery = (priceTag: string) => {
    priceTag = priceTag.trim()
    switch (priceTag) {
      case "1000$-1500$":
        console.log("Hit this case")
        return `&& coalesce(overview_card.price.discounted_price[${JSON.stringify(locale)}] * 1, 0) <= 1500 && coalesce(overview_card.price.discounted_price[${JSON.stringify(locale)}] * 1, 0) >= 1000`

      case "Under $1,000":
        console.log(
          `&& overview_card.price.discounted_price[${JSON.stringify(locale)}] < '1000'`
        )
        return `&& coalesce(overview_card.price.discounted_price[${JSON.stringify(locale)}] * 1, 0) < 1000`

      case "Over 2000$":
        return `&& coalesce(overview_card.price.discounted_price[${JSON.stringify(locale)}] * 1, 0) > 2000`
      default:
        return ""
    }
  }
  const query = `*[_type == "tour_page"  && 
    ${searchTags} > 0 ${durationQuery} ${priceQuery(priceTag)}
   ]{
    slug,
    overview_card,
    hero_section,
    price_overrides,
  }
  `

  return await client.fetch(query)
}
