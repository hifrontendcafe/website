import {
  projectsLabels,
  stackWantedLabels,
  workExperienceLabels,
} from './datatable-labels';
import { MUIDataTableProps } from 'mui-datatables';

export const columns: MUIDataTableProps['columns'] = [
  {
    name: '_createdAt',
    label: 'Fecha',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => new Date(value).toLocaleString(),
    },
  },
  {
    name: 'discordUser',
    label: 'Usuario',
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: 'email',
    label: 'Email',
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: 'timezone',
    label: 'Zona Horaria',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'timeAvailability',
    label: 'Disponibilidad horaria (semanal)',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) =>
        value === '>2<4hours'
          ? 'Entre 2 y 4 horas'
          : value === '>4<6hours'
          ? 'Entre 4 y 6 horas'
          : 'Más de 6 horas',
    },
  },
  {
    name: 'aboutParticipant',
    label: 'Sobre mí',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'participationType',
    label: 'Form',
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) =>
        value === 'lider' ? 'Líder' : 'Participante',
    },
  },
  {
    name: 'workExperience',
    label: 'Experiencia Laboral',
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => workExperienceLabels[value],
    },
  },
  {
    name: 'stackWanted',
    label: 'Front o Back',
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => stackWantedLabels[value],
    },
  },
  {
    name: 'projects',
    label: 'Proyecto',
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => projectsLabels[value],
    },
  },
  {
    name: 'previousKnowledge',
    label: 'Conocimientos',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'otherQuestions',
    label: 'Otras preguntas',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'status',
    label: 'Estado',
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) =>
        value === 'revision' ? '🟡' : value === 'approved' ? '🟢' : '🔴',
    },
  },
];
