import { getSettings } from './api.server';

export const DEFAULT_DESCRIPTION =
  'Somos una comunidad de personas interesadas en tecnología y ciencias informáticas en donde charlamos sobre lenguajes de programación, diseño web, infraestructura, compartimos dudas, preguntamos y respondemos.';

export type GetMetadataParams = {
  description?: string;
  title?: string | { default: string; template: string };
};

export const getMetadata = async (params: GetMetadataParams) => {
  const { title } = params;

  const settings = await getSettings();

  const description =
    params.description || settings.description || DEFAULT_DESCRIPTION;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: 'https://frontend.cafe/logo-square.png',
        },
      ],
    },
  };
};
