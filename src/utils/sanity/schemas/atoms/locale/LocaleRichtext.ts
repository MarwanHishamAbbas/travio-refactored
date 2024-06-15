import { defineType, defineField } from "sanity"
import { i18n } from "@/language/index"

export const locale_rich_text = defineType({
  name: "locale_rich_text",
  title: "Localized Rich Text",
  type: "object",
  options: {
    collapsible: true,
  },
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      description: "The translations for the text",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: i18n.languages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title.en,
      type: "rich_text",
      fieldset: lang.isDefault ? undefined : "translations",
    })
  ),
  preview: {
    select: {
      title: i18n.languages.find((lang) => lang.isDefault)?.id ?? "",
    },
  },
})
