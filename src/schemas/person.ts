// import { BiUserCircle } from 'react-icons/bi';
import { timezones } from '../lib/timezones';
// import { v4 as uuidv4 } from 'uuid';
import { defineType } from 'sanity';

const person = defineType({
  name: 'person',
  type: 'document',
  title: 'Persona',
  // icon: BiUserCircle,
  fields: [
    /* Personal Information */
    {
      name: 'firstName',
      title: 'Nombre',
      type: 'string',
    },
    {
      name: 'lastName',
      title: 'Apellido',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Mail',
      type: 'string',
      validation: (Rule) => Rule.email(),
    },
    {
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    /* Discord Information */
    {
      name: 'discordID',
      title: 'ID de Discord',
      type: 'slug',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'username',
      title: 'Usuario de Discord',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .regex(/(.*)#(\d{4})/, {
            name: 'Usuario de discord',
            invert: false,
          })
          .error('Usuario incorrecto. Ej: Usuario#1234'),
    },

    {
      name: 'timezone',
      title: 'Zona Horaria',
      type: 'string',
      options: {
        list: timezones.map((tz) => ({ title: tz.text, value: tz.text })),
      },
    },
    /* Social Media */
    {
      title: 'Web / Portfolio',
      name: 'portfolio',
      type: 'url',
    },
    {
      title: 'LinkedIn',
      name: 'linkedin',
      type: 'url',
    },
    {
      title: 'GitHub',
      name: 'github',
      type: 'url',
    },
    {
      title: 'Twitter',
      name: 'twitter',
      type: 'url',
    },
    {
      title: 'Instagram',
      name: 'instagram',
      type: 'url',
    },
    /* Certification */
    {
      title: 'Certificaciones',
      name: 'certifications',
      type: 'array',
      of: [
        {
          title: 'Certificado',
          type: 'object',
          fields: [
            {
              title: 'ID del certificado',
              name: 'certificationId',
              type: 'string',
              // initialValue: uuidv4(),
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Certificado',
              name: 'certificate',
              type: 'reference',
              to: [{ type: 'fec-certificate' }],
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'certificate.title',
              media: 'certificate.logo',
            },
          },
        },
      ],
    },

    {
      title: 'Team FEC',
      name: 'fecTeam',
      type: 'boolean',
      initialValue: false,
    },

    {
      title: 'Viene de perfil (postgres)',
      name: 'fromProfile',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      username: 'username',
      photo: 'photo',
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
  orderings: [
    {
      title: 'Nombre',
      name: 'firstNameAsc',
      by: [{ field: 'first_name', direction: 'asc' }],
    },
    {
      title: 'Usuario',
      name: 'usernameAsc',
      by: [{ field: 'username', direction: 'asc' }],
    },
  ],
});

export default person;
