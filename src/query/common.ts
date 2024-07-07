import { client } from "@/utils/sanity/client"
import { pageLayout } from "./home"

export async function getArticalBlogPage(slug: string) {
  const blogPageQuery = `*[_type == "article"  && slug.current == "/${slug}"][0] {
    ...,
  auther->{
    ...
  },
  sidebar []{
    title,
    articles[]-> {
      title,
      cover_image,
      slug
    },
    tours []-> {
      slug,
      hero_section,
      price_overrides,
      overview_card
    }
},
related_articles  {
     title,
    tagline,
       "blogs": articles[]-> {
         title,
         cover_image,
         time,
         slug,
         introduction,
        auther-> {
          name
        },     
       }
  },

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
        "data":  ${blogPageQuery}
    }`

  return await client.fetch(query)
}

export async function getArticalPageSeo(slug: string) {
  const seoQuery = `*[_type == "article"  && slug.current == "/${slug}"][0]{
    meta_data
  }`

  return await client.fetch(seoQuery)
}

// return slug of all the blogs
export async function getAllArticalBlogSlugs() {
  const query = `*[_type == "article"]{
    "slug": slug.current
  }`

  return await client.fetch(query)
}

// testimonials sect
export async function getTestimonials() {
  const query = `*[_type == "page"  && slug.current == "/"][0]{
    sections[_type == "testimonial_section" && defined(title)] {
          ...
    },
  }`

  return await client.fetch(query)
}

// get Artical on base of the tags slug
export async function getArticalByTag(tagSlug: string[]) {
  if (!tagSlug.length) {
    return []
  }

  const query = `*[_type == "article"  && 
  count(tags[@->slug.current in ${JSON.stringify(tagSlug)}]) > 0
 ]{
  tags []-> {
    slug
  },
  introduction,
  time,
  cover_image,
  title,
  slug,
  auther->{
    name
  }
}
`

  return await client.fetch(query)
}

export async function getnewLetterSection() {
  const query = `*[_type == "newsletter_section"][0]`
  return await client.fetch(query)
}
