export default {
  title: 'Card',
  name: 'card',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Imagen',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Headline',
      name: 'headline',
      type: 'string',
    },
    {
      title: 'Parrafo',
      name: 'paragraph',
      type: 'text',
    },
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title: `Card - ${title}`,
    }),
  },
};
