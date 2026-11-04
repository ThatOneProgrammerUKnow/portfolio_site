// GROQ queries. Each projection returns the same shape the components were built for
// (the former src/content/*.json), so sections don't need to know about Sanity.
// Arrays that sections .map() over are coalesced to [] so a missing field can't crash a page.

const image = `{ "src": asset->url, alt, placeholder }`;
const link = `{ label, to, linkKey }`;

/** Case study → its own page; otherwise its card on /projects. */
const projectHref = `select(hasCaseStudy == true => "/projects/" + slug.current, "/projects#" + slug.current)`;

const projectFields = `
  "slug": slug.current,
  title,
  featured,
  featuredLabel,
  "meta": coalesce(meta, []),
  summary,
  "stack": coalesce(stack, []),
  "images": coalesce(images[]${image}, []),
  downloadUrl,
  "detail": select(hasCaseStudy == true => detail {
    "facts": coalesce(facts[]{ label, value }, []),
    "screens": coalesce(screens[]${image}, []),
    goal { title, text },
    built { title, "parts": coalesce(parts[]{ "label": coalesce(label, []), "items": coalesce(items, []) }, []) },
    process { title, "steps": coalesce(steps, []) },
    "next": next->{ title, "to": ${projectHref} }
  })
`;

export const SITE_QUERY = `*[_id == "siteSettings"][0]{
  name,
  role,
  email,
  skipLink,
  "links": {
    "github": links.github{ label, href },
    "linkedin": links.linkedin{ label, href },
    "email": { "label": links.email.label, "href": "mailto:" + email },
    "cv": {
      "label": links.cv.label,
      "href": links.cv.file.asset->url + "?dl=" + links.cv.file.asset->originalFilename
    }
  },
  nav { ariaLabel, openLabel, closeLabel, "items": coalesce(items[]{ number, label, to, linkKey }, []) },
  footer { quote, reference, "linkKeys": coalesce(linkKeys, []) }
}`;

export const HOME_QUERY = `*[_id == "homePage"][0]{
  hero {
    badge, title, lead,
    "primaryCta": primaryCta${link},
    "secondaryCta": secondaryCta${link},
    "image": image${image},
    "tags": coalesce(tags[]{ label, tone }, [])
  },
  howIWork {
    eyebrow, title,
    "steps": coalesce(steps[]{ number, title, "paragraphs": coalesce(paragraphs, []), "images": images[]${image} }, [])
  },
  selectedWork {
    eyebrow, title,
    "allLink": allLink${link},
    "projects": coalesce(projects[]{
      ...project->{ title, "to": ${projectHref} },
      "meta": coalesce(meta, []),
      text,
      "stack": coalesce(stack, []),
      "image": image${image}
    }, [])
  },
  rightNow { eyebrow, title, "items": coalesce(items[]{ label, text }, []) },
  contactCta { title, text }
}`;

export const ABOUT_QUERY = `*[_id == "aboutPage"][0]{
  hero { eyebrow, title, "paragraphs": coalesce(paragraphs, []), "cta": cta${link}, "image": image${image} },
  experience { eyebrow, title, "roles": coalesce(roles[]{ period, current, role, company, bullets, text }, []) },
  leadership {
    eyebrow, title, intro,
    link { before, label, href, after },
    "roles": coalesce(roles[]{ period, title, text }, [])
  },
  learning { eyebrow, title, "items": coalesce(items[]{ title, detail }, []) },
  techStack { eyebrow, title, "groups": coalesce(groups[]{ label, "items": coalesce(items, []) }, []) },
  beyondCode { eyebrow, title, "items": coalesce(items[]{ caption, "image": image${image} }, []) }
}`;

export const PROJECTS_QUERY = `*[_id == "projectsPage"][0]{
  hero { eyebrow, title, lead },
  featuredCta,
  downloadCta,
  "projects": *[_type == "project" && defined(slug.current)] | order(order asc) { ${projectFields} }
}`;

/** Apps page copy + every project with a download link (same order as the Projects page). */
export const APPS_QUERY = `*[_id == "appsPage"][0]{
  hero { eyebrow, title, lead },
  downloadLabel,
  viewProjectLabel,
  "apps": *[_type == "project" && defined(slug.current) && defined(downloadUrl)] | order(order asc) {
    "slug": slug.current,
    title,
    "meta": coalesce(meta, []),
    summary,
    "stack": coalesce(stack, []),
    "image": images[0]${image},
    downloadUrl,
    "to": ${projectHref}
  }
}`;

/** Labels from the Projects page + the one project, only if it has a case study. */
export const PROJECT_DETAIL_QUERY = `*[_id == "projectsPage"][0]{
  backLink,
  nextLabel,
  "project": *[_type == "project" && slug.current == $slug && hasCaseStudy == true][0]{ ${projectFields} }
}`;

export const CONTACT_QUERY = `*[_id == "contactPage"][0]{
  hero { eyebrow, title, lead },
  "cards": coalesce(cards[]{ label, title, text, "link": link${link} }, [])
}`;
