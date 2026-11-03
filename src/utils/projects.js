import content from '../content/projects.json';

/** A project only gets a detail page when its content includes a case study (`detail`). */
export function findProjectWithDetail(slug) {
  return content.projects.find((project) => project.slug === slug && project.detail);
}
