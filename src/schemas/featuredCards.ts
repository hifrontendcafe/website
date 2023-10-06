// import { AiFillHome } from 'react-icons/ai';
import { defineType } from 'sanity';

export default defineType({
  title: 'Featured Cards',
  name: 'featuredCards',
  type: 'document',
  // icon: AiFillHome,
  fields: [
    {
      title: 'Titulo',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Descripcion',
      name: 'description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Link',
      name: 'link',
      type: 'string',
    },
    {
      title: 'Texto del link',
      description: 'Link azul que aparece abajo en la card',
      name: 'btnText',
      type: 'string',
    },
  ],
});
