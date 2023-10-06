// import { IoText } from 'react-icons/io5';
import { defineType } from 'sanity';

export default defineType({
  title: 'Texto',
  name: 'textComponent',
  type: 'object',
  // icon: IoText,
  fields: [
    {
      title: 'Texto',
      name: 'text',
      type: 'text',
    },
    {
      title: 'Centrado',
      name: 'center',
      type: 'boolean',
    },
    {
      type: 'string',
      title: 'Tipo',
      name: 'type',
      options: {
        list: [
          { title: 'Titulo', value: 'title' },
          { title: 'Subtitulo', value: 'subtitle' },
          { title: 'Parrafo', value: 'paragraph' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'text',
      type: 'type',
    },
    prepare: ({ title, type }) => {
      const types = {
        paragraph: 'Parrafo',
        title: 'Titulo',
        subtitle: 'Subtitulo',
      };

      return {
        title: `${types[type as keyof typeof types]}: ${title}`,
      };
    },
  },
});
