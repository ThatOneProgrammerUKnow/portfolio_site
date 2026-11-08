import { useLoaderData } from 'react-router';
import PageMeta from '../../components/PageMeta/PageMeta';
import PolicyHeroSection from './sections/PolicyHeroSection/PolicyHeroSection';
import PolicyContentSection from './sections/PolicyContentSection/PolicyContentSection';

/** An app's privacy policy (/my-products/:app/privacy-policy). */
export default function PrivacyPolicy() {
  // The route loader redirects to /my-products when there's no policy for this app.
  const policy = useLoaderData();

  return (
    <>
      <PageMeta title={policy.title} />
      <PolicyHeroSection policy={policy} />
      <PolicyContentSection sections={policy.sections} />
    </>
  );
}
