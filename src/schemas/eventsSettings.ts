import { defineType } from 'sanity';

export default defineType({
  name: 'eventsSettings',
  title: 'Events Settings',
  type: 'document',
  // TODO: Add these options
  // @ts-expect-error Fix this
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
});
