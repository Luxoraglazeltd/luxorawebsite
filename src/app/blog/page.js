import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { compressedImage } from "@/sanity/lib/imageHelpers";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import { webPageLd, breadcrumbLd } from "@/lib/jsonld";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog, News and Insights: Luxora Glaze System Limited",
  description:
    "Project updates, product news and practical glazing advice from Luxora Glaze System Limited in Malindi, Kenya.",
};

// Re-check Sanity at most once a minute so newly published posts appear without a redeploy
export const revalidate = 60;

const POSTS_QUERY = `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt
}`;

export default async function BlogPage() {
  const posts = await client.fetch(POSTS_QUERY);

  return (
    <div>
      <Nav />
      <JsonLd data={[webPageLd({ type: "CollectionPage", name: metadata.title, description: metadata.description, path: "/blog" }), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Blog / News & Insight", path: "/blog" }])]} />
      {/* PAGE HEADER */}
      <div className="relative bg-char px-5 md:px-15 pt-20 md:pt-24 pb-14 md:pb-16 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(201,168,76,0.03) 59px, rgba(201,168,76,0.03) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(201,168,76,0.03) 59px, rgba(201,168,76,0.03) 60px)",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-gold mb-4">
            <Link href="/" className="text-dim hover:text-gold transition-colors">
              Home
            </Link>
            <span>›</span>
            <span>Blog / News & Insight</span>
          </div>
          <h1 className="font-serif font-light text-white leading-[1.05] mb-4 text-[clamp(36px,5vw,64px)]">
            News & <em className="text-gold not-italic">Insights</em>
          </h1>
          <p className="text-[15px] text-silver max-w-140 leading-[1.85]">
            Project updates, product launches, and glazing insights.
          </p>
        </div>
      </div>

      {/* POSTS GRID */}
      <div className="px-5 md:px-15 py-16 md:py-24">
        {posts.length === 0 ? (
          <p className="text-[13px] italic tracking-wide text-center text-dim">
            Blog posts coming soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-260 mx-auto">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className={`group bg-card overflow-hidden flex flex-col transition-colors duration-300 hover:bg-[#202020] ${
                  post.mainImage ? "" : "border-t-2 border-gold"
                }`}
              >
                {post.mainImage && (
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-black">
                    <img
                      src={compressedImage(post.mainImage, 600, 450)}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 md:p-7 flex-1">
                  <h3 className="font-serif text-[20px] text-white mb-2.5">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-[13px] text-silver leading-[1.8] mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase inline-flex items-center justify-center gap-2 px-5 py-3 w-fit transition-all duration-300 group-hover:bg-gold-lt">
                    Read More <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* NEWSLETTER */}
      <div className="px-5 md:px-15 pb-20 md:pb-28">
        <div className="max-w-110 mx-auto">
          <NewsletterSignup compact />
        </div>
      </div>
    </div>
  );
}
