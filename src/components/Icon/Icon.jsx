import './Icon.css';

const PATHS = {
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  'arrow-left': 'M19 12H5M11 18l-6-6 6-6',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
};

/** Decorative 24px stroke icon (design.md: 2px stroke, round caps). */
export default function Icon({ name, size = 24, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
