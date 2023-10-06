// import { GrCertificate } from 'react-icons/gr';

export default {
  title: 'Certificado',
  name: 'fec-certificate',
  type: 'document',
  // icon: GrCertificate,
  fields: [
    {
      title: 'ID del certificado',
      name: 'certificationId',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Titulo',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Fecha de finalización',
      name: 'finishDate',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
        calendarTodayLabel: 'Today',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Logo',
      name: 'logo',
      type: 'image',
    },
  ],
};
