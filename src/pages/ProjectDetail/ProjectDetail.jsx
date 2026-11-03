import { Navigate, useParams } from 'react-router';
import content from '../../content/projects.json';
import { findProjectWithDetail } from '../../utils/projects';
import PageMeta from '../../components/PageMeta/PageMeta';
import ProjectHeaderSection from './sections/ProjectHeaderSection/ProjectHeaderSection';
import ProjectScreensSection from './sections/ProjectScreensSection/ProjectScreensSection';
import ProjectStorySection from './sections/ProjectStorySection/ProjectStorySection';
import NextProjectSection from './sections/NextProjectSection/NextProjectSection';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = findProjectWithDetail(slug);

  // Only projects with a case study in content have a detail page.
  if (!project) return <Navigate to="/projects" replace />;

  const { detail } = project;

  return (
    <>
      <PageMeta title={project.title} description={project.summary} />
      <ProjectHeaderSection project={project} backLabel={content.backLink} />
      <ProjectScreensSection screens={detail.screens} />
      <ProjectStorySection detail={detail} />
      <NextProjectSection next={detail.next} label={content.nextLabel} />
    </>
  );
}
