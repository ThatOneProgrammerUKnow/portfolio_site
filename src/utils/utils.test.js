import { describe, expect, it } from 'vitest';
import { getSiteLink, isDownload, isExternal, joinMeta, resolveLink } from './links';
import { orbCurveOffset } from './orbCurve';
import { findProjectWithDetail } from './projects';

describe('links', () => {
  it('detects external, download and mailto links', () => {
    expect(isExternal('https://github.com/x')).toBe(true);
    expect(isExternal('/about')).toBe(false);
    expect(isExternal('mailto:a@b.co')).toBe(false);
    expect(isDownload('/cv/file.pdf')).toBe(true);
    expect(isDownload('/projects')).toBe(false);
  });

  it('resolves content links to SmartLink props', () => {
    expect(resolveLink({ to: '/projects' })).toEqual({ to: '/projects' });
    expect(resolveLink({ linkKey: 'cv' })).toEqual({ href: getSiteLink('cv').href });
  });

  it('throws on an unknown site link key', () => {
    expect(() => getSiteLink('nope')).toThrow(/Unknown site link/);
  });

  it('joins meta items with a middle dot', () => {
    expect(joinMeta(['OrbTech', 'In progress'])).toBe('OrbTech · In progress');
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

describe('findProjectWithDetail', () => {
  it('finds projects that have a case study only', () => {
    expect(findProjectWithDetail('budget-tracker')?.title).toBe('Budget Tracker');
    expect(findProjectWithDetail('brighthire')).toBeUndefined();
    expect(findProjectWithDetail('missing')).toBeUndefined();
  });
});
