import { defineField, defineType } from "sanity";

export default defineType({
  name: "hotel",
  title: "Hotel",
  type: "object",
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: "name",
      title: "Hotel Name",
      type: "locale_string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "locale_text",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "price",
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
    }),
    defineField({
      name: "rooms",
      title: "Rooms",
      type: "array",
      of: [
        defineField({
          name: "room",
          title: "Room",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "locale_string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "locale_text",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "price",
            }),
          ],
        }),
      ],
    }),
  ],
});