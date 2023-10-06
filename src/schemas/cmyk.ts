// import { GoProject } from 'react-icons/go';
import { defineType } from 'sanity';

export default defineType({
  name: 'cmyk',
  type: 'document',
  title: 'CMYK',
  // icon: GoProject,
  fields: [
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Versión CMYK',
      name: 'cmykVersion',
      type: 'string',
      options: {
        list: [
          { title: 'V 1.0', value: 'cmyk-1' },
          { title: 'V 2.0', value: 'cmyk-2' },
          { title: 'V 3.0', value: 'cmyk-3' },
          { title: 'V 4.0', value: 'cmyk-4' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Descripcion',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'color',
      title: 'Color',
      type: 'color',
      validation: (Rule) => Rule.required(),
      options: {
        disableAlpha: true,
      },
    },
    {
      name: 'github',
      title: 'Github',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'demo',
      title: 'Demo',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Imagen',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
  ],
});
