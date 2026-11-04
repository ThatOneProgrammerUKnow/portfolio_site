// Config for the `sanity` CLI (dev, build, deploy, schema validate). Values come from studio/.env.
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Hosted Studio: https://kobus-portfolio.sanity.studio (`npm run deploy`).
  // The website's /studio redirects here (public/_redirects).
  studioHost: 'kobus-portfolio',
  deployment: { appId: 'cukrmzor7y67o8cx0h3q53b1' },
});
