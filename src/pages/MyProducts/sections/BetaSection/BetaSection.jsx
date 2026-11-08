import Reveal from '../../../../components/Reveal/Reveal';
import RichText from '../../../../components/RichText/RichText';
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import './BetaSection.css';

export default function BetaSection({ content }) {
  return (
    <section className="section beta">
      <div className="container">
        <SectionHeader eyebrow={content.eyebrow} title={content.title} />
        <ul className="beta__cards" role="list">
          {content.cards.map((card, index) => (
            <Reveal as="li" key={card._key} className="beta__card" delay={index * 0.06}>
              <h3 className="beta__card-title">{card.title}</h3>
              <RichText blocks={card.text} className="muted beta__card-text" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
