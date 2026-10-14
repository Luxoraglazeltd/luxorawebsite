// Renders one or more JSON-LD blocks. "<" is escaped so content can never close the script tag.
export default function JsonLd({ data }) {
  const blocks = Array.isArray(data) ? data : [data];
  return blocks.map((block, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(block).replace(/</g, "\\u003c"),
      }}
    />
  ));
}
