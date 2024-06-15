import { defineArrayMember, defineField, defineType } from "sanity"
import { displayNumber, joinStrings } from "@/lib/utils"

import { Star } from "lucide-react"
// InterestCard
export const interestCard = defineType({
  name: "interest_card",
  title: "Interest Card",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      description: "The name of the interest card",
      type: "locale_string",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      description: "The icon for the interest",
      type: "image",
    }),
    defineField({
      name: "link",
      title: "Link",
      description: "The link for the interest",
      type: "reference",
      to: [{ type: "blog_page" }],
    }),
  ],
  preview: {
    select: {
      name: "name",
      icon: "icon",
    },
    prepare: ({ name, icon }) => {
      return {
        title: name,
        media: icon,
      }
    },
  },
})

export default defineType({
  name: "interests_section",
  title: "Interests Section",
  icon: Star,
  description: "A section with interests",
  type: "object",
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "The tagline for the interests section",
      type: "locale_string",
    }),
    defineField({
      name: "title",
      title: "Title",
      description: "The heading for the interests section",
      type: "locale_string",
    }),
    //  array of object that will have name , icon , link  of page
    defineField({
      name: "interests",
      title: "Interests",
      description: "The interests for the interests section",
      type: "array",
      of: [
        defineArrayMember({
          type: "interest_card",
        }),
      ],
      // of: [
      //   // defineArrayMember({
      //   //   type: 'reference',
      //   //   to: [{ type: 'tag' }],
      //   // }),
      //   defineArrayMember({
      //     name: 'interest',
      //     title: 'Interest',
      //     description: 'An interest',
      //     // type: 'interest_card',
      //     to: [{ type: 'interest_card' }],
      //   }),
      // ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      interests: "interests",
    },
    prepare: ({ title, interests }) => {
      return {
        title: "Interests Section",
        subtitle: joinStrings(
          "|",
          title,
          displayNumber(interests?.length, "interest")
        ),
      }
    },
  },
})
