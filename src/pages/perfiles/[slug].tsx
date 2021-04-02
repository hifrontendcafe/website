import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Layout from '../../components/Layout';
import ProfileBody from '../../components/ProfileBody';
import ProfileHeader from '../../components/ProfileHeader';
import { getProfileBySlug, getAllProfiles } from '../../lib/api';
import Head from 'next/head';
import markdownToHtml from '../../lib/markdowToHtml';
import Link from 'next/link';

import { Profile } from '../../lib/types';

type Props = {
  profile: Profile;
  preview?: boolean;
};

const ProfilePage = ({ profile, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !profile?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout title={`Perfiles en FrontendCafé | profile.name`} preview={preview}>
      <Head>
        <title>{profile.name} | FrontendCafé</title>
        <meta property="og:image" content={profile?.ogImage.url} />
      </Head>
      <main className="pt-20 md:pt-0 mb-32 container mx-auto px-4 md:px-6">
        <div className="hidden md:flex md:justify-end text-secondarydark">
          <Link href="/perfiles">
            <a className="text-xl py-4 hover:underline tracking-tight font-semibold">
              VOLVER A LA LISTA
            </a>
          </Link>
        </div>
        <div className="border-b border-gray-300 pb-8">
          <ProfileHeader
            name={profile?.name}
            coverImage={profile?.coverImage}
            role={profile?.role}
            socialMedia={profile?.socialMedia}
          />
          {profile?.availableForWork && (
            <div>
              <div className="text-primary my-4 text-lg font-semibold">
                ¡Estoy en búsqueda activa!
              </div>
              {profile?.email && (
                <div className="my-2">
                  <a
                    href={`mailto:${profile?.email}`}
                    className="px-4 py-2 bg-primary text-sm font-semibold text-white rounded-lg hover:opacity-75"
                  >
                    CONTÁCTAME
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
        <h2 className="text-indigo-600 text-4xl font-semibold mt-4">Skills</h2>
        {profile?.stack?.length > 0 && (
          <ul className="flex items-center flex-wrap">
            {profile?.stack?.map((tech) => (
              <li
                key={tech}
                className="px-4 py-1 mt-2 mr-2 text-sm rounded-md bg-indigo-400 text-white break-all uppercase"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
        <h2 className="text-indigo-600 text-4xl font-semibold mt-8 mb-4">
          Sobre mí
        </h2>
        <ProfileBody content={profile?.content} />
      </main>
    </Layout>
  );
};

export default ProfilePage;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const profile = getProfileBySlug(params.slug, [
    'name',
    'socialMedia',
    'slug',
    'role',
    'content',
    'ogImage',
    'coverImage',
    'email',
    'availableForWork',
    'stack',
  ]);
  const content = await markdownToHtml(profile.content || '');

  return {
    props: {
      profile: {
        ...profile,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const profiles = getAllProfiles(['slug']);

  return {
    paths: profiles?.map((profile) => {
      return {
        params: {
          slug: profile.slug,
        },
      };
    }),
    fallback: false,
  };
}
