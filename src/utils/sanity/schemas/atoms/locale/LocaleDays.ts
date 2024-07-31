import { defineType, defineField, defineArrayMember } from "sanity"
import { i18n } from "@/language/index"

export default defineType({
  name: "locale_days",
  title: "Localized Days",
  type: "object",
  options: {
    collapsible: true,
  },
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      description: "The translations for the string",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: i18n.languages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title.en,
      type: "array",
      of: [
        defineArrayMember({
          name: "day",
          title: "Day",
          type: "string",
          options: {
            list: [
              { title: "Monday", value: "mon" },
              { title: "Tuesday", value: "tue" },
              { title: "Wednesday", value: "wed" },
              { title: "Thursday", value: "thu" },
              { title: "Friday", value: "fri" },
              { title: "Saturday", value: "sat" },
              { title: "Sunday", value: "sun" },
            ],
          },
        }),
      ],
    })
  ),
  preview: {
    select: {
      title: i18n.languages.find((lang) => lang.isDefault)?.id ?? "",
    },
  },
})
