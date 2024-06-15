import { defineField, defineType } from "sanity"

import { Stars } from "lucide-react"

export default defineType({
  name: "memorable_experiences_section",
  title: "Memorable Experiences Section",
  icon: Stars,
  description: "A section with memorable experiences",
  type: "object",
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "locale_string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "locale_string",
    }),
    defineField({
      name: "experience_cards",
      title: "Experience Cards",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "memorable_experiences" }],
        },
      ],
    }),
  ],
})
