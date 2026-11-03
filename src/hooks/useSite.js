import { useRouteLoaderData } from 'react-router';

/** Site settings (name, email, shared links, nav, footer), loaded once by the root route. */
export default function useSite() {
  return useRouteLoaderData('root');
}
