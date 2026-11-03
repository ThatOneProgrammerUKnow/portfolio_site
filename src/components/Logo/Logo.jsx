import { Link } from 'react-router';
import './Logo.css';

export default function Logo({ name }) {
  return (
    <Link to="/" className="logo">
      <span className="logo__dot" aria-hidden="true" />
      {name}
    </Link>
  );
}
