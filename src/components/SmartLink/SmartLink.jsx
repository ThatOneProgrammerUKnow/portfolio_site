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

  // Downloads first: the CV lives on Sanity's CDN, whose ?dl= parameter makes the
  // browser download it in place (the download attribute is ignored cross-origin).
  if (isDownload(href)) {
    return (
      <a href={href} download {...rest}>
        {children}
      </a>
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
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
