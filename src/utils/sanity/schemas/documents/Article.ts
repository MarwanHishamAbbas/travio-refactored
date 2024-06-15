import { defineArrayMember, defineField, defineType } from "sanity"

import { displayNumber, joinStrings } from "@/lib/utils"

export default defineType({
  name: "article",
  title: "Article",

  description: "An article",
  type: "document",
  fields: [
    // defineField({
    //   name: 'destination',
    //   title: 'Destination',
    //   description: 'Destination this article is meant for',
    //   type: 'reference',
    //   to: [{ type: 'destination_page' }],
    // }),
    defineField({
      name: "cover_image",
      title: "Cover Image",
      description: "The cover image for the blog",
      type: "photo",
    }),
    defineField({
      name: "title",
      title: "Title",
      description: "The title for the blog",
      type: "locale_string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "The slug for the blog",
      type: "slug",
    }),
    defineField({
      name: "breadcrumb",
      title: "Breadcrumb",
      description: "Breadcrumb for the page",
      type: "breadcrumb",
    }),
    // adding tags to the blog so we can filter them
    defineField({
      name: "tags",
      title: "Tags",
      description: "The tags for the blog post to filter them",
      type: "array",
      of: [
        defineArrayMember({
          name: "tag",
          title: "Tag",
          type: "reference",
          to: [{ type: "tag" }],
        }),
      ],
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      description: "Introduction for the blog",
      type: "locale_string",
    }),
    defineField({
      name: "auther",
      title: "Author",
      description: "Author of the blog",
      type: "reference",
      to: [{ type: "auther" }],
    }),
    defineField({
      name: "time",
      title: "Timestamp",
      description: "Timestamp of the blog",
      type: "locale_string",
    }),
    defineField({
      name: "subsections",
      title: "Subsections",
      description: "Subsections of the blog",
      type: "array",
      of: [
        {
          type: "object",
          title: "Content Section",
          name: "contentSection", // Explicit type name
          fields: [
            defineField({
              name: "tagline",
              title: "Tagline",
              type: "locale_string",
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "locale_rich_text",
            }),
          ],
        },
        {
          type: "object",
          title: "Banner Section",
          name: "bannerSection", // Explicit type name
          fields: [
            defineField({
              name: "title",
              title: "Banner Title",
              type: "locale_string",
            }),
            // describe the banner image
            defineField({
              name: "description",
              title: "Banner Description",
              type: "locale_string",
            }),
            defineField({
              name: "image",
              title: "Banner Image",
              type: "image",
            }),
            defineField({
              name: "tour",
              title: "Tour",
              type: "reference",
              to: [{ type: "tour_page" }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "sidebar",
      title: "Sidebar",
      description: "Sidebar for the page",
      type: "blog_sidebar",
    }),
    // related toures
    defineField({
      name: "suggested_tour",
      title: "Suggested Tours",
      description: "Suggested Tours for the Page",
      type: "featured_tours_section",
    }),
    // related articles
    defineField({
      name: "related_articles",
      title: "Related Articles",
      description: "Related Articles for the Page",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "tagline",
          title: "Tagline",
          type: "locale_string",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "locale_string",
        }),
        defineField({
          name: "articles",
          title: "Articles",
          type: "array",
          of: [
            defineArrayMember({
              name: "article",
              title: "Article",
              type: "reference",
              to: [{ type: "article" }],
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "show_new_letter",
      title: "Show Newsletter Section",
      description: "Show Newsletter Section",
      type: "show_new_letter_section",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      author: "author.en",
      timestamp: "time",
      subsections: "subsections",
      media: "cover_image",
    },
    prepare: ({ title, author, media, timestamp, subsections }) => {
      return {
        title,
        subtitle: joinStrings(
          "|",
          author,
          timestamp,
          displayNumber(subsections?.length, "subsection")
        ),
        media,
      }
    },
  },
})
