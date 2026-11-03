import Reveal from '../../../../components/Reveal/Reveal';
import './RightNowSection.css';

export default function RightNowSection({ content }) {
  return (
    <section className="right-now">
      <div className="container">
        <Reveal className="right-now__panel">
          <div className="right-now__intro">
            <p className="right-now__eyebrow">{content.eyebrow}</p>
            <h2 className="h2 right-now__title">{content.title}</h2>
          </div>
          <dl className="right-now__items">
            {content.items.map((item) => (
              <div key={item.label} className="right-now__item">
                <dt className="right-now__label">{item.label}</dt>
                <dd className="right-now__text">{item.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
