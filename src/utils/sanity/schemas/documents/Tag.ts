import { Tag } from "lucide-react"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "tag",
  title: "Tags",
  icon: Tag,
  description: "A tag",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "locale_string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "The slug is the URL path segment for this tag. It should be unique eg :(outdoor, turkey).",
      type: "slug",
      options: {
        source: "name",
      },
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
    prepare: ({ title }) => ({
      title: "Tag",
      subtitle: title.en,
    }),
  },
})
