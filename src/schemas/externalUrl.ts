// import { BsLink } from 'react-icons/bs';
import { defineType } from 'sanity';

export default defineType({
  title: 'URLs Externas',
  name: 'externalUrl',
  type: 'document',
  // icon: BsLink,
  fields: [
    { title: 'Nombre', name: 'name', type: 'string' },
    { title: 'Url', name: 'url', type: 'url' },
  ],
});
