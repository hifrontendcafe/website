export default {
  title: 'Section Hero',
  name: 'sectionHero',
  type: 'object',
  fields: [
    {
      title: 'Titulo',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Descripcion',
      name: 'paragraph',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title: `Section Hero - ${title}`,
    }),
  },
};
