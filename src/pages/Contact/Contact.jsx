import content from '../../content/contact.json';
import PageMeta from '../../components/PageMeta/PageMeta';
import ContactHeroSection from './sections/ContactHeroSection/ContactHeroSection';
import ContactCardsSection from './sections/ContactCardsSection/ContactCardsSection';

export default function Contact() {
  return (
    <>
      <PageMeta title={content.hero.eyebrow} description={content.hero.lead} />
      <ContactHeroSection content={content.hero} />
      <ContactCardsSection cards={content.cards} />
    </>
  );
}
