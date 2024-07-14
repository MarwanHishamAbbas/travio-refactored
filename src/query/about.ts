import { client } from "@/utils/sanity/client"
import { pageLayout } from "./home"

const aboutPageQuery = ` *[_type == "page"  && slug.current == "/about-us"][0]`

const query = `{
    "layout":  ${pageLayout},
    "pageData":  ${aboutPageQuery}
}`

// page seto
const aboutSeoQuery = ` *[_type == "page"  && slug.current == "/about-us"][0]{
    meta_data
}`

export async function getAboutPage() {
  return await client.fetch(query)
}

export async function getAboutPageSeo() {
  return await client.fetch(aboutSeoQuery)
}
