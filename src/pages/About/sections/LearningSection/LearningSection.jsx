import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import Reveal from '../../../../components/Reveal/Reveal';
import './LearningSection.css';

export default function LearningSection({ learning, techStack }) {
  return (
    <section className="section section--flush-top learning">
      <div className="container learning__inner">
        <Reveal>
          <SectionHeader eyebrow={learning.eyebrow} title={learning.title} />
          <ul className="learning__list" role="list">
            {learning.items.map((item) => (
              <li key={item.title} className="learning__item">
                <h3 className="learning__item-title">{item.title}</h3>
                <p className="muted learning__item-detail">{item.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeader eyebrow={techStack.eyebrow} title={techStack.title} />
          <div className="tech-stack">
            {techStack.groups.map((group) => (
              <div key={group.label} className="tech-stack__group">
                <h3 className="mono muted tech-stack__label">{group.label}</h3>
                <ul className="tech-stack__chips" role="list">
                  {group.items.map((item) => (
                    <li key={item} className="tech-stack__chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
