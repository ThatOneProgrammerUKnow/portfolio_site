import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import ImageSlot from '../../../../components/ImageSlot/ImageSlot';
import Reveal from '../../../../components/Reveal/Reveal';
import './BeyondCodeSection.css';

export default function BeyondCodeSection({ content }) {
  return (
    <section className="section section--flush-top beyond-code">
      <div className="container">
        <Reveal>
          <SectionHeader eyebrow={content.eyebrow} title={content.title} />
        </Reveal>

        <ul className="beyond-code__grid" role="list">
          {content.items.map((item, index) => (
            <Reveal as="li" key={item.caption} delay={(index % 3) * 0.06}>
              <figure>
                <ImageSlot image={item.image} className="beyond-code__image" width={380} height={300} />
                <figcaption className="muted beyond-code__caption">{item.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
