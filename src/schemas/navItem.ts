// import { BsLink } from 'react-icons/bs';
import { defineType } from 'sanity';

export default defineType({
  title: 'Nav Item',
  name: 'navItem',
  type: 'document',
  // icon: BsLink,
  fields: [
    { name: 'text', title: 'Text', type: 'string' },
    {
      name: 'link',
      title: 'Link',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'externalUrl' }],
    },
  ],
});
