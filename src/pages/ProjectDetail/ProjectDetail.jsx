import { useLoaderData } from 'react-router';
import PageMeta from '../../components/PageMeta/PageMeta';
import ProjectHeaderSection from './sections/ProjectHeaderSection/ProjectHeaderSection';
import ProjectScreensSection from './sections/ProjectScreensSection/ProjectScreensSection';
import ProjectStorySection from './sections/ProjectStorySection/ProjectStorySection';
import NextProjectSection from './sections/NextProjectSection/NextProjectSection';

export default function ProjectDetail() {
  // The route loader redirects to /projects when there's no case study, so `project` is always set.
  const { project, backLink, nextLabel } = useLoaderData();
  const { detail } = project;

  return (
    <>
      <PageMeta title={project.title} description={project.summary} />
      <ProjectHeaderSection project={project} backLabel={backLink} />
      <ProjectScreensSection screens={detail.screens} />
      <ProjectStorySection detail={detail} />
      <NextProjectSection next={detail.next} label={nextLabel} />
    </>
  );
}
