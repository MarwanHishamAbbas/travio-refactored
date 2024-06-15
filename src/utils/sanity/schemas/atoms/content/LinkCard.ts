import { defineField, defineType } from "sanity"

import { RectangleVerticalIcon } from "lucide-react"

export default defineType({
  name: "content_link_card",
  title: "Link Card",
  icon: RectangleVerticalIcon,
  description: "A link card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "The title for the link card",
      type: "locale_string",
    }),
    defineField({
      name: "link",
      title: "Link",
      description: "The link for the link card",
      type: "link",
    }),
    defineField({
      name: "image",
      title: "Image",
      description: "The image for the link card",
      type: "photo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
})
