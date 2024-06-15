import { Tag } from "lucide-react"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "promo",
  title: "Promo codes",
  icon: Tag,
  description: "Promo codes to be applies",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Code",
      type: "string",
    }),
    defineField({
      name: "percent",
      title: "Discount percent",
      type: "number",
    }),
    defineField({
      name: "max_discount",
      title: "Maximum discount",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "code",
    },
    prepare: ({ title }) => ({
      title: "Promo Code",
      subtitle: title,
    }),
  },
})
