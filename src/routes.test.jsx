import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { routes } from './routes';
import * as content from './services/content';
import * as fixtures from './test/fixtures';

vi.mock('./services/content');

beforeEach(() => {
  vi.mocked(content.getSite).mockResolvedValue(fixtures.site);
  vi.mocked(content.getHomePage).mockResolvedValue(fixtures.home);
  vi.mocked(content.getAboutPage).mockResolvedValue(fixtures.about);
  vi.mocked(content.getProjectsPage).mockResolvedValue(fixtures.projectsPage);
  vi.mocked(content.getMyProductsPage).mockResolvedValue(fixtures.myProducts);
  vi.mocked(content.getContactPage).mockResolvedValue(fixtures.contact);
  vi.mocked(content.getPrivacyPolicy).mockImplementation(async (slug) =>
    slug === 'alpha' ? fixtures.privacyPolicy : null,
  );
  vi.mocked(content.getProjectDetail).mockImplementation(async (slug) =>
    slug === fixtures.projectDetail.project.slug ? fixtures.projectDetail : null,
  );
});

function renderAt(path) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return router;
}

async function findH1() {
  return screen.findByRole('heading', { level: 1 });
}

describe('routes', () => {
  it.each([
    ['/', /^Home title\.$/],
    ['/about', /^About title\.$/],
    ['/projects', /^Projects title\.$/],
    ['/projects/alpha', /^Alpha$/],
    ['/my-products', /^My products title\.$/],
    ['/my-products/alpha/privacy-policy', /^Alpha Privacy Policy$/],
    ['/contact', /^Contact title\.$/],
  ])('%s renders its page with exactly one h1', async (path, heading) => {
    renderAt(path);
    expect(await findH1()).toHaveTextContent(heading);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('redirects unknown URLs home', async () => {
    const router = renderAt('/does-not-exist');
    await findH1();
    expect(router.state.location.pathname).toBe('/');
  });

  it('redirects projects without a case study to the projects page', async () => {
    const router = renderAt('/projects/beta');
    await findH1();
    expect(router.state.location.pathname).toBe('/projects');
  });

  it('redirects the old /apps URL (and its #slug) to /my-products', async () => {
    const router = renderAt('/apps#alpha');
    await findH1();
    expect(router.state.location.pathname).toBe('/my-products');
    expect(router.state.location.hash).toBe('#alpha');
  });

  it('redirects a privacy policy URL for an unknown app to My products', async () => {
    const router = renderAt('/my-products/nope/privacy-policy');
    await findH1();
    expect(router.state.location.pathname).toBe('/my-products');
  });

  it('privacy policy shows the date, version and one heading per section', async () => {
    renderAt('/my-products/alpha/privacy-policy');
    await findH1();
    expect(screen.getByText('6 November 2026')).toHaveAttribute('datetime', '2026-11-06');
    expect(screen.getByText(/v1\.0/)).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual(['Your data', 'Your rights']);
    expect(document.title).toMatch(/^Alpha Privacy Policy · /);
  });

  it('home lists the selected projects as links', async () => {
    renderAt('/');
    await findH1();
    fixtures.home.selectedWork.projects.forEach((project) => {
      expect(screen.getByRole('link', { name: project.title })).toHaveAttribute('href', project.to);
    });
  });

  it('opens every external (non-download) link safely in a new tab', async () => {
    renderAt('/about');
    await findH1();
    const external = screen
      .getAllByRole('link')
      .filter((link) => /^https?:/.test(link.getAttribute('href')) && !link.hasAttribute('download'));
    expect(external.length).toBeGreaterThan(0);
    external.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('CV links download in place', async () => {
    renderAt('/about');
    await findH1();
    const cv = within(screen.getByRole('main')).getByRole('link', { name: /download cv/i });
    expect(cv).toHaveAttribute('href', fixtures.site.links.cv.href);
    expect(cv).toHaveAttribute('download');
    expect(cv).not.toHaveAttribute('target');
  });

  it('projects with a download link get a Download app button to My products', async () => {
    renderAt('/projects');
    await findH1();
    const buttons = screen.getAllByRole('link', { name: /download app/i });
    expect(buttons).toHaveLength(1); // only Alpha has a download link
    expect(buttons[0]).toHaveAttribute('href', '/my-products#alpha');
  });

  it('my products page: download button, numbered steps, rich text and link to the project', async () => {
    renderAt('/my-products');
    await findH1();
    const { app, card } = fixtures.myProducts;
    const section = document.getElementById(app.slug); // target of the Projects "Download app" button
    const download = within(section).getByRole('link', { name: card.downloadLabel });
    expect(download).toHaveAttribute('href', app.downloadUrl);
    expect(download).toHaveAttribute('rel', 'noopener noreferrer');
    expect(within(section).getAllByRole('heading', { level: 3 })).toHaveLength(2);
    expect(within(section).getByText('Download', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'me' })).toHaveAttribute('href', 'mailto:test@example.com');
    expect(screen.getByRole('link', { name: new RegExp(fixtures.myProducts.more.label) })).toHaveAttribute('href', app.to);
    expect(document.title).toMatch(/^My products · /);
  });

  it('contact page has an email button and social cards', async () => {
    renderAt('/contact');
    await findH1();
    const main = screen.getByRole('main');
    expect(within(main).getByRole('link', { name: fixtures.site.email })).toHaveAttribute(
      'href',
      fixtures.site.links.email.href,
    );
    expect(within(main).getByRole('link', { name: 'See my code' })).toHaveAttribute(
      'href',
      fixtures.site.links.github.href,
    );
  });

  it('has a skip link to the main content', async () => {
    renderAt('/');
    await findH1();
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main');
  });

  it('shows the error page when content cannot be loaded', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(content.getHomePage).mockRejectedValue(new Error('Sanity query failed (500)'));
    renderAt('/');
    expect(await findH1()).toHaveTextContent(/couldn't load/i);
    expect(screen.getByRole('link', { name: /try again/i })).toHaveAttribute('href', '/');
  });
});
