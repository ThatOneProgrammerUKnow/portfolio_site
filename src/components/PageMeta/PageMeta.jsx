import site from '../../content/site.json';

/** Document title + description. React 19 hoists these into <head>. */
export default function PageMeta({ title, description }) {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · ${site.role}`;
  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
    </>
  );
}
