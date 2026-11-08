import { ArrowRight, Download } from 'lucide-react';
import ButtonLink from '../../../../components/ButtonLink/ButtonLink';
import ImageSlot from '../../../../components/ImageSlot/ImageSlot';
import Reveal from '../../../../components/Reveal/Reveal';
import { myProductsHref, joinMeta } from '../../../../utils/links';
import './FeaturedProjectSection.css';

export default function FeaturedProjectSection({ project, ctaLabel, downloadLabel }) {
  return (
    <section className="featured-project" id={project.slug}>
      <div className="container">
        <Reveal className="featured-project__panel">
          <div className="featured-project__text">
            <p className="featured-project__meta">{joinMeta([project.featuredLabel, ...project.meta])}</p>
            <h2 className="featured-project__title">{project.title}</h2>
            <p className="featured-project__summary">{project.summary}</p>
            <p className="featured-project__meta">{joinMeta(project.stack)}</p>
            {(project.detail || project.downloadUrl) && (
              <div className="featured-project__actions">
                {project.detail && (
                  <ButtonLink variant="secondary" to={`/projects/${project.slug}`} icon={ArrowRight} className="featured-project__cta">
                    {ctaLabel}
                  </ButtonLink>
                )}
                {project.downloadUrl && (
                  <ButtonLink variant="secondary" size="sm" to={myProductsHref(project.slug)} icon={Download} className="featured-project__download">
                    {downloadLabel}
                  </ButtonLink>
                )}
              </div>
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
