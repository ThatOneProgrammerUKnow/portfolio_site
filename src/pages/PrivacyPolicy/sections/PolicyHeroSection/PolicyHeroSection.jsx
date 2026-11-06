import { formatDate } from '../../../../utils/dates';
import './PolicyHeroSection.css';

export default function PolicyHeroSection({ policy }) {
  return (
    <section className="policy-hero">
      <div className="container policy-hero__inner">
        <p className="eyebrow">{policy.eyebrow}</p>
        <h1 className="h2 policy-hero__title">{policy.title}</h1>
        <p className="mono muted policy-hero__date">
          {policy.lastUpdatedLabel}: <time dateTime={policy.lastUpdated}>{formatDate(policy.lastUpdated)}</time> ·{' '}
          {policy.version}
        </p>
      </div>
    </section>
  );
}
