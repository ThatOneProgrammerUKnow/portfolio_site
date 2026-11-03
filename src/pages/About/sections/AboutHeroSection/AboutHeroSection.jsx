import ButtonLink from '../../../../components/ButtonLink/ButtonLink';
import Headline from '../../../../components/Headline/Headline';
import ImageSlot from '../../../../components/ImageSlot/ImageSlot';
import { resolveLink } from '../../../../utils/links';
import './AboutHeroSection.css';

export default function AboutHeroSection({ content }) {
  const { eyebrow, title, paragraphs, cta, image } = content;

  return (
    <section className="about-hero">
      <div className="container about-hero__inner">
        <div className="about-hero__text">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display about-hero__title">
            <Headline title={title} />
          </h1>
          <div className="about-hero__body">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="lead">
                {paragraph}
              </p>
            ))}
          </div>
          <ButtonLink {...resolveLink(cta)} icon="download" className="about-hero__cta">
            {cta.label}
          </ButtonLink>
        </div>

        <div className="about-hero__visual">
          <span className="about-hero__circle" aria-hidden="true" />
          <ImageSlot image={image} className="about-hero__photo" eager width={340} height={420} />
        </div>
      </div>
    </section>
  );
}
