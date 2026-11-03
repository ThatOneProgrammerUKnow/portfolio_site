import SmartLink from '../../../../components/SmartLink/SmartLink';
import { ArrowRight } from 'lucide-react';
import './NextProjectSection.css';

export default function NextProjectSection({ next, label }) {
  return (
    <section className="next-project">
      <div className="container">
        <SmartLink to={next.to} className="next-project__card lift">
          <span className="next-project__text">
            <span className="mono muted">{label}</span>
            <span className="next-project__title">{next.title}</span>
          </span>
          <span className="next-project__arrow" aria-hidden="true">
            <ArrowRight />
          </span>
        </SmartLink>
      </div>
    </section>
  );
}
