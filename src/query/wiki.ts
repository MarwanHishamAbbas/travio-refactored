import { client } from "@/utils/sanity/client"
import { pageLayout } from "./home"

const wikiList = `*[_type == "travel_wiki"]{
  "name": tab_title,
  "href": slug.current
}`

export async function getWikiPage(slug: string) {
  const wikiPageQuery = `*[_type == "travel_wiki"  && slug.current == "/${slug}"][0]{
        ...,
        suggested_tour {
    ...,
    tour_cards[] {
      badge_content,
      "content": content->{
        slug,
        hero_section,
        overview_card,
        price_overrides,
        timeline
      }
    }
  }
  }`

  const query = `{
        "layout":  ${pageLayout},
        "data": ${wikiPageQuery},
        "wikiList": ${wikiList}
    }`

  return await client.fetch(query)
}

// for Page SEO
export async function getWikiPageSeo(slug: string) {
  const query = `*[_type == "travel_wiki" && slug.current == "/${slug}"][0]{
      meta_data
    }`

  return await client.fetch(query)
}

// return slug of all the wikis
export async function getAllWikiSlugs() {
  const query = `*[_type == "travel_wiki"]{
    "slug": slug.current
  }`

  return await client.fetch(query)
}
