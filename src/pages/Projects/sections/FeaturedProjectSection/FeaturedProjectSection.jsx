import ButtonLink from '../../../../components/ButtonLink/ButtonLink';
import ImageSlot from '../../../../components/ImageSlot/ImageSlot';
import Reveal from '../../../../components/Reveal/Reveal';
import { joinMeta } from '../../../../utils/links';
import './FeaturedProjectSection.css';

export default function FeaturedProjectSection({ project, ctaLabel }) {
  return (
    <section className="featured-project" id={project.slug}>
      <div className="container">
        <Reveal className="featured-project__panel">
          <div className="featured-project__text">
            <p className="featured-project__meta">{joinMeta([project.featuredLabel, ...project.meta])}</p>
            <h2 className="featured-project__title">{project.title}</h2>
            <p className="featured-project__summary">{project.summary}</p>
            <p className="featured-project__meta">{joinMeta(project.stack)}</p>
            {project.detail && (
              <ButtonLink variant="secondary" to={`/projects/${project.slug}`} icon="arrow-right" className="featured-project__cta">
                {ctaLabel}
              </ButtonLink>
            )}
          </div>
          <div className="featured-project__phones">
            {project.images.map((image, index) => (
              <ImageSlot key={index} image={image} className="featured-project__phone" width={160} height={340} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
