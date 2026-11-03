import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import Reveal from '../../../../components/Reveal/Reveal';
import './ExperienceSection.css';

export default function ExperienceSection({ content }) {
  return (
    <section className="section section--surface experience">
      <div className="container experience__inner">
        <SectionHeader eyebrow={content.eyebrow} title={content.title} className="experience__header" />

        <ol className="timeline" role="list">
          {content.roles.map((item) => (
            <Reveal as="li" key={`${item.role}-${item.company}`} className={`timeline__item${item.current ? ' is-current' : ''}`}>
              <p className="mono muted">{item.period}</p>
              <h3 className="timeline__title">
                {item.role} · <span className="highlight">{item.company}</span>
              </h3>
              {item.bullets ? (
                <ul className="timeline__bullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : (
                <p className="muted timeline__text">{item.text}</p>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
