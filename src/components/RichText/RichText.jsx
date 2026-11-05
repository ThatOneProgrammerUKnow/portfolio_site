import SmartLink from '../SmartLink/SmartLink';
import { isSafeHref } from '../../utils/links';
import './RichText.css';

/** Wraps one span's text in its marks: "strong" → <strong>, a link mark → <SmartLink>. */
function renderSpan(span, linksByKey) {
  return span.marks.reduce((node, mark) => {
    if (mark === 'strong') return <strong>{node}</strong>;
    const href = linksByKey.get(mark);
    // Unknown marks and unsafe URLs (anything but https: / mailto:) render as plain text.
    return isSafeHref(href) ? <SmartLink href={href}>{node}</SmartLink> : node;
  }, span.text);
}

/**
 * Renders short Sanity rich text (Portable Text blocks with bold + links) as paragraphs.
 * Builds React elements only (no HTML strings), so content can't inject markup.
 */
export default function RichText({ blocks = [], className = '' }) {
  return (
    <div className={`rich-text ${className}`}>
      {blocks.map((block) => {
        const linksByKey = new Map(block.markDefs.map((def) => [def._key, def.href]));
        return (
          <p key={block._key}>
            {block.children.map((span) => (
              <span key={span._key}>{renderSpan(span, linksByKey)}</span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
