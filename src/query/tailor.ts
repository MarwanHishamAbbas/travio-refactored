import { client } from "@/utils/sanity/client"
import { pageLayout } from "./home"

const trailorPageQuery = `*[_type == "tailor_your_tour"]`

const query = `{
    "layout":  ${pageLayout},
    "pageData":  ${trailorPageQuery}
}`

export async function getTailorPage() {
  return await client.fetch(query)
}

const seoQuery = `*[_type == "tailor_your_tour"][0]{
    meta_data
  }`

export async function getTailorPageSeo() {
  return await client.fetch(seoQuery)
}
