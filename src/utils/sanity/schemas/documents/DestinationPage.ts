import { defineField, defineType } from "sanity"
import { displayNumber, joinStrings } from "@/lib/utils"

import { DestinationSections } from "../sections/Destination"
import { BaggageClaim } from "lucide-react"

export default defineType({
  name: "destination_page",
  title: "Destination Pages",
  icon: BaggageClaim,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      description: "Name of the destination",
      type: "locale_string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "Slug for the page",
      type: "slug",
    }),
    defineField({
      name: "breadcrumb",
      title: "Breadcrumb",
      description: "Breadcrumb for the page",
      type: "breadcrumb",
    }),
    defineField({
      name: "meta_data",
      title: "Meta Data",
      description: "Meta Data for SEO",
      type: "meta_data",
    }),
    defineField({
      name: "discounts_section",
      title: "Discounts Section",
      description: "Discounts section for the page",
      type: "object",
      fields: [
        defineField({
          name: "header_section",
          title: "Header Section",
          description: "Header section for the discounts section",
          type: "image_header_section",
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Sections",
      description: "Sections for the page",
      type: "array",
      of: DestinationSections.map((destination_section) => ({
        type: destination_section,
      })),
    }),
  ],
  preview: {
    select: {
      title: "meta_data.meta_title.en",
      name: "name.en",
      subtitle: "slug.current",
      media: "meta_data.meta_image",
      sections: "sections",
    },
    prepare: ({ title, name, subtitle, media, sections }) => {
      return {
        title: name || "No name",
        subtitle: joinStrings(
          "|",
          subtitle,
          title,
          displayNumber(sections?.length, "section")
        ),
        media,
      }
    },
  },
})
