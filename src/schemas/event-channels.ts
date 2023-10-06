// import { MdEventNote } from 'react-icons/md';
import { defineType } from 'sanity';

export default defineType({
  title: 'Canales con eventos',
  name: 'eventChannel',
  type: 'document',
  // icon: MdEventNote,
  fields: [
    {
      title: 'Nombre',
      name: 'name',
      type: 'string',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Categoría',
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Imagen por defecto',
      name: 'defaultImage',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Id',
      name: 'id',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'id',
    },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
  orderings: [
    {
      title: 'Nombre, Nuevos',
      name: 'nameDesc',
      by: [{ field: 'name', direction: 'desc' }],
    },
    {
      title: 'Nombre, Viejos',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
