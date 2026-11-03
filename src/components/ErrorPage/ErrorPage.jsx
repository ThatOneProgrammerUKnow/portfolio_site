import { useLocation, useRouteError } from 'react-router';
import { RotateCw } from 'lucide-react';
import { ERROR_PAGE_TEXT as text } from '../../constants/fallbackText';
import ButtonLink from '../ButtonLink/ButtonLink';
import './ErrorPage.css';

/**
 * Root error boundary: shown when content can't be loaded (Sanity unreachable, missing
 * document). It can't use Site settings, which may be what failed, so its copy is local.
 * No approved design yet: reuses the global type and button styles only.
 */
export default function ErrorPage() {
  const error = useRouteError();
  const { pathname } = useLocation();
  console.error(error);

  return (
    <main id="main" className="container error-page">
      <p className="eyebrow">{text.eyebrow}</p>
      <h1 className="error-page__title">{text.title}</h1>
      <p className="lead">{text.lead}</p>
      {/* A plain link to the same URL reloads the page and re-runs the loaders. */}
      <ButtonLink href={pathname} icon={RotateCw} className="error-page__retry">
        {text.retry}
      </ButtonLink>
    </main>
  );
}
