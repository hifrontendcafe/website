import { getPageByName } from '@/lib/api.server';
import { getSettings } from '@/lib/sanity/getSettings';

const DEFAULT_DESCRIPTION =
  'Somos una comunidad de personas interesadas en tecnología y ciencias informáticas en donde charlamos sobre lenguajes de programación, diseño web, infraestructura, compartimos dudas, preguntamos y respondemos.';

type GetMetadataParams = {
  description?: string;
  title?: string | { default: string; template: string };
};

export const getMetadata = async (params: GetMetadataParams) => {
  const { title } = params;

  const settings = await getSettings();

  const description =
    params.description || settings.description || DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL('https://frontend.cafe'),
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

export const getPageMetadata = async (name: string) => {
  const page = await getPageByName({ name });

  return await getMetadata({
    title: page?.title,
    description: page?.shortDescription,
  });
};
