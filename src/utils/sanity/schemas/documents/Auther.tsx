import { Pen } from "lucide-react"
import { defineField, defineType } from "sanity"

export const authersocial = defineType({
  name: "auth-social",
  title: "Social",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      description: "Name of the social",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      description: "Icon of the social",
      type: "image", // Change 'photo' to 'image'
    }),
    defineField({
      name: "link",
      title: "Link",
      description: "Link of the social",
      type: "string",
    }),
  ],
})

export default defineType({
  name: "auther",
  title: "Authers",
  icon: Pen,
  description: "Auther of the blog",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      description: "Name of the author",
      type: "locale_string",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      description: "Avatar of the author",
      type: "photo",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      description: "Bio of the author",
      type: "locale_string",
    }),
    defineField({
      name: "socials",
      title: "Socials",
      description: "Socials of the author",
      type: "array",
      of: [{ type: "auth-social" }],
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
    prepare: ({ title }) => ({
      title: "Author",
      subtitle: title.en,
    }),
  },
})
