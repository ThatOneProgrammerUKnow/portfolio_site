import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildQueryUrl, sanityQuery } from './sanity';
import { getHomePage, getProjectDetail } from './content';

const okResponse = (result) => ({ ok: true, json: async () => ({ result }) });

beforeEach(() => {
  vi.stubEnv('VITE_SANITY_PROJECT_ID', 'testproj');
  vi.stubEnv('VITE_SANITY_DATASET', 'production');
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('sanity client', () => {
  it('queries the CDN for published content, with JSON-encoded params', () => {
    const url = new URL(buildQueryUrl('*[slug.current == $slug]', { slug: 'alpha' }));
    expect(url.origin).toBe('https://testproj.apicdn.sanity.io');
    expect(url.pathname).toMatch(/^\/v\d{4}-\d{2}-\d{2}\/data\/query\/production$/);
    expect(url.searchParams.get('query')).toBe('*[slug.current == $slug]');
    expect(url.searchParams.get('$slug')).toBe('"alpha"');
    expect(url.searchParams.get('perspective')).toBe('published');
  });

  it('never sends credentials', async () => {
    fetch.mockResolvedValue(okResponse(1));
    await sanityQuery('1');
    const [, init] = fetch.mock.calls[0];
    expect(init?.headers).toBeUndefined();
  });

  it('throws when the project ID is missing', () => {
    vi.stubEnv('VITE_SANITY_PROJECT_ID', '');
    expect(() => buildQueryUrl('*')).toThrow(/VITE_SANITY_PROJECT_ID/);
  });

  it('throws on an HTTP error', async () => {
    fetch.mockResolvedValue({ ok: false, status: 500 });
    await expect(sanityQuery('*')).rejects.toThrow(/500/);
  });
});

describe('content service', () => {
  it('returns page content', async () => {
    fetch.mockResolvedValue(okResponse({ hero: {} }));
    await expect(getHomePage()).resolves.toEqual({ hero: {} });
  });

  it('fails loudly when a page document is missing', async () => {
    fetch.mockResolvedValue(okResponse(null));
    await expect(getHomePage()).rejects.toThrow(/Home page/);
  });

  it('returns null for a project without a case study', async () => {
    fetch.mockResolvedValue(okResponse({ backLink: 'x', nextLabel: 'y', project: null }));
    await expect(getProjectDetail('beta')).resolves.toBeNull();
  });
});
