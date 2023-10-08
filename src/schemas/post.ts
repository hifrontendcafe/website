// import { BsPencil } from 'react-icons/bs';
import { defineType } from 'sanity';

export default defineType({
  name: 'post',
  type: 'document',
  title: 'Post',
  // icon: BsPencil,
  fields: [
    {
      name: 'title',
      title: 'Titulo',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'person' }],
    },
    {
      name: 'coverImage',
      title: 'Imagen principal',
      type: 'image',
    },
    {
      name: 'date',
      title: 'Fecha',
      type: 'datetime',
    },
    {
      name: 'excerpt',
      title: 'Intro',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
  ],
});
