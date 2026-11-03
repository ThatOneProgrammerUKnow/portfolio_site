import content from '../../content/home.json';
import PageMeta from '../../components/PageMeta/PageMeta';
import HeroSection from './sections/HeroSection/HeroSection';
import HowIWorkSection from './sections/HowIWorkSection/HowIWorkSection';
import SelectedWorkSection from './sections/SelectedWorkSection/SelectedWorkSection';
import RightNowSection from './sections/RightNowSection/RightNowSection';
import ContactCtaSection from './sections/ContactCtaSection/ContactCtaSection';

export default function Home() {
  return (
    <>
      <PageMeta description={content.hero.lead} />
      <HeroSection content={content.hero} />
      <HowIWorkSection content={content.howIWork} />
      <SelectedWorkSection content={content.selectedWork} />
      <RightNowSection content={content.rightNow} />
      <ContactCtaSection content={content.contactCta} />
    </>
  );
}
