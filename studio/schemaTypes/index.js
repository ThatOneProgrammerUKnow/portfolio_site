import { aboutPage } from './documents/aboutPage.js';
import { contactPage } from './documents/contactPage.js';
import { homePage } from './documents/homePage.js';
import { project } from './documents/project.js';
import { projectsPage } from './documents/projectsPage.js';
import { siteSettings } from './documents/siteSettings.js';
import { accentTitle } from './objects/accentTitle.js';
import { imageWithAlt } from './objects/imageWithAlt.js';
import { link } from './objects/link.js';

/** Document types that exist exactly once (one per page + site settings). */
export const SINGLETON_TYPES = ['siteSettings', 'homePage', 'aboutPage', 'projectsPage', 'contactPage'];

export const schemaTypes = [
  // documents
  siteSettings,
  homePage,
  aboutPage,
  projectsPage,
  contactPage,
  project,
  // objects
  accentTitle,
  imageWithAlt,
  link,
];
