import Headline from '../../../../components/Headline/Headline';
import './ProjectsHeroSection.css';

export default function ProjectsHeroSection({ content }) {
  return (
    <section className="projects-hero">
      <div className="container">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 className="display projects-hero__title">
          <Headline title={content.title} />
        </h1>
        <p className="lead projects-hero__lead">{content.lead}</p>
      </div>
    </section>
  );
}
