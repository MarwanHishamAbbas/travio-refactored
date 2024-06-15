import { defineField, defineType } from "sanity"
import { displayNumber, joinStrings } from "@/lib/utils"

import { sections } from "../sections"
import { Globe } from "lucide-react"

export default defineType({
  name: "page",
  title: "Pages",
  type: "document",
  icon: Globe,
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      description: "Slug for the page",
      type: "slug",
    }),
    defineField({
      name: "meta_data",
      title: "Meta Data",
      description: "Meta Data for SEO",
      type: "meta_data",
    }),
    // page breadcrumbs
    defineField({
      name: "breadcrumb",
      title: "Breadcrumb",
      description: "Breadcrumb for the page",
      type: "breadcrumb",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      description: "Sections for the page",
      type: "array",
      of: sections.map((section) => ({ type: section })),
    }),
  ],
  preview: {
    select: {
      title: "meta_data.meta_title.en",
      subtitle: "slug.current",
      media: "meta_data.meta_image",
      sections: "sections",
    },
    prepare: ({ title, subtitle, media, sections }) => {
      return {
        title: title || "No title",
        subtitle: joinStrings(
          "|",
          subtitle || "No slug",
          displayNumber(sections?.length, "section")
        ),
        media,
      }
    },
  },
})
