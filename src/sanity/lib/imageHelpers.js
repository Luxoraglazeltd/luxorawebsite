import { urlFor } from "./image";

/**
 * Returns a compressed, optimized image URL from a Sanity image reference.
 * - quality(75): strong compression with negligible visible quality loss
 * - auto('format'): serves WebP/AVIF to browsers that support it, falling
 *   back to JPEG automatically — this is the single biggest size reduction
 * - fit('crop'): ensures the requested width/height is respected cleanly
 */
export function compressedImage(source, width, height) {
  let builder = urlFor(source).width(width).quality(75).auto("format");
  if (height) {
    builder = builder.height(height).fit("crop");
  }
  return builder.url();
}
