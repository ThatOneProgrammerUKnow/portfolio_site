import { ArrowRight, Download } from 'lucide-react';
import ButtonLink from '../../../../components/ButtonLink/ButtonLink';
import ImageSlot from '../../../../components/ImageSlot/ImageSlot';
import Reveal from '../../../../components/Reveal/Reveal';
import { joinMeta } from '../../../../utils/links';
import './AppListSection.css';

/** One card per app: screenshot, details, and Download + View project buttons. */
export default function AppListSection({ apps, downloadLabel, viewProjectLabel }) {
  return (
    <section className="app-list">
      <div className="container">
        <ul className="app-list__list" role="list">
          {apps.map((app, index) => (
            <Reveal as="li" key={app.slug} id={app.slug} className="app-card" delay={index * 0.06}>
              <ImageSlot image={app.image} className="app-card__image" width={180} height={240} />
              <div className="app-card__body">
                <p className="mono highlight">{joinMeta(app.meta)}</p>
                <h2 className="app-card__title">{app.title}</h2>
                <p className="muted app-card__summary">{app.summary}</p>
                <p className="mono muted app-card__stack">{joinMeta(app.stack)}</p>
              </div>
              <div className="app-card__actions">
                {/* The app name is added for screen readers, so each button makes sense on its own. */}
                <ButtonLink href={app.downloadUrl} icon={Download}>
                  {downloadLabel}
                  {' '}
                  <span className="visually-hidden">{app.title}</span>
                </ButtonLink>
                <ButtonLink variant="secondary" to={app.to} icon={ArrowRight}>
                  {viewProjectLabel}
                  {' '}
                  <span className="visually-hidden">{app.title}</span>
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
