export default {
  title: 'Espacio',
  name: 'spacing',
  type: 'object',
  fields: [
    {
      title: 'Ancho',
      type: 'number',
      name: 'width',
    },
    {
      title: 'Alto',
      type: 'number',
      name: 'height',
    },
  ],
  preview: {
    select: {
      width: 'width',
      height: 'height',
    },
    prepare: ({ width, height }) => ({
      title: `Espacio: Ancho - ${width || 'Full'} Alto - ${height}`,
    }),
  },
};
