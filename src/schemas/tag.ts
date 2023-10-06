// import { AiFillTag } from 'react-icons/ai';
import { defineType } from 'sanity';

export default defineType({
  title: 'Tag',
  name: 'tag',
  type: 'document',
  // icon: AiFillTag,
  fields: [
    {
      title: 'Titulo',
      name: 'title',
      type: 'string',
    },
  ],
});
