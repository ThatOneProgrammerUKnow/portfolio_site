import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { routes } from './routes';
import home from './content/home.json';

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
    ['/', /I spot the problem, pitch the fix, and get it done\./],
    ['/about', /I found software by fixing things\./],
    ['/projects', /Problems I spotted, and what I built for them\./],
    ['/projects/budget-tracker', /^Budget Tracker$/],
    ['/contact', /Let's talk\./],
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
    const router = renderAt('/projects/brighthire');
    await findH1();
    expect(router.state.location.pathname).toBe('/projects');
  });

  it('home lists the selected projects as links', async () => {
    renderAt('/');
    await findH1();
    home.selectedWork.projects.forEach((project) => {
      expect(screen.getByRole('link', { name: project.title })).toHaveAttribute('href', project.to);
    });
  });

  it('opens every external link safely in a new tab', async () => {
    renderAt('/about');
    await findH1();
    const external = screen.getAllByRole('link').filter((link) => /^https?:/.test(link.getAttribute('href')));
    expect(external.length).toBeGreaterThan(0);
    external.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('contact page has an email button and social cards', async () => {
    renderAt('/contact');
    await findH1();
    const main = screen.getByRole('main');
    expect(within(main).getByRole('link', { name: /kobus\.vs\.2006@gmail\.com/ })).toHaveAttribute(
      'href',
      'mailto:kobus.vs.2006@gmail.com',
    );
    expect(within(main).getByRole('link', { name: 'See my code' })).toHaveAttribute(
      'href',
      'https://github.com/ThatOneProgrammerUKnow',
    );
  });

  it('has a skip link to the main content', async () => {
    renderAt('/');
    await findH1();
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main');
  });
});
