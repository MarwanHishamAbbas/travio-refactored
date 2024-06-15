import { defineArrayMember, defineField, defineType } from "sanity"
import { displayNumber, joinStrings } from "@/lib/utils"
import { HelpingHand, Info } from "lucide-react"

export default defineType({
  name: "travel_wiki",
  title: "Travel Wikis",
  icon: Info as any,
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      description: "The slug for this travel wiki (relative to '/wikis')",
      type: "slug",
    }),
    defineField({
      name: "meta_data",
      title: "Meta Data",
      description: "Meta Data for SEO",
      type: "meta_data",
    }),
    // page breadcrumbs
    //  defineField({
    //   name: 'breadcrumb',
    //   title: 'Breadcrumb',
    //   description: 'Breadcrumb for the page',
    //   type: 'breadcrumb',
    // }),
    defineField({
      name: "image_hero",
      title: "Hero Image Banner",
      type: "object",
      fields: [
        defineField({
          name: "header_section",
          title: "Header Section",
          description: "Header section for the Wiki Page",
          type: "image_header_section",
        }),
      ],
    }),
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
      name: "tab_title",
      title: "Tab Title",
      description: "Title to display in the tab name os secondary bar",
      type: "locale_string",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({
          name: "section",
          title: "Section",
          type: "travel_wiki_section",
        }),
      ],
    }),
    defineField({
      name: "suggested_tour",
      title: "Suggested Tours",
      description: "Suggested Tours for the Wiki Page",
      type: "featured_tours_section",
    }),
  ],
  preview: {
    select: {
      title: "title",
      location: "location",
      sections: "sections",
      slug: "slug",
    },
    prepare: ({ title, location, sections, slug }) => {
      return {
        title: joinStrings("|", "Travel Guide", location),
        subtitle: joinStrings(
          "|",
          title,
          slug?.current,
          displayNumber(sections.length, "section")
        ),
      }
    },
  },
})

export const TravelWikiSection = defineType({
  name: "travel_wiki_section",
  title: "Section",
  icon: HelpingHand,
  type: "object",
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: "tree_title",
      title: "Tree Title",
      description: "The title to display in the tree (first level only)",
      type: "locale_string",
    }),
    // array of sections to allow for nested sections
    // array of sections to allow for nested sections
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({
          name: "section",
          title: "Section",
          type: "travel_wiki_sidebar",
        }),
      ],
    }),
    // defineField({
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   options: {
    //     source: 'title',
    //     maxLength: 96,
    //   },
    // }),

    // defineField({
    //   name: 'title',
    //   title: 'Title',
    //   type: 'locale_string',
    // }),
    // defineField({
    //   name: 'content',
    //   title: 'Content',
    //   type: 'locale_rich_text',
    // }),
    // defineField({
    //   name: 'nested_sections',
    //   title: 'Nested Sections',
    //   type: 'array',
    //   of: [
    //     defineArrayMember({
    //       name: 'nested_section',
    //       title: 'Nested Section',
    //       type: 'travel_wiki_section',
    //     }),
    //   ],
    // }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title: joinStrings("|", "Section", title ?? "Untitled"),
    }),
  },
})

export const newObj = defineType({
  name: "travel_wiki_sidebar",
  title: "Travel Wiki Sidebar",
  description: "Sidebar for the Travel Wiki",
  icon: Info as any,
  type: "object",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "locale_string",
      description: "Title for the section (Second level only)",
    }),

    // we will have to add a nested section here also
    defineField({
      name: "second_nested_section",
      title: "Nested Sections",
      type: "array",
      of: [
        defineArrayMember({
          name: "nested_section",
          title: "Nested Section",
          type: "sub_nested_section",
        }),
      ],
    }),
  ],
})

export const newNestedObj = defineType({
  name: "sub_nested_section",
  title: "Sub Section",
  description: "Sub Section for the Travel Wiki (Third Level)",
  icon: Info as any,
  type: "object",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "locale_string",
      description: "Title for the section (Thired level )",
    }),

    defineField({
      name: "content",
      title: "Content",
      type: "locale_rich_text",
    }),
  ],
})
