import { defineType } from 'sanity'

export default defineType({
  name: 'memorable_experiences',
  title: 'Memorable Experiences',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'The title for the card',
      type: 'locale_string',
    },
    {
      name: 'description',
      title: 'Description',
      description: 'The description for the card',
      type: 'locale_text',
    },
    {
      name: 'image',
      title: 'Image',
      description: 'The image for the card',
      type: 'image',
    },
    // dropdown with the wiki page 
    {
      name: 'wiki',
      title: 'Wiki',
      description: 'The wiki page for the card',
      type: 'reference',
      to: [{ type: 'travel_wiki' }],
    },
  ],
})
