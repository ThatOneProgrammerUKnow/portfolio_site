import RichText from '../../../../components/RichText/RichText';
import './PolicyContentSection.css';

/** The policy text: one heading + rich text per section, in a white card. */
export default function PolicyContentSection({ sections }) {
  return (
    <section className="policy-content">
      <div className="container policy-content__inner">
        <div className="policy-content__card">
          {sections.map((section) => (
            <section key={section._key} className="policy-content__section">
              <h2 className="policy-content__heading">{section.heading}</h2>
              <RichText blocks={section.text} className="policy-content__text" />
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
