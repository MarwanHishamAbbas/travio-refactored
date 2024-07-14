import { client } from "@/utils/sanity/client"
import { pageLayout } from "./home"

const blogPageQuery = `*[_type == "blog_page" && slug.current == "/"][0]{
  ...,
  sections[] {
    ...,
    _type == "featured_blogs_section" => {
      ...,
      featured_blogs[]->{
        ...,
        auther->{
          name
        },
        tags[]->,
        destination-> {
          name,
        }
      }
    },
    _type == "featured_place_blogs_section" => {
      ...,
      cards[] {
        ...,
        name,
        link->{
          slug,
          sections[_type == "image_header_section" && defined(header)] {
        ...
      }
        }
      }
    },
    _type == "interests_section" => {
      ...,
      interests[]{
        name,
        icon,
        link->{
          slug
        }
      }
    },
    _type == "blogs_section" => {
      ...,
      blogs[]->{
        ...,
        tags[]->
      }
    }
  }
  }`

const allBlogsQuery = `*[_type=="article"]{
  destination->{
    name
  },
  introduction,
  time,
  cover_image,
  title,
  slug,
  auther->{
    name
  }
  }`

const query = `{
    "layout":  ${pageLayout},
    "data":  ${blogPageQuery},
    'allBlogs' : ${allBlogsQuery}
}`

export async function getBlogPage() {
  return await client.fetch(query)
}

const seoQuery = `*[_type == "blog_page"  && slug.current == "/"][0]{
  meta_data
}`

export async function getBlogPageSeo() {
  return await client.fetch(seoQuery)
}

export async function getMainDynamicBlogPage(slug: string) {
  const blogPageQuery = `*[_type == "blog_page" && slug.current == "/${slug}"][0]{
      breadcrumb,
      is_country_blogs,
      sections[] {
        ...,
        _type == "latest_posts_section" => {
          ...,
          filter_tags[]-> {
              ...
            }
         },
        _type == "featured_blogs_section" => {
          ...,
        },
        _type == "featured_place_blogs_section" => {
          ...,
          cards[]->
        },
        _type == "interests_section" => {
          ...,
          interests[]->{
            name,
            icon,
            slug
          }
        },
        _type == "blogs_section" => {
          ...,
          blogs[]->{
            ...,
            tags[]->
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

export async function getDynamicBlogPageSeo(slug: string) {
  const seoQuery = `*[_type == "blog_page"  && slug.current == "/${slug}"][0]{
  meta_data
}`

  return await client.fetch(seoQuery)
}

// return slug of all the blogs except /
export async function getAllDynamicBlogSlugs() {
  const query = `*[_type == "blog_page" && slug.current != "/"]{
  "slug": slug.current
}`

  return await client.fetch(query)
}
