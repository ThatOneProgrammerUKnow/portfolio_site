import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import RichText from './RichText';

const block = (children, markDefs = []) => ({
  _key: 'b',
  children: children.map(([text, marks = []], i) => ({ _key: String(i), text, marks })),
  markDefs,
});

describe('RichText', () => {
  it('renders paragraphs with bold text and safe links', () => {
    const markDefs = [{ _key: 'l', _type: 'link', href: 'https://example.com' }];
    render(<RichText blocks={[block([['Tap '], ['Install', ['strong']], [' or '], ['read more', ['l']]], markDefs)]} />);
    expect(screen.getByText('Install', { selector: 'strong' })).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'read more' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders unsafe or unknown links as plain text', () => {
    const markDefs = [{ _key: 'x', _type: 'link', href: 'javascript:alert(1)' }];
    render(<RichText blocks={[block([['click', ['x']], [' here', ['missing']]], markDefs)]} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('click')).toBeInTheDocument();
  });
});
