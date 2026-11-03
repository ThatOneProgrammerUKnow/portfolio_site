import { useLoaderData } from 'react-router';
import PageMeta from '../../components/PageMeta/PageMeta';
import AboutHeroSection from './sections/AboutHeroSection/AboutHeroSection';
import ExperienceSection from './sections/ExperienceSection/ExperienceSection';
import LeadershipSection from './sections/LeadershipSection/LeadershipSection';
import LearningSection from './sections/LearningSection/LearningSection';
import BeyondCodeSection from './sections/BeyondCodeSection/BeyondCodeSection';

export default function About() {
  const content = useLoaderData();

  return (
    <>
      <PageMeta title={content.hero.eyebrow} description={content.hero.paragraphs[1]} />
      <AboutHeroSection content={content.hero} />
      <ExperienceSection content={content.experience} />
      <LeadershipSection content={content.leadership} />
      <LearningSection learning={content.learning} techStack={content.techStack} />
      <BeyondCodeSection content={content.beyondCode} />
    </>
  );
}
