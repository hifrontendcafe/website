export default {
  title: 'Feature Card',
  name: 'featureCard',
  type: 'object',
  fields: [
    {
      title: 'Titulo',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Descripcion',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Link',
      name: 'link',
      type: 'string',
    },
    {
      title: 'Texto del Boton',
      type: 'string',
      name: 'btnText',
    },
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title: `Feature Card - ${title}`,
    }),
  },
};
