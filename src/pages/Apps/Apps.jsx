import { useLoaderData } from 'react-router';
import PageMeta from '../../components/PageMeta/PageMeta';
import AppsHeroSection from './sections/AppsHeroSection/AppsHeroSection';
import AppListSection from './sections/AppListSection/AppListSection';

export default function Apps() {
  const content = useLoaderData();

  return (
    <>
      <PageMeta title={content.hero.eyebrow} description={content.hero.lead} />
      <AppsHeroSection content={content.hero} />
      <AppListSection
        apps={content.apps}
        downloadLabel={content.downloadLabel}
        viewProjectLabel={content.viewProjectLabel}
      />
    </>
  );
}
