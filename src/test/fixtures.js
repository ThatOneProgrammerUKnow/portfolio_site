// Test data shaped like the Sanity query results (src/services/queries.js).
// Deliberately short and fake: tests check behaviour, not real copy.
const placeholder = (text) => ({ src: null, alt: null, placeholder: text });

export const site = {
  name: 'Test Person',
  role: 'Test Role',
  email: 'test@example.com',
  skipLink: 'Skip to content',
  links: {
    github: { label: 'GitHub', href: 'https://github.com/test' },
    linkedin: { label: 'LinkedIn', href: 'https://linkedin.com/in/test' },
    email: { label: 'Email', href: 'mailto:test@example.com' },
    cv: { label: 'Download CV', href: 'https://cdn.sanity.io/files/p/d/abc.pdf?dl=cv.pdf' },
  },
  nav: {
    ariaLabel: 'Main',
    openLabel: 'Open menu',
    closeLabel: 'Close menu',
    items: [
      { number: '01', label: 'Home', to: '/' },
      { number: '02', label: 'About', to: '/about' },
      { number: '03', label: 'Projects', to: '/projects' },
      { number: '04', label: 'Download CV', linkKey: 'cv' },
      { number: '05', label: 'Contact', to: '/contact' },
    ],
  },
  footer: { quote: 'A quote.', reference: 'Somewhere 1:1', linkKeys: ['github', 'linkedin', 'email'] },
};

const caseStudy = {
  slug: 'alpha',
  title: 'Alpha',
  featured: true,
  featuredLabel: 'Featured',
  meta: ['Studio', 'In progress'],
  summary: 'Alpha summary.',
  stack: ['React'],
  images: [placeholder('[alpha]')],
  detail: {
    facts: [{ label: 'Role', value: 'Developer' }],
    screens: [placeholder('[screen]')],
    goal: { title: 'The goal', text: 'Goal text.' },
    built: { title: 'What I built', parts: [{ label: ['App', 'v1'], items: ['Offline'] }] },
    process: { title: 'How I work on it', steps: ['Step one.'] },
    next: { title: 'Beta', to: '/projects#beta' },
  },
};

const plainProject = {
  slug: 'beta',
  title: 'Beta',
  featured: false,
  featuredLabel: null,
  meta: ['Client', '2026'],
  summary: 'Beta summary.',
  stack: ['Django'],
  images: [placeholder('[beta]')],
  detail: null,
};

export const home = {
  hero: {
    badge: 'Badge',
    title: { before: 'Home ', highlight: 'title.' },
    lead: 'Home lead.',
    primaryCta: { label: 'See my work', to: '/projects', linkKey: null },
    secondaryCta: { label: 'Download CV', to: null, linkKey: 'cv' },
    image: placeholder('[portrait]'),
    tags: [{ label: 'Tag', tone: 'light' }],
  },
  howIWork: {
    eyebrow: 'How I work',
    title: 'Steps.',
    steps: [
      { number: '01', title: 'Initiate', paragraphs: ['Para.'], images: null },
      { number: '02', title: 'Live', paragraphs: ['Para.'], images: [placeholder('[img]')] },
    ],
  },
  selectedWork: {
    eyebrow: 'Selected work',
    title: 'Work.',
    allLink: { label: 'All projects', to: '/projects', linkKey: null },
    projects: [
      { title: 'Alpha', to: '/projects/alpha', meta: ['Studio'], text: 'Alpha.', stack: ['React'], image: placeholder('[a]') },
      { title: 'Beta', to: '/projects#beta', meta: ['Client'], text: 'Beta.', stack: ['Django'], image: placeholder('[b]') },
    ],
  },
  rightNow: { eyebrow: 'Right now', title: 'Busy.', items: [{ label: 'Building', text: 'Things.' }] },
  contactCta: { title: 'Talk?', text: 'Inbox open.' },
};

export const about = {
  hero: {
    eyebrow: 'About',
    title: { before: 'About ', highlight: 'title.' },
    paragraphs: ['First.', 'Second.'],
    cta: { label: 'Download CV', to: null, linkKey: 'cv' },
    image: placeholder('[photo]'),
  },
  experience: {
    eyebrow: 'Experience',
    title: 'Worked.',
    roles: [
      { period: '2026', current: true, role: 'Dev', company: 'Co', bullets: ['Did a thing.'], text: null },
      { period: '2025', current: false, role: 'Intern', company: 'Other', bullets: null, text: 'Interned.' },
    ],
  },
  leadership: {
    eyebrow: 'Leadership',
    title: 'Led.',
    intro: 'Intro.',
    link: { before: '(Visit ', label: 'example.com', href: 'https://example.com', after: ')' },
    roles: [{ period: '2021', title: 'Leader', text: 'Led.' }],
  },
  learning: { eyebrow: 'Learning', title: 'Learnt.', items: [{ title: 'Cert', detail: '2026' }] },
  techStack: { eyebrow: 'Stack', title: 'Tools.', groups: [{ label: 'Languages', items: ['Java'] }] },
  beyondCode: { eyebrow: 'Beyond', title: 'Life.', items: [{ caption: 'Coffee', image: placeholder('[coffee]') }] },
};

export const projectsPage = {
  hero: { eyebrow: 'Projects', title: { before: 'Projects ', highlight: 'title.' }, lead: 'Projects lead.' },
  featuredCta: 'Read the case study',
  projects: [caseStudy, plainProject],
};

export const projectDetail = { backLink: 'All projects', nextLabel: 'Next project', project: caseStudy };

export const contact = {
  hero: { eyebrow: 'Contact', title: { before: 'Contact ', highlight: 'title.' }, lead: 'Contact lead.' },
  cards: [
    { label: 'GitHub', title: 'test', text: null, link: { label: 'See my code', to: null, linkKey: 'github' } },
    { label: 'Based in', title: 'Somewhere', text: 'Earth', link: null },
  ],
};
