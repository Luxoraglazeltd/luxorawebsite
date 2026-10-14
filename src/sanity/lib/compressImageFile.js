// Shrinks a photo in the browser before it is uploaded to Sanity, so the
// original multi-megabyte file is never stored.
const MAX_SIDE = 2000; // longest edge in pixels; plenty for full-width site images
const QUALITY = 0.82;
const SKIP_UNDER_BYTES = 300 * 1024;

export async function compressImageFile(file) {
  // Leave non-photo formats (SVG, GIF) untouched
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return file;

  // 'from-image' applies the phone's rotation so photos are not saved sideways
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));

  if (scale === 1 && file.size <= SKIP_UNDER_BYTES) {
    bitmap.close();
    return file;
  }

  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", QUALITY));

  // If re-encoding somehow made it bigger, keep the original
  if (!blob || blob.size >= file.size) return file;

  const baseName = file.name.replace(/\.[^.]+$/, "") || "photo";
  return new File([blob], `${baseName}.webp`, { type: "image/webp" });
}
