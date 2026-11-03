import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import SmartLink from '../../../../components/SmartLink/SmartLink';
import Reveal from '../../../../components/Reveal/Reveal';
import './LeadershipSection.css';

export default function LeadershipSection({ content }) {
  const { link } = content;

  return (
    <section className="section leadership">
      <div className="container">
        <Reveal>
          <SectionHeader eyebrow={content.eyebrow} title={content.title}>
            <p className="muted leadership__intro">
              {content.intro} {link.before}
              <SmartLink href={link.href}>{link.label}</SmartLink>
              {link.after}
            </p>
          </SectionHeader>
        </Reveal>

        <ul className="leadership__cards" role="list">
          {content.roles.map((role, index) => (
            <Reveal as="li" key={role.title} className="leadership__card lift" delay={index * 0.06}>
              <p className="mono highlight">{role.period}</p>
              <h3 className="leadership__title">{role.title}</h3>
              <p className="muted">{role.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
