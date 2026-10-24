import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { compressedImage } from "@/sanity/lib/imageHelpers";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { absoluteUrl, breadcrumbLd } from "@/lib/jsonld";
import { ORGANIZATION_ID, WEBSITE_ID } from "@/lib/site";

// Re-check Sanity at most once a minute so edits to a post appear without a redeploy
export const revalidate = 60;

const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  mainImage,
  excerpt,
  body,
  publishedAt,
  videoUrl
}`;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) return { title: "Post Not Found: Luxora Glaze System Limited" };

  return {
    title: `${post.title}: Luxora Glaze System Limited`,
    description: post.excerpt || "News and insights from Luxora Glaze System Limited.",
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt || undefined,
      ...(post.mainImage && {
        images: [{ url: compressedImage(post.mainImage, 1200, 630), alt: post.title }],
      }),
    },
  };
}

const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[15px] text-silver leading-[1.9] mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-[26px] text-white mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-[21px] text-white mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gold pl-5 italic text-gold my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold underline hover:text-gold-lt"
      >
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) notFound();

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div>
      <Nav />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt || undefined,
            image: post.mainImage ? compressedImage(post.mainImage, 1200, 630) : undefined,
            datePublished: post.publishedAt || undefined,
            url: absoluteUrl(`/blog/${slug}`),
            mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
            inLanguage: "en-KE",
            author: { "@id": ORGANIZATION_ID },
            publisher: { "@id": ORGANIZATION_ID },
            isPartOf: { "@id": WEBSITE_ID },
          },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />
      {/* PAGE HEADER */}
      <div className="relative bg-char px-5 md:px-15 pt-20 md:pt-24 pb-14 md:pb-16 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(201,168,76,0.03) 59px, rgba(201,168,76,0.03) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(201,168,76,0.03) 59px, rgba(201,168,76,0.03) 60px)",
          }}
        />
        <div className="relative z-10 max-w-160 mx-auto">
          <div className="flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-gold mb-4">
            <Link href="/" className="text-dim hover:text-gold transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link href="/blog" className="text-dim hover:text-gold transition-colors">
              Blog
            </Link>
            <span>›</span>
            <span>{post.title}</span>
          </div>
          <h1 className="font-serif font-light text-white leading-[1.1] mb-4 text-[clamp(28px,4.5vw,48px)]">
            {post.title}
          </h1>
          {formattedDate && (
            <p className="text-[12px] text-dim tracking-wide">{formattedDate}</p>
          )}
        </div>
      </div>

      {/* MAIN IMAGE */}
      {post.mainImage && (
        <div className="w-full max-h-[480px] overflow-hidden bg-black">
          <img
            src={compressedImage(post.mainImage, 1600, 900)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* BODY */}
      <div className="px-5 md:px-15 py-16 md:py-20">
        <div className="max-w-160 mx-auto">
          {post.body ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p className="text-[14px] text-silver">This post has no content yet.</p>
          )}

          <YouTubeEmbed url={post.videoUrl} title={post.title} />

          <div className="mt-14 pt-8 border-t border-border">
            <Link
              href="/blog"
              className="bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase inline-flex items-center justify-center gap-2 px-5 py-3 w-fit transition-all duration-300 hover:bg-gold-lt"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
