import { defineField, defineType } from "sanity"
import { displayNumber, joinStrings } from "@/lib/utils"
import { CircleCheck } from "lucide-react"

export default defineType({
  name: "tour_selection_section",
  title: "Tour Selection Section",
  icon: CircleCheck,
  type: "object",
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "The tagline for the tour selection section",
      type: "locale_string",
    }),
    defineField({
      name: "title",
      title: "Title",
      description: "The heading for the tour selection section",
      type: "locale_string",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "The tags for the tour selection section",
      type: "array",
      of: [{ type: "reference", to: [{ type: "touretag" }] }],
    }),
    // destination tags
    defineField({
      name: "destination_tags",
      title: "Destination Tags",
      description: "The destination tags for the tour selection section",
      type: "array",
      of: [{ type: "reference", to: [{ type: "touretag" }] }],
    }),
    // price range
    defineField({
      name: "price_tags",
      title: "Price Tags",
      description: "The Pricing tags for the tour selection section",
      type: "array",
      of: [{ type: "reference", to: [{ type: "touretag" }] }],
    }),
    // duration tags
    defineField({
      name: "duration_tags",
      title: "Duration Tags",
      description: "The duration tags for the tour selection section",
      type: "array",
      of: [{ type: "reference", to: [{ type: "touretag" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      filters: "filters",
    },
    prepare: ({ title, filters }) => ({
      title: "Tour Selection Section",
      subtitle: joinStrings(
        "|",
        title,
        displayNumber(filters?.length, "filter")
      ),
    }),
  },
})
