import { defineField, defineType } from "sanity"

// tour activities

export default defineType({
  name: "activity",
  title: "Activity",
  type: "document",
  description: "Tour activity",

  fields: [
    defineField({
      name: "name",
      title: "Name",
      description: "Name of the activity",
      type: "locale_string",
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Description of the activity",
      type: "locale_string",
    }),
    defineField({
      name: "image",
      title: "Image",
      description: "Image of the activity",
      type: "image",
    }),
    // level of activity medium, high, low
    defineField({
      name: "level",
      title: "Level",
      description: "Level of the activity",
      type: "string",
      options: {
        list: ["Low", "Medium", "High"],
      },
    }),
    defineField({
      name: "price",
      title: "Price",
      description: "Price of the activity",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "description.en",
      media: "image",
    },
    prepare: ({ title, subtitle, media }) => {
      return {
        title: title || "No title",
        subtitle: subtitle || "No description",
        media,
      }
    },
  },
})
