// One function per page: the only place the app asks Sanity for content.
// Used by the route loaders in src/routes.jsx.
import { sanityQuery } from './sanity';
import {
  ABOUT_QUERY,
  CONTACT_QUERY,
  HOME_QUERY,
  MY_PRODUCTS_QUERY,
  PRIVACY_POLICY_QUERY,
  PROJECT_DETAIL_QUERY,
  PROJECTS_QUERY,
  SITE_QUERY,
} from './queries';

/** A missing singleton means the Studio content is broken: fail loudly (shows the error page). */
async function getRequired(query, name, options) {
  const result = await sanityQuery(query, {}, options);
  if (!result) throw new Error(`Missing "${name}" content in Sanity.`);
  return result;
}

export const getSite = (options) => getRequired(SITE_QUERY, 'Site settings', options);
export const getHomePage = (options) => getRequired(HOME_QUERY, 'Home page', options);
export const getAboutPage = (options) => getRequired(ABOUT_QUERY, 'About page', options);
export const getProjectsPage = (options) => getRequired(PROJECTS_QUERY, 'Projects page', options);
export const getMyProductsPage = (options) => getRequired(MY_PRODUCTS_QUERY, 'My products page', options);
export const getContactPage = (options) => getRequired(CONTACT_QUERY, 'Contact page', options);

/** An app's privacy policy, or null when there is none with that slug. */
export const getPrivacyPolicy = (slug, options) => sanityQuery(PRIVACY_POLICY_QUERY, { slug }, options);

/** Returns { backLink, nextLabel, project } or null when the project has no case study. */
export async function getProjectDetail(slug, options) {
  const result = await sanityQuery(PROJECT_DETAIL_QUERY, { slug }, options);
  return result?.project ? result : null;
}
