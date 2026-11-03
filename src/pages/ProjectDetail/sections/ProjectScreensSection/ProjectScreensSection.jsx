import ImageSlot from '../../../../components/ImageSlot/ImageSlot';
import Reveal from '../../../../components/Reveal/Reveal';
import './ProjectScreensSection.css';

export default function ProjectScreensSection({ screens }) {
  return (
    <section className="project-screens">
      <div className="container">
        <Reveal className="project-screens__panel">
          {screens.map((screen, index) => (
            <ImageSlot key={index} image={screen} className="project-screens__phone" width={210} height={410} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
