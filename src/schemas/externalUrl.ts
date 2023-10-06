// import { BsLink } from 'react-icons/bs';

export default {
  title: 'URLs Externas',
  name: 'externalUrl',
  type: 'document',
  // icon: BsLink,
  fields: [
    { title: 'Nombre', name: 'name', type: 'string' },
    { title: 'Url', name: 'url', type: 'url' },
  ],
};
