import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import SmartLink from '../../../../components/SmartLink/SmartLink';
import ImageSlot from '../../../../components/ImageSlot/ImageSlot';
import Icon from '../../../../components/Icon/Icon';
import Reveal from '../../../../components/Reveal/Reveal';
import { joinMeta } from '../../../../utils/links';
import './SelectedWorkSection.css';

function ProjectRow({ project }) {
  return (
    <article className="project-row lift">
      <ImageSlot image={project.image} className="project-row__image" width={150} height={112} />
      <div className="project-row__main">
        <p className="mono project-row__meta">{joinMeta(project.meta)}</p>
        <h3 className="project-row__title">
          <SmartLink to={project.to} className="project-row__link">
            {project.title}
          </SmartLink>
        </h3>
        <p className="muted project-row__text">{project.text}</p>
      </div>
      <p className="mono muted project-row__stack">{joinMeta(project.stack)}</p>
      <span className="project-row__arrow" aria-hidden="true">
        <Icon name="arrow-up-right" size={18} />
      </span>
    </article>
  );
}

export default function SelectedWorkSection({ content }) {
  return (
    <section className="section selected-work">
      <div className="container">
        <Reveal className="selected-work__header">
          <SectionHeader eyebrow={content.eyebrow} title={content.title} />
          <SmartLink to={content.allLink.to} className="selected-work__all">
            {content.allLink.label}
            <Icon name="arrow-right" size={18} />
          </SmartLink>
        </Reveal>

        <ul className="selected-work__list" role="list">
          {content.projects.map((project, index) => (
            <Reveal as="li" key={project.title} delay={index * 0.06}>
              <ProjectRow project={project} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
