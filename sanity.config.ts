/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
// import {structureTool} from 'sanity/structure'

import { StructureToolOptions, structureTool } from "sanity/structure"

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "@/utils/sanity/env"
import { schemaTypes } from "@/utils/sanity/schema"

// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
// const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const CustomDocumentTypes = new Set([
  "page",
  "article",
  "blog_page",
  "tag",
  "auther",
])
// main blogs Page

const Singletons = new Set([
  "tailor_your_tour",
  "globals",
  "newsletter_section",
  "activity",
])

const deskToolOptions: StructureToolOptions = {
  name: "Traviio",
  title: "Traviio",
  structure: (S) =>
    S.list()
      .title("Traviio")
      .items([
        S.listItem()
          .title("General Pages")

          .child(S.documentTypeList("page").title("General Pages")),
        S.listItem()
          .title("Blog")

          .child(
            S.list()
              .title("Blog")
              .items([
                S.listItem()
                  .title("Articles")

                  .child(S.documentTypeList("article").title("Articles")),
                S.listItem()
                  .title("Blog Pages")

                  .child(S.documentTypeList("blog_page").title("Blog Pages")),
                S.listItem().title("Tags"),
                S.listItem()
                  .title("Authors")

                  .child(S.documentTypeList("auther").title("Authors")),
              ])
          ),
        ...S.documentTypeListItems().filter((item: any) => {
          return (
            !CustomDocumentTypes.has(
              typeof item.getSchemaType() === "string"
                ? item.getSchemaType()
                : item.getSchemaType()?.name || ""
            ) &&
            !Singletons.has(
              typeof item.getSchemaType() === "string"
                ? item.getSchemaType()
                : item.getSchemaType()?.name || ""
            )
          )
        }),
        S.divider(),
        S.listItem()
          .title("Global Components")

          .id("globals")
          .child(S.document().schemaType("globals").documentId("globals")),
        S.listItem()
          .title("Tailor Your Tour")

          .id("tailor_your_tour")
          .child(
            S.document()
              .schemaType("tailor_your_tour")
              .documentId("tailor_your_tour")
          ),
        // news Letter Section
        S.listItem()
          .title("Newsletter Section")

          .id("newsletter_section")
          .child(
            S.document()
              .schemaType("newsletter_section")
              .documentId("newsletter_section")
          ),
        // Activity
        S.listItem()
          .title("Activity")

          .id("activity")
          .child(S.documentTypeList("activity").title("Activity List")),
      ]),
}
export default defineConfig({
  basePath: "/studio",
  name: "travio",
  title: "Travio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema: {
    types: schemaTypes,
  },
  plugins: [
    // structureTool(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    structureTool(deskToolOptions),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
