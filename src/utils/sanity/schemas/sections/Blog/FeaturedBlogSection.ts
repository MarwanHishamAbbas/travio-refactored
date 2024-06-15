import { defineField, defineType, defineArrayMember } from "sanity"
import { displayNumber, joinStrings } from "@/lib/utils"
import { BookOpen } from "lucide-react"

export default defineType({
  name: "featured_blogs_section",
  title: "Featured Blogs Section",
  icon: BookOpen as any,
  description: "A section with featured blogs",
  type: "object",
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "The tagline for the featured blog section",
      type: "locale_string",
    }),
    defineField({
      name: "title",
      title: "Title",
      description: "The heading for the featured blog section",
      type: "locale_string",
    }),
    defineField({
      name: "featured_blogs",
      title: "Blogs",
      description: "The blogs for the featured blog section",
      type: "array",
      of: [
        defineArrayMember({
          name: "featured_blog",
          title: "Featured Blog",
          description: "A featured blog",
          icon: BookOpen as any,
          type: "reference",
          to: [{ type: "article" }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      blogs: "featured_blogs",
    },
    prepare({ title, blogs }) {
      return {
        title: `Featured Blogs Section`,
        subtitle: joinStrings("|", title, displayNumber(blogs?.length, "Blog")),
      }
    },
  },
})
