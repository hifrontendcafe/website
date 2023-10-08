// import { FaUsers } from 'react-icons/fa';
import { defineType } from 'sanity';

export default defineType({
  name: 'cmykParticipant',
  type: 'document',
  title: 'CMYK Participant',
  // icon: FaUsers,
  fields: [
    {
      title: 'Usuario de Discord',
      name: 'discordUser',
      type: 'reference',
      to: [{ type: 'person' }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Tipo de participación',
      name: 'formType',
      type: 'string',
      options: {
        list: [
          { title: 'Lider', value: 'lider' },
          { title: 'Participante', value: 'participant' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isChix',
      title: 'Tiene el rol Chix',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'CMYK Version',
      name: 'cmykVersion',
      type: 'string',
      options: {
        list: [
          { title: 'v1.0', value: '1' },
          { title: 'v2.0', value: '2' },
          { title: 'v3.0', value: '3' },
          { title: 'v4.0', value: '4' },
          { title: 'v5.0', value: '5' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'participationLevel',
      title: 'Nivel de Participación',
      type: 'string',
      options: {
        list: [
          { title: 'Nivel 1 (HTML - CSS - JavaScript)', value: 'level1' },
          {
            title: 'Nivel 2 (React.js Node.js - Librería de CSS a elección)',
            value: 'level2',
          },
        ],
      },
    },
    {
      name: 'experience',
      title: '¿Ya tienes experiencia laboral/Liderando un equipo en IT?',
      type: 'string',
      options: {
        list: [
          { title: 'Si', value: 'yes' },
          { title: 'No', value: 'no' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'workExperience',
      title: 'Experiencia laboral',
      type: 'string',
      options: {
        list: [
          { title: 'Hasta 6 meses (Solo participantes)', value: 'level0' },
          {
            title: 'Entre 6 meses y 1 año (Solo participantes)',
            value: 'level1',
          },
          { title: 'Más de un año (Solo participantes)', value: 'level2' },
          { title: 'Hasta 1 año (Solo líderes)', value: 'level3' },
          { title: 'Entre 1 año y 3 años (Solo líderes)', value: 'level4' },
          { title: 'Más de 3 años (Solo líderes)', value: 'level5' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'stackWanted',
      title: '¿Te interesa front (React) o back (Node/Express)?',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend (React)', value: 'front' },
          { title: 'Backend (Node/Express)', value: 'back' },
          { title: 'Ambas', value: 'both' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'timeAvailability',
      title: 'Disponibilidad horaria',
      type: 'string',
      options: {
        list: [
          { title: 'Entre 2 y 4 horas semanales', value: '>2<4hours' },
          { title: 'Entre 4 y 6 horas semanales', value: '>4<6hours' },
          { title: '6 o más horas semanales', value: '>=6hours' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'projects',
      title: '¿Que proyecto te interesa más?',
      type: 'string',
      options: {
        list: [
          { title: 'App Flashcards', value: 'flashcards' },
          {
            title: 'App Administrador call for papers',
            value: 'callForPapers',
          },
          { title: 'No tengo preferencias', value: 'both' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'previousKnowledge',
      title: 'Conocimientos previos',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'aboutParticipant',
      title:
        'Contanos algo sobre vos y por qué te interesa formar parte de este proyecto',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'otherQuestions',
      title: '¿Tenés alguna pregunta o duda que quieras comunicarnos?',
      type: 'text',
    },
    {
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          { title: 'En revisión', value: 'revision' },
          { title: 'Rechazado', value: 'rejected' },
          { title: 'Aprobado', value: 'approved' },
        ],
      },
    },
  ],
  initialValue: {
    status: 'revision',
  },
  preview: {
    select: {
      title: 'discordUser.username',
    },
  },
});
