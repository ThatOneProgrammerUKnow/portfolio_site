import site from '../content/site.json';

/** Looks up a shared link (GitHub, LinkedIn, Email, CV) defined once in site.json. */
export function getSiteLink(key) {
  const link = site.links[key];
  if (!link) throw new Error(`Unknown site link: "${key}"`);
  return link;
}

/** Turns a content link ({ to } or { linkKey }) into props for SmartLink. */
export function resolveLink({ to, linkKey, href }) {
  if (to) return { to };
  if (linkKey) return { href: getSiteLink(linkKey).href };
  return { href };
}

export function isExternal(href = '') {
  return /^https?:\/\//i.test(href);
}

export function isDownload(href = '') {
  return /\.pdf$/i.test(href);
}

export function joinMeta(items) {
  return items.join(' · ');
}
