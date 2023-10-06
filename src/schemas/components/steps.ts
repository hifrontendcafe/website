// import { IoFootsteps } from 'react-icons/io5';

export default {
  title: 'Pasos',
  name: 'steps',
  type: 'object',
  // icon: IoFootsteps,
  fields: [
    {
      title: 'Pasos',
      name: 'steps',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              step: 'step',
              title: 'title',
              subtitle: 'description',
            },
            prepare({ title, subtitle, step }) {
              return {
                title: `${step} - ${title}`,
                subtitle,
              };
            },
          },
          title: 'Paso',
          fields: [
            { name: 'step', type: 'number', title: 'Paso' },
            { name: 'title', type: 'string', title: 'Título' },
            { name: 'description', type: 'text', title: 'Descripción' },
          ],
        },
      ],
    },
  ],

  preview: {
    prepare: () => ({
      title: 'Pasos',
    }),
  },
};
