export default {
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "The post's web address. Click Generate. Do not change this after the post is published, or the old link will stop working.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      description:
        "Optional. The picture shown on the blog page and when the post is shared on WhatsApp, Facebook or LinkedIn. Posts without one are shared without a picture.",
      options: { hotspot: true },
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description:
        "1 to 2 sentences summarising the post. This is what shows on Google and on the blog page (aim for under 160 characters).",
      validation: (Rule) => [
        Rule.required(),
        Rule.max(160).warning("Google may cut this off. Try to keep it under 160 characters."),
      ],
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      description: "Defaults to today. Used on the post and by Google.",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
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
