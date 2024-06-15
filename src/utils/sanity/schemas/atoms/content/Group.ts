import { defineField, defineType } from "sanity"
import { Columns } from "lucide-react"
import { content_layouts } from "."
import { displayNumber, joinStrings } from "@/lib/utils"

export default defineType({
  name: "layout_group",
  title: "Group Layout",
  icon: Columns as any,
  description: "A group of content",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: content_layouts.map((layout) => ({ type: layout })),
    }),
  ],
  preview: {
    select: {
      items: "items",
    },
    prepare: ({ items }) => {
      return {
        title: "Group Layout",
        subtitle: joinStrings("|", displayNumber(items?.length, "item")),
      }
    },
  },
})
