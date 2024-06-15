import { Newspaper } from "lucide-react"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "show_new_letter_section",
  title: "Show New Letter Section",
  type: "object",
  description: "Show the new letter section on the page",
  icon: Newspaper as any,
  fields: [
    defineField({
      name: "show",
      title: "Show",
      description: "Show the new letter section on the page",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      show: "show",
    },
    prepare: ({ show }) => {
      return {
        title: "Show New Letter Section",
        subtitle: show ? "Show" : "Hide",
      }
    },
  },
})
