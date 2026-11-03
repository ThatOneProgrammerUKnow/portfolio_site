import ImageSlot from '../../../../components/ImageSlot/ImageSlot';
import Reveal from '../../../../components/Reveal/Reveal';
import { joinMeta } from '../../../../utils/links';
import './ProjectGridSection.css';

export default function ProjectGridSection({ projects }) {
  return (
    <section className="project-grid">
      <div className="container">
        <ul className="project-grid__list" role="list">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.slug} id={project.slug} className="project-card lift" delay={(index % 2) * 0.06}>
              <ImageSlot image={project.images[0]} className="project-card__image" width={420} height={230} />
              <p className="mono highlight project-card__meta">{joinMeta(project.meta)}</p>
              <h2 className="project-card__title">{project.title}</h2>
              <p className="muted">{project.summary}</p>
              <p className="mono muted project-card__stack">{joinMeta(project.stack)}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
