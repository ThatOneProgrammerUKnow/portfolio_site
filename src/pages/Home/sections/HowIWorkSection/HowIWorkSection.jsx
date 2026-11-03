import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import ImageSlot from '../../../../components/ImageSlot/ImageSlot';
import Reveal from '../../../../components/Reveal/Reveal';
import './HowIWorkSection.css';

export default function HowIWorkSection({ content }) {
  return (
    <section className="section section--surface how-i-work">
      <div className="container">
        <Reveal>
          <SectionHeader eyebrow={content.eyebrow} title={content.title} className="how-i-work__header" />
        </Reveal>

        <ol className="how-i-work__steps" role="list">
          {content.steps.map((step, index) => (
            <Reveal as="li" key={step.number} className="how-i-work__step" delay={index * 0.08}>
              <div className="how-i-work__marker" aria-hidden="true">
                <span className="how-i-work__number">{step.number}</span>
                <span className="how-i-work__line" />
              </div>
              <h3 className="h3 how-i-work__title">{step.title}</h3>
              <div className="how-i-work__body">
                {step.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              {step.images && (
                <div className="how-i-work__images">
                  {step.images.map((image, imageIndex) => (
                    <ImageSlot key={imageIndex} image={image} className="how-i-work__image" width={112} height={112} />
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
