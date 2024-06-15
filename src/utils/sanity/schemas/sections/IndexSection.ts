import { defineArrayMember, defineField, defineType } from "sanity"
import { Bookmark } from "lucide-react"

export default defineType({
  name: "index_section",
  title: "Index Section",
  type: "object",
  icon: Bookmark as any,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "The title of the section",
      type: "locale_string",
    }),
    defineField({
      name: "tours",
      title: "Tour Links",
      description: "Tour Link",
      type: "array",
      of: [
        defineArrayMember({
          name: "link",
          title: "Link",
          type: "link",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      links: "tours",
    },
    prepare: ({ title }) => {
      return {
        title: `Index Section`,
      }
    },
  },
})
