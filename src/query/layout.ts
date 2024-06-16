import { client } from "@/utils/sanity/client"

client

export const pageLayout = `*[_type == "globals"][0]{
    ...,
    navbar {
  ...,
      links[] {
        ...,
        _type == "tour_dropdown" => {
          ...,
          destinations[] {
            ...,
            destination-> {
            name,
              slug
            },
            tours[]-> {
              slug,
              overview_card,
              hero_section,
            },
            text_tours[]-> {
              "slug" : slug.current ,
              "title" : hero_section.title
            }
          }
        }
      }
  }
  }`

export async function getBaseLayout() {
  return await client.fetch(pageLayout)
}
