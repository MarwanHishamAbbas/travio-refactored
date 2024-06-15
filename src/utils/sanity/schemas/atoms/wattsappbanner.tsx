import { defineField, defineType } from "sanity"

import { PhoneCall } from "lucide-react"

export default defineType({
  name: "watts_banner",
  title: "Contact Banner",
  icon: PhoneCall as any,
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
      name: "contact_number",
      title: "Contact Number",
      description: "Contact number for the banner",
      type: "string",
    }),

    defineField({
      name: "show",
      title: "Show",
      description: "Show or hide the Contact banner",
      type: "boolean",
    }),
  ],
})
