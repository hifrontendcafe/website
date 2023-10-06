// import { BsFillPeopleFill } from 'react-icons/bs';
import { defineType } from 'sanity';

export default defineType({
  title: 'Technologías',
  name: 'technology',
  type: 'document',
  // icon: BsFillPeopleFill,
  fields: [{ title: 'Nombre', name: 'name', type: 'string' }],
});
