export default {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Navbar',
      name: 'navbar',
      type: 'array',
      description:
        'Items for navbar, could be references to pages or external urls',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }, { type: 'externalUrl' }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'FooterNav',
      name: 'footerNav',
      type: 'array',
      description:
        'Items for footerNav, could be references to nav items (text to display and page or external url)',
      of: [{ type: 'navItem' }],
      validation: (Rule) => Rule.unique(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      title: 'Hero words',
      name: 'heroWords',
      type: 'array',
      description: 'Words that rotate randomly in the Hero component',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'Hero Subtitle',
      name: 'heroSubtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Hero Description',
      name: 'heroDescription',
      type: 'text',
    },
    {
      title: 'Discord Button Label',
      name: 'discordButtonLabel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Iniciativas Button Text',
      name: 'iniciativasButtonText',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Social networks',
      name: 'socialnetworks',
      type: 'object',
      fields: [
        { name: 'github', type: 'string', title: 'Github' },
        { name: 'twitter', type: 'string', title: 'Twitter' },
        { name: 'youtube', type: 'string', title: 'Youtube' },
        { name: 'linkedin', type: 'string', title: 'Linkedin' },
        { name: 'twitch', type: 'string', title: 'Twitch' },
        { name: 'instagram', type: 'string', title: 'Instagram' },
      ],
    },
    {
      title: 'CMYK Inscription',
      description: 'Configuraciones para todo lo relacionado a CMYK',
      name: 'cmykSettings',
      type: 'object',
      fields: [
        {
          title: 'CMYK Inscription',
          description:
            'Para habilitar la inscripción a CMYK, normalmente debería estar deshabilitado salvo cuando CMYK este abierto a nuevas inscripciones',
          name: 'cmykInscription',
          type: 'boolean',
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'CMYK Inscription Chix',
          description:
            'Para habilitar la inscripción a CMYK exclusivo para chixs.',
          name: 'cmykInscriptionChix',
          type: 'boolean',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
};
