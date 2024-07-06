import { client } from "@/utils/sanity/client"

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

const homePageQuery = `*[_type == "page"  && slug.current == "/"][0]{
  ...,
  sections[]{
    ...,
    _type == "featured_blogs_section" => {
      ...,
      featured_blogs[]->
    },
    _type == "deals_section" => {
      ...,
      deals[] {
        ...,
        tour-> {
          slug,
          hero_section,
          price_overrides,
          overview_card
        }
      }
    },
    _type == "destinations_section" => {
      ...,
      destinations[] {
        ...,
        'destination': {
          '_ref': destination._ref,
          'count': (*[_type == "tour_page" && document._ref == ^._id && !(_id in path("drafts.*"))]),
          ...destination->
        }
      }
    },
  }
}`

const query = `{
  "layout":  ${pageLayout},
  "pageData":  ${homePageQuery},
}`

// run on Srver
export async function getAllHomePage() {
  return await client.fetch(query)
}

// Home Page SEO

const seoQuery = `*[_type == "page"  && slug.current == "/"][0]{
  meta_data
}`

export async function getHomePageSeo() {
  return await client.fetch(seoQuery)
}
