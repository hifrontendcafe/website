// import { MdList } from 'react-icons/md';
import { defineType } from 'sanity';

export default defineType({
  title: 'Roles',
  name: 'role',
  type: 'document',
  // icon: MdList,
  fields: [
    {
      title: 'Nombre',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
});
