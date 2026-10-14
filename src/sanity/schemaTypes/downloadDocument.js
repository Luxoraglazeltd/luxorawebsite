const MAX_PDF_BYTES = 6 * 1024 * 1024;

export default {
  name: "downloadDocument",
  title: "Download Document",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Document Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Product Brochure", value: "brochure" },
          { title: "Technical Data Sheet", value: "datasheet" },
          { title: "Installation Guide", value: "installation" },
          { title: "Warranty Information", value: "warranty" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "Shown on the Download Centre card",
    },
    {
      name: "file",
      title: "PDF File",
      type: "file",
      options: { accept: ".pdf" },
      description: "PDF only, up to 6 MB.",
      validation: (Rule) => [
        Rule.required(),
        // Keeps the client's Sanity storage from filling up with oversized files
        Rule.custom(async (file, context) => {
          const ref = file?.asset?._ref;
          if (!ref) return true;
          const client = context.getClient({ apiVersion: "2024-01-01" });
          const size = (await client.fetch("*[_id == $id][0].size", { id: ref })) || 0;
          if (size > MAX_PDF_BYTES) {
            return `This file is ${(size / (1024 * 1024)).toFixed(1)} MB, which is too large for the website (limit 6 MB). Please send it to Veritas Data Services to prepare.`;
          }
          return true;
        }),
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
};
