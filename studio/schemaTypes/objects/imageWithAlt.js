// Image with alt text. Sanity's image type has no built-in alt, so it's added as a field
// on the image (pattern from sanity.io/docs/studio/image-type). Alt is required once an
// image is uploaded (WCAG 2.2 AA).
import { defineField, defineType } from 'sanity';

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe the image for screen readers.',
      validation: (rule) =>
        rule.custom((alt, context) =>
          context.parent?.asset && !alt?.trim() ? 'Alt text is required when an image is set.' : true,
        ),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      description: 'Shown in the empty slot until an image is uploaded.',
    }),
  ],
});
