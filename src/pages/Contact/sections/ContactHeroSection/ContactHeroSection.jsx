import { ArrowRight } from 'lucide-react';
import ButtonLink from '../../../../components/ButtonLink/ButtonLink';
import Headline from '../../../../components/Headline/Headline';
import { getSiteLink } from '../../../../utils/links';
import useSite from '../../../../hooks/useSite';
import './ContactHeroSection.css';

export default function ContactHeroSection({ content }) {
  const site = useSite();

  return (
    <section className="contact-hero">
      <div className="container contact-hero__inner">
        <div className="contact-hero__text">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 className="contact-hero__title">
            <Headline title={content.title} />
          </h1>
          <p className="lead contact-hero__lead">{content.lead}</p>
          <ButtonLink href={getSiteLink(site.links, 'email').href} size="lg" icon={ArrowRight} className="contact-hero__email">
            {site.email}
          </ButtonLink>
        </div>
        <span className="contact-hero__orb" aria-hidden="true" />
      </div>
    </section>
  );
}
