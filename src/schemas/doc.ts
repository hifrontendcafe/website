// import { RiArticleLine } from 'react-icons/ri';
import { defineType } from 'sanity';

export default defineType({
  title: 'Documento',
  name: 'docs',
  type: 'document',
  // icon: RiArticleLine,
  fields: [
    {
      title: 'Título',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Contenido',
      name: 'body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            {
              type: 'string',
              name: 'alt',
              title: 'Alternative Text',
              description: `Some of your visitors cannot see images,
            be they blind, color-blind, low-sighted;
            alternative text is of great help for those
            people that can rely on it to have a good idea of
            what's on your page.`,
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
      ],
    },
  ],
});
