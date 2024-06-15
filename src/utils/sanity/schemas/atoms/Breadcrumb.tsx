// bread crumb schema

import { defineField, defineType } from "sanity"

export default defineType({
  name: "breadcrumb",
  title: "Breadcrumb",
  description: "Breadcrumb Component",
  type: "object",
  // array of links
  fields: [
    defineField({
      name: "breadcrumb",
      title: "Breadcrumb",
      description: "Breadcrumb",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              description: "Title for the link",
              type: "locale_string",
            }),
            defineField({
              name: "url",
              title: "URL",
              description: "URL for the link",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  allowRelative: true,
                }),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      breadcrumb: "breadcrumb",
    },
    prepare(selection) {
      const { breadcrumb } = selection
      return {
        title: "Breadcrumb",
        subtitle: breadcrumb
          .map((item: { title: string }) => item.title)
          .join(" > "),
      }
    },
  },
})
