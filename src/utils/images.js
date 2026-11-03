/**
 * Sized, modern-format URL for a Sanity CDN image (sanity.io/docs/apis-and-sdks/image-urls).
 * Requests 2× the slot width for sharp retina screens; `auto=format` serves WebP/AVIF.
 * Other URLs are returned unchanged.
 */
export function imageUrl(src, width) {
  if (!src?.startsWith('https://cdn.sanity.io/')) return src;
  const params = new URLSearchParams({ auto: 'format', fit: 'max' });
  if (width) params.set('w', String(width * 2));
  return `${src}?${params}`;
}
