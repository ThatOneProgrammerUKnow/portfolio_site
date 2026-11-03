import content from '../../content/projects.json';
import PageMeta from '../../components/PageMeta/PageMeta';
import ProjectsHeroSection from './sections/ProjectsHeroSection/ProjectsHeroSection';
import FeaturedProjectSection from './sections/FeaturedProjectSection/FeaturedProjectSection';
import ProjectGridSection from './sections/ProjectGridSection/ProjectGridSection';

export default function Projects() {
  const featured = content.projects.find((project) => project.featured);
  const others = content.projects.filter((project) => !project.featured);

  return (
    <>
      <PageMeta title={content.hero.eyebrow} description={content.hero.lead} />
      <ProjectsHeroSection content={content.hero} />
      {featured && <FeaturedProjectSection project={featured} ctaLabel={content.featuredCta} />}
      <ProjectGridSection projects={others} />
    </>
  );
}
