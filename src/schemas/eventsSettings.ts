export default {
  name: 'eventsSettings',
  title: 'Events Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'automaticaticMigrationEnabled',
      title: 'Enabled automatic migration of events from Discord',
      description:
        'Habilitar la migración de nuevos eventos de Discord por tarea programada y/o llamada a api',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sendEmailsOnMigration',
      title: 'Send emails on migration',
      description: 'Habilitar el envio de emails al migrar nuevos eventos',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    },
  ],
};
