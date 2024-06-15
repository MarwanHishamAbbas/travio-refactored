import { defineType, defineField } from "sanity"
import { i18n } from "@/language/index"

export default defineType({
  name: "locale_string",
  title: "Localized String",
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
      type: "text",
      fieldset: lang.isDefault ? undefined : "translations",
    })
  ),
  preview: {
    select: {
      title: i18n.languages.find((lang) => lang.isDefault)?.id ?? "",
    },
  },
})
