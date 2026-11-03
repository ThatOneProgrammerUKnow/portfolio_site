import { Navigate } from 'react-router';
import Layout from './components/Layout/Layout';

const page = (load) => async () => ({ Component: (await load()).default });

/** Route config shared by the app (browser router) and tests (memory router). */
export const routes = [
  {
    path: '/',
    Component: Layout,
    HydrateFallback: () => null,
    children: [
      { index: true, lazy: page(() => import('./pages/Home/Home')) },
      { path: 'about', lazy: page(() => import('./pages/About/About')) },
      { path: 'projects', lazy: page(() => import('./pages/Projects/Projects')) },
      { path: 'projects/:slug', lazy: page(() => import('./pages/ProjectDetail/ProjectDetail')) },
      { path: 'contact', lazy: page(() => import('./pages/Contact/Contact')) },
      // No 404 design yet: send unknown URLs home (see docs/progress.md).
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];
