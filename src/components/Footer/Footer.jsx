import site from '../../content/site.json';
import { getSiteLink } from '../../utils/links';
import SmartLink from '../SmartLink/SmartLink';
import './Footer.css';

export default function Footer() {
  const { footer } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          © {year} {site.name}
        </p>
        <p className="footer__quote">
          {footer.quote} · {footer.reference}
        </p>
        <ul className="footer__links" role="list">
          {footer.linkKeys.map((key) => {
            const link = getSiteLink(key);
            return (
              <li key={key}>
                <SmartLink href={link.href}>{link.label}</SmartLink>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
