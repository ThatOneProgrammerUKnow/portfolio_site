import { useLoaderData } from 'react-router';
import PageMeta from '../../components/PageMeta/PageMeta';
import MyProductsHeroSection from './sections/MyProductsHeroSection/MyProductsHeroSection';
import InstallSection from './sections/InstallSection/InstallSection';
import BetaSection from './sections/BetaSection/BetaSection';
import RoadmapSection from './sections/RoadmapSection/RoadmapSection';
import ReadMoreSection from './sections/ReadMoreSection/ReadMoreSection';

/** "My products": one app in beta, how to install it, what beta means and what comes next. */
export default function MyProducts() {
  const content = useLoaderData();

  return (
    <>
      <PageMeta title={content.pageTitle} description={content.header.lead} />
      <MyProductsHeroSection content={content.header} />
      <InstallSection app={content.app} card={content.card} install={content.install} />
      <BetaSection content={content.beta} />
      <RoadmapSection content={content.roadmap} />
      <ReadMoreSection content={content.more} app={content.app} />
    </>
  );
}
