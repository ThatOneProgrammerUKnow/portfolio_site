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
  vi.mocked(content.getAppsPage).mockResolvedValue(fixtures.apps);
  vi.mocked(content.getContactPage).mockResolvedValue(fixtures.contact);
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
    ['/apps', /^Apps title\.$/],
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

  it('projects with a download link get a Download app button to the Apps page', async () => {
    renderAt('/projects');
    await findH1();
    const buttons = screen.getAllByRole('link', { name: /download app/i });
    expect(buttons).toHaveLength(1); // only Alpha has a download link
    expect(buttons[0]).toHaveAttribute('href', '/apps#alpha');
  });

  it('apps page links each app to its download and its project', async () => {
    renderAt('/apps');
    await findH1();
    const [app] = fixtures.apps.apps;
    const card = document.getElementById(app.slug);
    const download = within(card).getByRole('link', { name: `Download ${app.title}` });
    expect(download).toHaveAttribute('href', app.downloadUrl);
    expect(download).toHaveAttribute('target', '_blank');
    expect(download).toHaveAttribute('rel', 'noopener noreferrer');
    expect(within(card).getByRole('link', { name: `View project ${app.title}` })).toHaveAttribute('href', app.to);
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
