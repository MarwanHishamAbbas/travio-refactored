import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'featured_tours_section',
  title: 'Featured Tours Section',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    // center header boolean
    defineField({
      name: 'center_header',
      title: 'Center Header',
      description: 'Center the header text',
      type: 'boolean',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'locale_string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'locale_string',
    }),
    defineField({
      name: 'tour_cards',
      title: 'Tour Cards',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'deals',
          title: 'Tour Card',
          type: 'object',
          fields: [
            defineField({
              name: 'badge_content',
              title: 'Badge Content',
              type: 'locale_string',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'reference',
              to: [{ type: 'tour_page' }],
            }),
          ],
        }),
      ],
    }),
  ],
})
