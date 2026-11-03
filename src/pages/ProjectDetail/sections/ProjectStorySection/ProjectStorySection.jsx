import Reveal from '../../../../components/Reveal/Reveal';
import { joinMeta } from '../../../../utils/links';
import './ProjectStorySection.css';

function StoryRow({ title, children }) {
  return (
    <Reveal className="story-row">
      <h2 className="story-row__title">{title}</h2>
      <div className="story-row__body">{children}</div>
    </Reveal>
  );
}

export default function ProjectStorySection({ detail }) {
  const { goal, built, process } = detail;

  return (
    <section className="section project-story">
      <div className="container project-story__inner">
        <StoryRow title={goal.title}>
          <p className="lead project-story__goal">{goal.text}</p>
        </StoryRow>

        <StoryRow title={built.title}>
          <div className="project-story__parts">
            {built.parts.map((part) => (
              <div key={part.label.join()} className="project-story__part">
                <h3 className="mono highlight project-story__part-label">{joinMeta(part.label)}</h3>
                <ul className="project-story__part-list">
                  {part.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </StoryRow>

        <StoryRow title={process.title}>
          <ol className="project-story__steps" role="list">
            {process.steps.map((step, index) => (
              <li key={step} className="project-story__step">
                <span className="project-story__step-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </StoryRow>
      </div>
    </section>
  );
}
