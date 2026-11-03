import { describe, expect, it } from 'vitest';
import site from './site.json';
import home from './home.json';
import projects from './projects.json';
import contact from './contact.json';
import about from './about.json';

const slugs = projects.projects.map((project) => project.slug);
const linkKeys = Object.keys(site.links);

function internalTargetExists(to) {
  const [path, hash] = to.split('#');
  if (path === '/projects' && hash) return slugs.includes(hash);
  if (path.startsWith('/projects/')) return Boolean(projects.projects.find((p) => `/projects/${p.slug}` === path && p.detail));
  return ['/', '/about', '/projects', '/contact'].includes(path);
}

describe('content integrity', () => {
  it('has unique project slugs', () => {
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('only links to pages and anchors that exist', () => {
    const targets = [
      ...home.selectedWork.projects.map((p) => p.to),
      home.selectedWork.allLink.to,
      home.hero.primaryCta.to,
      ...projects.projects.filter((p) => p.detail).map((p) => p.detail.next.to),
      ...site.nav.items.filter((item) => item.to).map((item) => item.to),
    ];
    targets.forEach((to) => expect(internalTargetExists(to), to).toBe(true));
  });

  it('only references site links that are defined', () => {
    const keys = [
      ...site.nav.items.filter((item) => item.linkKey).map((item) => item.linkKey),
      ...site.footer.linkKeys,
      home.hero.secondaryCta.linkKey,
      about.hero.cta.linkKey,
      ...contact.cards.filter((card) => card.link).map((card) => card.link.linkKey),
    ];
    keys.forEach((key) => expect(linkKeys, key).toContain(key));
  });

  it('uses HTTPS for every external link', () => {
    const external = [...Object.values(site.links).map((l) => l.href), about.leadership.link.href].filter((href) =>
      /^[a-z]+:\/\//i.test(href),
    );
    external.forEach((href) => expect(href.startsWith('https://'), href).toBe(true));
  });
});
