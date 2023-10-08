// import { MdEventSeat } from 'react-icons/md';
import { format } from 'date-fns';
import { defineType } from 'sanity';

export default defineType({
  title: 'Evento',
  name: 'event',
  type: 'document',
  // icon: MdEventSeat,
  fields: [
    {
      title: 'Titulo',
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
      title: 'Categoria',
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Cover',
      name: 'cover',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          title: 'Alt',
          name: 'alt',
          type: 'string',
          options: {
            isHighlighted: true, // <-- make this field easily accessible
          },
        },
      ],
    },
    {
      title: 'Fecha',
      name: 'date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Fecha de Fin',
      name: 'endDate',
      type: 'datetime',
    },
    {
      title: 'Descripcion',
      name: 'description',
      type: 'array',
      of: [{ type: 'block' }],
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
    {
      title: 'Grabacion',
      name: 'recording',
      type: 'url',
      description: 'URL del evento grabado',
    },
    {
      title: 'Discord Id',
      name: 'discordId',
      type: 'string',
      description: 'Id del evento en discord',
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      cover: 'cover',
    },
    prepare({ title, date, cover }) {
      return {
        title,
        subtitle: format(new Date(date), 'MMM d - HH:mm'),
        media: cover,
      };
    },
  },
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date, Old',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
