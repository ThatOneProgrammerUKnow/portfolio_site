import { ArrowRight } from 'lucide-react';
import SmartLink from '../../../../components/SmartLink/SmartLink';
import './ReadMoreSection.css';

/** Big blue link to the app's case study. */
export default function ReadMoreSection({ content, app }) {
  return (
    <section className="read-more">
      <div className="container">
        <SmartLink to={app.to} className="read-more__card lift">
          <span className="read-more__text">
            <span className="read-more__eyebrow">{content.eyebrow}</span>
            <span className="read-more__title">{content.label}</span>
          </span>
          <span className="read-more__arrow" aria-hidden="true">
            <ArrowRight />
          </span>
        </SmartLink>
      </div>
    </section>
  );
}
