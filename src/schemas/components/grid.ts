export default {
  title: 'Grilla',
  name: 'grid',
  type: 'object',
  fields: [
    {
      title: 'Columnas',
      name: 'columns',
      type: 'number',
      validation: (Rule) => Rule.max(12).min(1),
    },
    {
      title: 'Gap',
      name: 'gap',
      type: 'number',
    },
    {
      title: 'Contenido',
      name: 'content',
      type: 'array',
      of: [
        { type: 'card' },
        { type: 'textComponent' },
        { type: 'featureCard' },
      ],
    },
  ],

  preview: {
    select: {
      columns: 'columns',
    },
    prepare: ({ columns }) => ({
      title: `Grilla: ${columns} Columnas`,
    }),
  },
};
