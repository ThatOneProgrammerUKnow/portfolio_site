import { ArrowRight } from 'lucide-react';
import site from '../../../../content/site.json';
import ButtonLink from '../../../../components/ButtonLink/ButtonLink';
import Reveal from '../../../../components/Reveal/Reveal';
import { getSiteLink } from '../../../../utils/links';
import './ContactCtaSection.css';

export default function ContactCtaSection({ content }) {
  return (
    <section className="contact-cta">
      <Reveal className="container contact-cta__inner">
        <span className="contact-cta__orb" aria-hidden="true" />
        <h2 className="h2 contact-cta__title">{content.title}</h2>
        <p className="lead">{content.text}</p>
        <ButtonLink variant="dark" href={getSiteLink('email').href} icon={ArrowRight} className="contact-cta__button">
          {site.email}
        </ButtonLink>
      </Reveal>
    </section>
  );
}
