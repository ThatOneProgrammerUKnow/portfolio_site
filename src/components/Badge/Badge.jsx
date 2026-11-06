import './Badge.css';

/** White pill with a blue dot and a mono label (Home hero, Apps header). */
export default function Badge({ className = '', children }) {
  return (
    <p className={`badge ${className}`}>
      <span className="badge__dot" aria-hidden="true" />
      {children}
    </p>
  );
}
