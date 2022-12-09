import Layout from '@/components/Layout';
import { PageComponents } from '@/components/Page/Matcher';
import { getPageByPath, getSettings } from '@/lib/api';
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
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
        <PageComponents components={page.components} />
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const paths = await getPagesPaths();

  return {
    paths: [],
    fallback: 'blocking',
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
