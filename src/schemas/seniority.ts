// import { MdList } from 'react-icons/md';

export default {
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
};
