import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import OrbNav from './OrbNav';
import { site } from '../../test/fixtures';

function renderNav(path = '/') {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={[path]}>
      <OrbNav nav={site.nav} links={site.links} />
      <button type="button">Outside</button>
    </MemoryRouter>,
  );
  return { user, toggle: screen.getByRole('button', { name: site.nav.openLabel }) };
}

describe('OrbNav', () => {
  it('is a real toggle button with aria-expanded', async () => {
    const { user, toggle } = renderNav();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', { name: /about/i })).not.toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAccessibleName(site.nav.closeLabel);
    expect(screen.getAllByRole('listitem')).toHaveLength(site.nav.items.length);
  });

  it('shows a burger icon when closed and an X when open, hidden from screen readers', async () => {
    const { user, toggle } = renderNav();
    const burger = toggle.querySelector('svg.lucide-menu');
    expect(burger).toBeInTheDocument();
    expect(burger).toHaveAttribute('aria-hidden', 'true');

    await user.click(toggle);
    expect(toggle.querySelector('svg.lucide-x')).toBeInTheDocument();
    expect(toggle.querySelector('svg.lucide-menu')).not.toBeInTheDocument();
  });

  it('marks the current page', async () => {
    const { user, toggle } = renderNav('/about');
    await user.click(toggle);
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /home/i })).not.toHaveAttribute('aria-current');
  });

  it('keeps Projects active on a project detail page', async () => {
    const { user, toggle } = renderNav('/projects/funds-view');
    await user.click(toggle);
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('aria-current', 'page');
  });

  it('closes on Escape and returns focus to the orb', async () => {
    const { user, toggle } = renderNav();
    await user.click(toggle);
    await user.tab();
    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
  });

  it('closes when a link is clicked', async () => {
    const { user, toggle } = renderNav();
    await user.click(toggle);
    await user.click(screen.getByRole('link', { name: /about/i }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await waitFor(() => expect(screen.queryByRole('link', { name: /about/i })).not.toBeInTheDocument());
  });

  it('traps focus while open', async () => {
    const { user, toggle } = renderNav();
    await user.click(toggle);
    const links = screen.getAllByRole('link');

    // Tab through every link, then once more wraps back to the orb
    for (let i = 0; i < links.length; i += 1) await user.tab();
    expect(links.at(-1)).toHaveFocus();
    await user.tab();
    expect(toggle).toHaveFocus();

    // Shift+Tab from the orb wraps to the last link
    await user.tab({ shift: true });
    expect(links.at(-1)).toHaveFocus();
  });

  it('closes when clicking outside', async () => {
    const { user, toggle } = renderNav();
    await user.click(toggle);
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('offers the CV as a download', async () => {
    const { user, toggle } = renderNav();
    await user.click(toggle);
    const cv = screen.getByRole('link', { name: /download cv/i });
    expect(cv).toHaveAttribute('href', site.links.cv.href);
    expect(cv).toHaveAttribute('download');
  });
});
