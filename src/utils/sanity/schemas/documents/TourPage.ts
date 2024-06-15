import { defineArrayMember, defineField, defineType } from "sanity"

import { TourSections } from "../sections/Tours"
import { joinStrings, displayNumber } from "@/lib/utils"
import { BaggageClaim } from "lucide-react"

export default defineType({
  name: "tour_page",
  title: "Tour Pages",
  icon: BaggageClaim,
  type: "document",
  fields: [
    defineField({
      name: "meta_data",
      title: "Meta Data",
      description: "Meta Data for SEO",
      type: "meta_data",
    }),
    // select destination from a list as many needed
    // defineField({
    //   name: "destination",
    //   title: "Destination",
    //   description: "Destination this tour is meant for",
    //   type: "array",
    //   of: [{ type: "reference", to: [{ type: "destination_page" }] }],
    // }),

    defineField({
      name: "slug",
      title: "Slug",
      description: "Slug for the page",
      type: "slug",
    }),
    // page breadcrumbs
    defineField({
      name: "breadcrumb",
      title: "Breadcrumb",
      description: "Breadcrumb for the page",
      type: "breadcrumb",
    }),
    defineField({
      name: "hero_section",
      title: "Hero Section",
      description: "Hero section for the page",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
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
        // multiple images
        defineField({
          name: "images",
          description: "Images for the hero section",
          title: "Images",
          type: "array",
          of: [{ type: "image" }],
          options: { layout: "grid" },
        }),
      ],
    }),
    defineField({
      name: "overview_card",
      title: "Overview Card",
      description: "Overview card for the page",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "duration",
          title: "Duration",
          description: "Duration of the tour",
          type: "locale_string",
        }),
        defineField({
          name: "countries",
          title: "Number of Countries",
          description: "Number of countries in the tour",
          type: "number",
        }),
        defineField({
          name: "cities",
          title: "Number of cities",
          description: "Number of cities in the tour",
          type: "number",
        }),
        defineField({
          name: "rating",
          title: "Rating",
          description: "Rating of the tour",
          type: "number",
        }),
        defineField({
          name: "about",
          title: "About",
          description: "About the tour",
          type: "locale_string",
        }),
        defineField({
          name: "price",
          title: "Price",
          description: "Price of the tour",
          type: "price",
        }),
        defineField({
          name: "cta_button",
          title: "CTA Button",
          description: "CTA button for the tour",
          type: "link_button",
        }),
        defineField({
          name: "cta_helper_text",
          title: "CTA Helper Text",
          description: "CTA helper text for the tour",
          type: "locale_string",
        }),
      ],
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      description: "Timeline for the tour",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "timeline",
          title: "Timeline",
          description: "Timeline for the tour",
          type: "timeline",
        }),
        defineField({
          name: "days",
          title: "Date generation Days",
          description: "Date generation Days",
          type: "array",
          of: [
            defineArrayMember({
              name: "day",
              title: "Day",
              type: "string",
              options: {
                list: [
                  { title: "Monday", value: "mon" },
                  { title: "Tuesday", value: "tue" },
                  { title: "Wednesday", value: "wed" },
                  { title: "Thursday", value: "thu" },
                  { title: "Friday", value: "fri" },
                  { title: "Saturday", value: "sat" },
                  { title: "Sunday", value: "sun" },
                ],
              },
            }),
          ],
        }),
        // fixed days
        defineField({
          name: "fixed_days",
          title: "Fixed Days",
          description: "Special days for the tour",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "from",
                  title: "Start Date",
                  type: "date",
                }),
                defineField({
                  name: "to",
                  title: "End Date",
                  type: "date",
                }),
                defineField({
                  name: "price",
                  title: "Price",
                  type: "price",
                }),
              ],
            },
          ],
        }),
        defineField({
          name: "disabled",
          title: "Disabled",
          description: "Disabled during",
          type: "array",
          of: [{ type: "timeline" }],
        }),
      ],
    }),
    defineField({
      name: "price_overrides",
      title: "Price price_overrides",
      description: "Price overrides for the tour",
      type: "array",
      of: [
        defineArrayMember({
          name: "price_override",
          title: "Price Override",
          type: "object",
          fields: [
            defineField({
              name: "timeline",
              title: "Timeline",
              description: "Timeline for the price override",
              type: "timeline",
            }),
            defineField({
              name: "price",
              title: "Price",
              description: "Price for the price override",
              type: "price",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "Tags for the page",
      type: "array",
      of: [{ type: "reference", to: [{ type: "touretag" }] }],
    }),
    defineField({
      name: "payment",
      title: "Hotel Types, Room Options and Tour Extras",
      description: "Hotel types, room options and tour extras",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "hotel_types",
          title: "Hotel Types",
          description: "Hotel types for the page",
          type: "array",
          of: [{ type: "hotel" }],
        }),
        // defineField({
        //   name: "room_options",
        //   title: "Room Options",
        //   description: "Room options for the page",
        //   type: "array",
        //   of: [
        //     defineArrayMember({
        //       name: "room_option",
        //       title: "Room Option",
        //       type: "object",
        //       fields: [
        //         defineField({
        //           name: "title",
        //           title: "Title",
        //           type: "locale_string",
        //         }),
        //         defineField({
        //           name: "description",
        //           title: "Description",
        //           type: "locale_string",
        //         }),
        //         defineField({
        //           name: "image",
        //           title: "Image",
        //           type: "photo",
        //         }),
        //         defineField({
        //           name: "rating",
        //           title: "Rating",
        //           description: "Rating of the room (1- 5)",
        //           type: "number",
        //         }),
        //         defineField({
        //           name: "price",
        //           title: "Price",
        //           description: "Extra price for the room",
        //           type: "price",
        //         }),
        //       ],
        //       preview: {
        //         select: {
        //           title: "title.en",
        //           rating: "rating",
        //           media: "image",
        //         },
        //         prepare: ({ title, rating, media }) => {
        //           return {
        //             title: joinStrings(
        //               ":",
        //               title || "No title",
        //               displayNumber(rating, "star")
        //             ),
        //             media,
        //           };
        //         },
        //       },
        //     }),
        //   ],
        // }),
        // defineField({
        //   name: "room_sharing_options",
        //   title: "Room Sharing Options",
        //   description: "Room sharing options for the page",
        //   type: "array",
        //   of: [
        //     defineArrayMember({
        //       name: "room_sharing_option",
        //       title: "Room Sharing Option",
        //       type: "object",
        //       fields: [
        //         defineField({
        //           name: "title",
        //           title: "Title",
        //           type: "locale_string",
        //         }),
        //         defineField({
        //           name: "description",
        //           title: "Description",
        //           type: "locale_string",
        //         }),
        //         defineField({
        //           name: "image",
        //           title: "Image",
        //           type: "photo",
        //         }),
        //         defineField({
        //           name: "price",
        //           title: "Price",
        //           description: "Extra price for the room sharing option",
        //           type: "price",
        //         }),
        //       ],
        //       preview: {
        //         select: {
        //           title: "title.en",
        //           media: "image",
        //         },
        //         prepare: ({ title, media }) => {
        //           return {
        //             title: joinStrings(":", title || "No title"),
        //             media,
        //           };
        //         },
        //       },
        //     }),
        //   ],
        // }),
        defineField({
          name: "extras",
          title: "Extras",
          description: "Extras for the tour",
          type: "array",
          of: [
            defineArrayMember({
              name: "extra",
              title: "Extra",
              type: "object",
              fields: [
                defineField({
                  name: "city_name",
                  title: "City Name",
                  description: "Name of the city",
                  type: "locale_string",
                }),
                defineField({
                  name: "count",
                  title: "Max visits",
                  description: "Maximum visits allowed",
                  type: "number",
                }),
                defineField({
                  name: "visits",
                  title: "Visits",
                  type: "array",
                  of: [
                    defineArrayMember({
                      name: "visit",
                      type: "object",
                      fields: [
                        defineField({
                          name: "title",
                          title: "Title",
                          type: "locale_string",
                        }),
                        defineField({
                          name: "description",
                          title: "Description",
                          type: "locale_string",
                        }),
                        defineField({
                          name: "image",
                          title: "Image",
                          type: "photo",
                        }),
                        defineField({
                          name: "price",
                          title: "Price",
                          description: "Price of the extra",
                          type: "price",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
              preview: {
                select: {
                  title: "city_name.en",
                  media: "image",
                },
                prepare: ({ title, media }) => {
                  return {
                    title: joinStrings(":", title || "No title"),
                    media,
                  }
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Sections",
      description: "Sections for the page",
      type: "array",
      of: TourSections.map((tour_section) => ({ type: tour_section })),
    }),
  ],
  preview: {
    select: {
      title: "meta_data.meta_title.en",
      destination: "destination.title.en",
      subtitle: "slug.current",
      media: "meta_data.meta_image",
      sections: "sections",
    },
    prepare: ({ title, subtitle, media, sections, destination }) => {
      return {
        title: joinStrings(
          ":",
          destination || "No Destination",
          title || "No title"
        ),
        subtitle: joinStrings(
          "|",
          subtitle || "No slug",
          displayNumber(sections?.length, "section")
        ),
        media,
      }
    },
  },
})
