import { describe, expect, it } from 'vitest';
import { getSiteLink, isDownload, isExternal, isSafeHref, joinMeta, resolveLink } from './links';
import { imageUrl } from './images';
import { orbCurveOffset } from './orbCurve';
import { site } from '../test/fixtures';

describe('links', () => {
  it('detects external, download and mailto links', () => {
    expect(isExternal('https://github.com/x')).toBe(true);
    expect(isExternal('/about')).toBe(false);
    expect(isExternal('mailto:a@b.co')).toBe(false);
    expect(isDownload('/cv/file.pdf')).toBe(true);
    expect(isDownload('https://cdn.sanity.io/files/p/d/abc.pdf?dl=cv.pdf')).toBe(true);
    expect(isDownload('/projects')).toBe(false);
  });

  it('only allows https and mailto links from rich text', () => {
    expect(isSafeHref('https://example.com')).toBe(true);
    expect(isSafeHref('mailto:a@b.co')).toBe(true);
    expect(isSafeHref('javascript:alert(1)')).toBe(false);
    expect(isSafeHref('http://example.com')).toBe(false);
    expect(isSafeHref(undefined)).toBe(false);
  });

  it('resolves content links to SmartLink props', () => {
    expect(resolveLink({ to: '/projects' }, site.links)).toEqual({ to: '/projects' });
    expect(resolveLink({ to: null, linkKey: 'cv' }, site.links)).toEqual({ href: site.links.cv.href });
  });

  it('throws on an unknown site link key', () => {
    expect(() => getSiteLink(site.links, 'nope')).toThrow(/Unknown site link/);
  });

  it('joins meta items with a middle dot', () => {
    expect(joinMeta(['OrbTech', 'In progress'])).toBe('OrbTech · In progress');
  });
});

describe('imageUrl', () => {
  it('asks Sanity for a 2× sized, modern-format image', () => {
    expect(imageUrl('https://cdn.sanity.io/images/p/d/abc-800x600.jpg', 300)).toBe(
      'https://cdn.sanity.io/images/p/d/abc-800x600.jpg?auto=format&fit=max&w=600',
    );
  });

  it('leaves other URLs alone', () => {
    expect(imageUrl('/local.webp', 300)).toBe('/local.webp');
  });
});

describe('orbCurveOffset', () => {
  it('curves the pills: ends aligned, middle furthest left', () => {
    const offsets = [0, 1, 2, 3, 4].map((i) => orbCurveOffset(i, 5));
    expect(offsets[0]).toBe(-0);
    expect(offsets[4]).toBe(-0);
    expect(offsets[2]).toBe(-48);
    expect(offsets[1]).toBe(offsets[3]);
  });

  it('returns 0 for a single item', () => {
    expect(orbCurveOffset(0, 1)).toBe(0);
  });
});
