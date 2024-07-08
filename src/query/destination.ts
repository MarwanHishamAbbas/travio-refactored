import { client } from "@/utils/sanity/client"
import { pageLayout } from "./home"

export async function getDestinationPage(slug: string) {
  const destinationPageQuery = `*[_type == "destination_page" && slug.current == "/${slug}"][0]{
      ...,
      sections[] {
        ...,
        _type == "top_things_section" => {
          ...,
          destination->,
          top_things[]->,
        },
        _type == "tour_selection_section" => {
          ...,
          tags[]->,
          destination_tags[]->,
          price_tags[]->,
          duration_tags[]->
        },
        _type == "featured_blogs_section" => {
          ...,
          featured_blogs[]->
        },
        _type == "featured_tours_section" => {
          ...,
          tour_cards[] {
            ...,
            content->
          }
        },
      }
    }`

  const query = `{
      "layout":  ${pageLayout},
      "data": ${destinationPageQuery}
    }`

  return await client.fetch(query)
}

// for Page SEO
export async function getDestinationPageSeo(slug: string) {
  const query = `*[_type == "destination_page" && slug.current == "/${slug}"][0]{
      meta_data
    }`

  return await client.fetch(query)
}

// return slug of all the destinations
export async function getAllDestinationSlugs() {
  const query = `*[_type == "destination_page"]{
      "slug": slug.current
    }`

  return await client.fetch(query)
}
