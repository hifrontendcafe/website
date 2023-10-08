// import { MdList } from 'react-icons/md';
import { defineType } from 'sanity';

export default defineType({
  title: 'Tema',
  name: 'topic',
  type: 'document',
  // icon: MdList,
  fields: [
    {
      title: 'Titulo',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Descripción',
      name: 'description',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
});
