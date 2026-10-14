export default {
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional short caption shown on hover",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers show first. Leave blank to sort by upload date.",
    },
  ],
  preview: {
    select: {
      title: "caption",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Untitled Gallery Image",
        media,
      };
    },
  },
};
