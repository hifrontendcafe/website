// import { MdList } from 'react-icons/md';

export default {
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
};
