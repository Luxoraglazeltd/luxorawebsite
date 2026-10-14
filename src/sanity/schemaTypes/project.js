export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "The project's web address. Click Generate. Do not change this after the project is published, or the old link will stop working.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. Malindi, Kenya",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "projectType",
      title: "Project Type",
      type: "string",
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Commercial", value: "commercial" },
          { title: "Hospitality", value: "hospitality" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      description: "The main photo shown on the Projects page and when the project is shared.",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Additional photos specific to this project",
    },
    {
      name: "scope",
      title: "Scope / Description",
      type: "text",
      rows: 4,
      description: "What was done for this project. This is also what shows on Google, so keep it clear.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "productsUsed",
      title: "Products Used",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. Aluminium Windows, Folding Doors",
    },
    {
      name: "completedAt",
      title: "Completion Date",
      type: "date",
    },
    {
      name: "videoUrl",
      title: "YouTube Video (optional)",
      type: "url",
      description:
        "Paste the normal YouTube link, e.g. https://www.youtube.com/watch?v=xxxx or https://youtu.be/xxxx",
      validation: (Rule) =>
        Rule.uri({ scheme: ["https"] }).custom((url) => {
          if (!url) return true;
          return (
            /(youtube\.com|youtu\.be)/.test(url) || "Please paste a YouTube link"
          );
        }),
    },
  ],
};
