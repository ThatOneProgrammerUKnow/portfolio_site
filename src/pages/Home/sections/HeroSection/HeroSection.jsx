import { ArrowRight, Download } from 'lucide-react';
import Badge from '../../../../components/Badge/Badge';
import ButtonLink from '../../../../components/ButtonLink/ButtonLink';
import Headline from '../../../../components/Headline/Headline';
import ImageSlot from '../../../../components/ImageSlot/ImageSlot';
import { resolveLink } from '../../../../utils/links';
import useSite from '../../../../hooks/useSite';
import './HeroSection.css';

export default function HeroSection({ content }) {
  const { links } = useSite();
  const { badge, title, lead, primaryCta, secondaryCta, image, tags } = content;

  return (
    <section className="home-hero">
      <div className="container home-hero__inner">
        <div className="home-hero__text">
          <Badge>{badge}</Badge>
          <h1 className="display home-hero__title">
            <Headline title={title} />
          </h1>
          <p className="lead home-hero__lead">{lead}</p>
          <div className="home-hero__actions">
            <ButtonLink {...resolveLink(primaryCta, links)} icon={ArrowRight}>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink variant="secondary" {...resolveLink(secondaryCta, links)} icon={Download}>
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="home-hero__visual">
          <div className="home-hero__ring">
            <ImageSlot image={image} className="home-hero__photo" eager width={312} height={312} />
          </div>
          <ul className="home-hero__tags" role="list">
            {tags.map((tag, index) => (
              <li key={tag.label} className={`home-hero__tag home-hero__tag--${index + 1} home-hero__tag--${tag.tone}`}>
                {tag.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
