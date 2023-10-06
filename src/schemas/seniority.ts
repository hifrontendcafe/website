// import { MdList } from 'react-icons/md';
import { defineType } from 'sanity';

export default defineType({
  title: 'Seniorities',
  name: 'seniority',
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
