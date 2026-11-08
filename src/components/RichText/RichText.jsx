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

function renderChildren(block) {
  const linksByKey = new Map(block.markDefs.map((def) => [def._key, def.href]));
  return block.children.map((span) => <span key={span._key}>{renderSpan(span, linksByKey)}</span>);
}

/** Groups consecutive bullet blocks into one list: [p, [li, li], p]. */
function groupBlocks(blocks) {
  return blocks.reduce((groups, block) => {
    const last = groups.at(-1);
    if (block.listItem === 'bullet') {
      if (Array.isArray(last)) last.push(block);
      else groups.push([block]);
    } else {
      groups.push(block);
    }
    return groups;
  }, []);
}

/**
 * Renders short Sanity rich text (Portable Text: paragraphs, bullet lists, bold, links).
 * Builds React elements only (no HTML strings), so content can't inject markup.
 */
export default function RichText({ blocks = [], className = '' }) {
  return (
    <div className={`rich-text ${className}`}>
      {groupBlocks(blocks).map((group) =>
        Array.isArray(group) ? (
          <ul key={group[0]._key}>
            {group.map((block) => (
              <li key={block._key}>{renderChildren(block)}</li>
            ))}
          </ul>
        ) : (
          <p key={group._key}>{renderChildren(group)}</p>
        ),
      )}
    </div>
  );
}
