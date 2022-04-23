import type {
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';
import { getSettings, getPagesPaths, getPageByPath } from '@/lib/api';
import Layout from '@/components/Layout';
import Matcher from '@/components/Page/Matcher';
import { useRouter } from 'next/router';

type CustomPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const CustomPage: React.FC<CustomPageProps> = ({ page }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Cargando...</p>;
  }

  return (
    <Layout metadata={page.metadata} title={page.title}>
      <div className="mt-4">
        {page.components?.map((component) => (
          <Matcher key={component._key} {...component} />
        ))}
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getPagesPaths()).map((path) => ({
    params: { slug: path.split('/').filter((path) => path !== '') },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({
  params,
  preview,
}: GetStaticPropsContext) => {
  const settings = await getSettings(preview);

  const [base, ...rest] = params.slug as string[];

  const path = [`/${base}`].concat(rest).join('/');

  const page = await getPageByPath(path, preview);

  if (typeof page.title === 'undefined') {
    return {
      props: {} as never,
      notFound: true,
    };
  }

  return {
    props: {
      settings,
      page,
    },
    revalidate: 1,
  };
};

export default CustomPage;
