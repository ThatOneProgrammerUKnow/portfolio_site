import { Download } from 'lucide-react';
import ButtonLink from '../../../../components/ButtonLink/ButtonLink';
import ImageSlot from '../../../../components/ImageSlot/ImageSlot';
import Reveal from '../../../../components/Reveal/Reveal';
import RichText from '../../../../components/RichText/RichText';
import './InstallSection.css';

/** Blue app card with the download button, next to the numbered install steps. */
export default function InstallSection({ app, card, install }) {
  return (
    <section className="install" id={app.slug}>
      <div className="container install__inner">
        <Reveal className="install__card">
          <ImageSlot image={card.icon} className="install__icon" width={88} height={88} />
          <h2 className="install__app-title">{app.title}</h2>
          <p className="install__tagline">{card.tagline}</p>
          <ButtonLink variant="secondary" href={app.downloadUrl} icon={Download} className="install__download">
            {card.downloadLabel}
          </ButtonLink>
          <p className="install__note">{card.note}</p>
        </Reveal>

        <div className="install__guide">
          <h2 className="install__title">{install.title}</h2>
          <p className="muted install__intro">{install.intro}</p>
          <ol className="install__steps" role="list">
            {install.steps.map((step, index) => (
              <Reveal as="li" key={step._key} className="install__step" delay={index * 0.04}>
                <span className="install__number" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3 className="install__step-title">{step.title}</h3>
                  <RichText blocks={step.text} className="muted install__step-text" />
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
