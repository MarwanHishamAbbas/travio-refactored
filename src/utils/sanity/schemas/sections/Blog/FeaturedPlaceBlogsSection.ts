import { defineArrayMember, defineField, defineType } from 'sanity'
import {  displayNumber, joinStrings } from '@/lib/utils'

export const countryBlogCard = defineType({
  name: 'country_blog_card',
  title: 'Country Blog Card',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'The name of the country blog card',
      type: 'locale_string',
    }),
    defineField({
      name: 'photo',
      title: 'photo',
      description: 'The icon for the country blog card',
      type: 'photo',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      description: 'The link for the country blog card',
      type: 'reference',
      to: [{ type: 'blog_page' }],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      icon: 'icon',
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
  name: 'featured_place_blogs_section',
  title: 'Featured Place Blogs Section',
  description: 'A section with featured place blogs',
  type: 'object',
  fields: [
    // array of object that will have img  name, link  of page that will be where the card will redirect
    defineField({
      name: 'cards',
      title: 'Cards',
      description: 'The cards for the featured place blogs section',
      type: 'array',
      of: [
        defineArrayMember({
          // name: 'card',
          // title: 'Card',
          // description: 'A card',
          type: 'country_blog_card',
          // to: [{ type: 'destination_page' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      cards: 'cards',
    },
    prepare: ({ cards }) => {
      return {
        title: `Featured Place Blogs`,
        subtitle: joinStrings('|', displayNumber(cards?.length, 'card')),
      }
    },
  },
})
