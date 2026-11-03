// Sanity Studio config. Needs Studio v6.17+ for the built-in `document.singletons` API.
// Project ID and dataset are public identifiers (not secrets), read from studio/.env.
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { SINGLETON_TYPES, schemaTypes } from './schemaTypes/index.js';
import { structure } from './structure.js';

export default defineConfig({
  name: 'default',
  title: 'Kobus Portfolio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
  document: { singletons: SINGLETON_TYPES },
});
