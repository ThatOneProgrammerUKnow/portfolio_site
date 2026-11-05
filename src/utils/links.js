/** Looks up a shared link (GitHub, LinkedIn, Email, CV) from Site settings' `links`. */
export function getSiteLink(links, key) {
  const link = links?.[key];
  if (!link) throw new Error(`Unknown site link: "${key}"`);
  return link;
}

/** Turns a content link ({ to } or { linkKey }) into props for SmartLink. */
export function resolveLink({ to, linkKey, href }, links) {
  if (to) return { to };
  if (linkKey) return { href: getSiteLink(links, linkKey).href };
  return { href };
}

export function isExternal(href = '') {
  return /^https?:\/\//i.test(href);
}

/** PDFs, including Sanity file URLs with a ?dl= (force download) parameter. */
export function isDownload(href = '') {
  return /\.pdf($|\?)/i.test(href);
}

/** Links from rich text: only https: and mailto: (never javascript: or data:). */
export function isSafeHref(href = '') {
  return /^(https:\/\/|mailto:)/i.test(href);
}

/** Where a project's "Download app" button points: its card on the Apps page. */
export function appsHref(slug) {
  return `/apps#${slug}`;
}

export function joinMeta(items) {
  return items.join(' · ');
}
