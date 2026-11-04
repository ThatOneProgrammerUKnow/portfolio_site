import Headline from '../../../../components/Headline/Headline';
import './AppsHeroSection.css';

export default function AppsHeroSection({ content }) {
  return (
    <section className="apps-hero">
      <div className="container">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 className="display apps-hero__title">
          <Headline title={content.title} />
        </h1>
        <p className="lead apps-hero__lead">{content.lead}</p>
      </div>
    </section>
  );
}
