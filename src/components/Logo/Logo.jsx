import { Link } from 'react-router';
import site from '../../content/site.json';
import './Logo.css';

export default function Logo() {
  return (
    <Link to="/" className="logo">
      <span className="logo__dot" aria-hidden="true" />
      {site.name}
    </Link>
  );
}
