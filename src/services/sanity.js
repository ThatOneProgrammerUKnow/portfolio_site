// Minimal client for Sanity's HTTP query API (sanity.io/docs/http-reference/query).
// Read-only, no token: the CDN returns published content only. Never add a token here:
// everything in the front-end bundle is public.

const API_VERSION = 'v2025-02-19';

function getConfig() {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
  if (!projectId) throw new Error('VITE_SANITY_PROJECT_ID is not set (see .env.example).');
  return { projectId, dataset };
}

/** Builds the query URL. Params become GROQ variables ($slug → "&$slug=\"...\""). */
export function buildQueryUrl(query, params = {}) {
  const { projectId, dataset } = getConfig();
  const search = new URLSearchParams({ query, perspective: 'published' });
  Object.entries(params).forEach(([key, value]) => search.set(`$${key}`, JSON.stringify(value)));
  return `https://${projectId}.apicdn.sanity.io/${API_VERSION}/data/query/${dataset}?${search}`;
}

/** Runs a GROQ query and returns its result. Throws on network/HTTP errors. */
export async function sanityQuery(query, params, { signal } = {}) {
  const response = await fetch(buildQueryUrl(query, params), { signal });
  if (!response.ok) throw new Error(`Sanity query failed (${response.status})`);
  const { result } = await response.json();
  return result;
}
