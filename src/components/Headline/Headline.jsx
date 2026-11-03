/** Renders a content title of the shape { before, highlight, after } with the blue highlight. */
export default function Headline({ title }) {
  return (
    <>
      {title.before}
      {title.highlight && <span className="highlight">{title.highlight}</span>}
      {title.after}
    </>
  );
}
