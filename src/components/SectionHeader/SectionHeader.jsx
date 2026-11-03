import './SectionHeader.css';

/** Mono eyebrow label above a heading (design.md: eyebrow above every H2). */
export default function SectionHeader({ eyebrow, title, as: Heading = 'h2', headingClass = 'h2', className = '', children }) {
  return (
    <div className={`section-header ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading className={headingClass}>{title}</Heading>
      {children}
    </div>
  );
}
