// import { BsFillPeopleFill } from 'react-icons/bs';
import { defineType } from 'sanity';

const profile = defineType({
  title: 'Profile',
  name: 'profile',
  type: 'document',
  // icon: BsFillPeopleFill,
  fields: [
    /* Personal Information */
    {
      name: 'person',
      title: 'Persona',
      type: 'reference',
      to: [{ type: 'person' }],
    },
    /* Profile(Talent) Information */
    {
      title: 'Descripcion',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Activo',
      name: 'isActive',
      type: 'boolean',
    },
    {
      title: 'En búsqueda laboral',
      name: 'isAvailable',
      type: 'boolean',
    },
    {
      name: 'role',
      title: 'Rol',
      type: 'reference',
      to: [{ type: 'role' }],
    },
    {
      name: 'seniority',
      title: 'Seniority',
      type: 'reference',
      to: [{ type: 'seniority' }],
    },
    {
      name: 'technologies',
      title: 'Tecnologias',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'technology' }] }],
    },
    {
      title: 'Ubicación',
      name: 'location',
      type: 'string',
    },
  ],
  preview: {
    select: {
      firstName: 'person.firstName',
      lastName: 'person.lastName',
      username: 'person.username',
      photo: 'person.photo',
    },
    prepare(selection) {
      const { firstName, lastName, username, photo } = selection;
      return {
        title: username,
        subtitle: `${firstName || ''} ${lastName || ''}`,
        media: photo,
      };
    },
  },
  initialValue: {
    isActive: false,
  },
});

export default profile;
