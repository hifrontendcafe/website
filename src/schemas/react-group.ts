// import { GiAtom } from 'react-icons/gi';

export default {
  title: 'Grupo Reactivista',
  name: 'reactGroup',
  type: 'document',
  // icon: GiAtom,
  fields: [
    {
      title: 'Nombre',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Tema',
      name: 'topic',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Material de estudio',
      name: 'studyMaterial',
      type: 'url',
    },
    {
      title: 'Representante del grupo',
      name: 'teamCaptain',
      type: 'reference',
      to: [{ type: 'person' }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Participantes',
      name: 'participants',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      validation: (Rule) => Rule.max(10),
    },

    {
      title: 'Estilo de reuniones',
      name: 'meetings',
      type: 'text',
    },
    {
      title: 'Plan',
      name: 'plan',
      type: 'text',
    },
    {
      title: 'Fecha de inicio',
      name: 'startDate',
      type: 'datetime',
    },
    {
      title: 'Estado',
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Solicitado', value: 'draft' },
          { title: 'Aprobado', value: 'approved' },
          { title: 'Iniciado', value: 'started' },
          { title: 'Terminado', value: 'done' },
        ],
      },
    },
  ],
  initialValue: {
    status: 'draft',
  },
  preview: {
    select: {
      name: 'name',
      username: 'teamCaptain.username',
    },
    prepare({ name, username }) {
      return {
        title: name,
        subtitle: username.current,
      };
    },
  },
};
