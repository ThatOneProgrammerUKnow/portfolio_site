import SmartLink from '../../../../components/SmartLink/SmartLink';
import Reveal from '../../../../components/Reveal/Reveal';
import { resolveLink } from '../../../../utils/links';
import useSite from '../../../../hooks/useSite';
import './ContactCardsSection.css';

export default function ContactCardsSection({ cards }) {
  const { links } = useSite();

  return (
    <section className="contact-cards">
      <div className="container">
        <ul className="contact-cards__list" role="list">
          {cards.map((card, index) => (
            <Reveal as="li" key={card.label} className="contact-card" delay={index * 0.05}>
              <p className="mono muted">{card.label}</p>
              <h2 className="contact-card__title">{card.title}</h2>
              {card.link ? (
                <SmartLink {...resolveLink(card.link, links)} className="contact-card__link">
                  {card.link.label}
                </SmartLink>
              ) : (
                <p className="muted contact-card__text">{card.text}</p>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
