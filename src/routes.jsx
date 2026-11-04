import { Navigate, redirect } from 'react-router';
import Layout from './components/Layout/Layout';
import ErrorPage from './components/ErrorPage/ErrorPage';
import {
  getAboutPage,
  getAppsPage,
  getContactPage,
  getHomePage,
  getProjectDetail,
  getProjectsPage,
  getSite,
} from './services/content';

const page = (load) => async () => ({ Component: (await load()).default });

// Loaders live here (not in the lazy page modules) so the content request starts
// in parallel with the page's JS chunk instead of after it.
const withSignal = (get) => ({ request }) => get({ signal: request.signal });

/** Route config shared by the app (browser router) and tests (memory router). */
export const routes = [
  {
    id: 'root',
    path: '/',
    Component: Layout,
    loader: withSignal(getSite),
    ErrorBoundary: ErrorPage,
    HydrateFallback: () => null,
    children: [
      { index: true, loader: withSignal(getHomePage), lazy: page(() => import('./pages/Home/Home')) },
      { path: 'about', loader: withSignal(getAboutPage), lazy: page(() => import('./pages/About/About')) },
      { path: 'projects', loader: withSignal(getProjectsPage), lazy: page(() => import('./pages/Projects/Projects')) },
      {
        path: 'projects/:slug',
        // Only projects with a case study have a detail page.
        loader: async ({ params, request }) =>
          (await getProjectDetail(params.slug, { signal: request.signal })) ?? redirect('/projects'),
        lazy: page(() => import('./pages/ProjectDetail/ProjectDetail')),
      },
      { path: 'apps', loader: withSignal(getAppsPage), lazy: page(() => import('./pages/Apps/Apps')) },
      { path: 'contact', loader: withSignal(getContactPage), lazy: page(() => import('./pages/Contact/Contact')) },
      // No 404 design yet: send unknown URLs home (see docs/progress.md).
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];
