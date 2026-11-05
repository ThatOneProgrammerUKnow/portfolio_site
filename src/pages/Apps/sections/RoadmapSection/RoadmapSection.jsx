import Reveal from '../../../../components/Reveal/Reveal';
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import './RoadmapSection.css';

export default function RoadmapSection({ content }) {
  return (
    <section className="roadmap">
      <div className="container">
        <Reveal className="roadmap__panel">
          <SectionHeader eyebrow={content.eyebrow} title={content.title} className="roadmap__intro">
            <p className="muted">{content.text}</p>
          </SectionHeader>
          <ol className="roadmap__list" role="list">
            {content.items.map((item) => (
              <li key={item._key} className={`roadmap__item roadmap__item--${item.status}`}>
                <p className="mono muted">{item.label}</p>
                <p className="roadmap__item-title">{item.title}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
