import SmartLink from '../../../../components/SmartLink/SmartLink';
import Icon from '../../../../components/Icon/Icon';
import { joinMeta } from '../../../../utils/links';
import './ProjectHeaderSection.css';

export default function ProjectHeaderSection({ project, backLabel }) {
  return (
    <section className="project-header">
      <div className="container">
        <SmartLink to="/projects" className="project-header__back">
          <Icon name="arrow-left" size={18} />
          {backLabel}
        </SmartLink>
        <p className="eyebrow project-header__meta">{joinMeta(project.meta)}</p>
        <h1 className="display project-header__title">{project.title}</h1>
        <p className="lead project-header__summary">{project.summary}</p>

        <dl className="project-header__facts">
          {project.detail.facts.map((fact) => (
            <div key={fact.label} className="project-header__fact">
              <dt className="mono muted">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
