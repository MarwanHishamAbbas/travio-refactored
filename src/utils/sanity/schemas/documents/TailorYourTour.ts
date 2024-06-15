import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
    name: "tailor_your_tour",
    title: "Tailor Your Tour Steps",
    type: "document",
    fields: [
        defineField({
            name: "meta_data",
            title: "Meta Data",
            description: "Meta Data for SEO",
            type: "meta_data",
        }),
        defineField({
          name: 'breadcrumb',
          title: 'Breadcrumb',
          description: 'Breadcrumb for the page',
          type: 'breadcrumb',
        }),
        defineField({
            name: "place_cards",
            title: "Place Cards",
            description: "Cards for the Destinations Section",
            type: "array",
            of: [
                defineArrayMember({
                    name: "place_card",
                    title: "Place Card",
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "locale_string",
                        }),
                        defineField({
                            name: "image",
                            title: "Image",
                            type: "photo",
                        }),
                        defineField({
                            name: "is_primary_label",
                            title: "Primary Label?",
                            description: "Should the label be colored?",
                            type: "boolean",
                        }),
                    ],
                }),
            ],
        }),
        // step 1
        defineField({
            name: "step_1",
            description: "Header Data for Step 1",
            title: "Step 1 Title",
            type: "object",
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
              defineField({
                name: 'tagline',
                title: 'Tagline',
                description: 'Tagline for the FAQ section',
                type: 'locale_string',
              }),
              defineField({
                name: 'title',
                title: 'Heading',
                description: 'Title for the FAQ section',
                type: 'locale_string',
              }),
            ],
        }),
        // step 2
        defineField({
            name: "step_2",
            description: "Header Data for Step 2",
            title: "Step 2 Title",
            type: "object",
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
              defineField({
                name: 'tagline',
                title: 'Tagline',
                description: 'Tagline for the FAQ section',
                type: 'locale_string',
              }),
              defineField({
                name: 'title',
                title: 'Heading',
                description: 'Title for the FAQ section',
                type: 'locale_string',
              }),
            ],
        }),
        // step 3
        defineField({
            name: "step_3",
            description: "Header Data for Step 3",
            title: "Step 3 Title",
            type: "object",
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
              defineField({
                name: 'tagline',
                title: 'Tagline',
                description: 'Tagline for the FAQ section',
                type: 'locale_string',
              }),
              defineField({
                name: 'title',
                title: 'Heading',
                description: 'Title for the FAQ section',
                type: 'locale_string',
              }),
            ],
        }),
        defineField({
            name: "faq_section",
            title: "FAQ Section",
            type: "faq_section",
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
    ],
});
