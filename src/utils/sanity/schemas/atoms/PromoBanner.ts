import { defineField, defineType } from "sanity"

import { Megaphone } from "lucide-react"

export default defineType({
  name: "promo_banner",
  title: "Promo Banner",
  icon: Megaphone as any,
  // description: 'Promo banner ',
  type: "object",
  options: {
    collapsible: true,
    // collapsed: true,
  },
  fields: [
    defineField({
      name: "text",
      title: "Text",
      description: "Text for the promo banner",
      type: "locale_string",
    }),
    defineField({
      name: "link",
      title: "Link",
      description: "Link for the promo banner",
      type: "link",
    }),
    defineField({
      name: "show",
      title: "Show",
      description: "Show or hide the promo banner",
      type: "boolean",
    }),
  ],
})
