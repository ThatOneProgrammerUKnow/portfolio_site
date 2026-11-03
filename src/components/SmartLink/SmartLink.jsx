import { Link } from 'react-router';
import { isDownload, isExternal } from '../../utils/links';

/**
 * One link component for every kind of destination:
 * internal routes (React Router), external sites (new tab, safe rel),
 * downloads (CV PDF) and mailto links.
 */
export default function SmartLink({ to, href, children, ...rest }) {
  if (to) {
    return (
      <Link to={to} {...rest}>
        {children}
      </Link>
    );
  }

  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} download={isDownload(href) || undefined} {...rest}>
      {children}
    </a>
  );
}
