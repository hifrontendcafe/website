import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Layout from '../../components/Layout';
import ProfileBody from '../../components/ProfileBody';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileSocialMedia from '../../components/ProfileSocialMedia';
import { getProfileBySlug, getAllProfiles } from '../../lib/api';
import Head from 'next/head';
import markdownToHtml from '../../lib/markdowToHtml';

type ProfileType = {
  slug: string;
  name: string;
  coverImage: string;
  role: string;
  email: string;
  openToWork: true;
  socialMedia: {
    [name: string]: string;
  };
  ogImage: {
    url: string;
  };
  content: string;
};

type Props = {
  profile: ProfileType;
  preview?: boolean;
};

const Profile = ({ profile, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !profile?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Head>
        <title>{profile.name} | FrontendCafé</title>
        <meta property="og:image" content={profile.ogImage.url} />
      </Head>
      <main className="pt-20 md:pt-0 mb-32 container mx-auto px-4 md:px-6">
        <ProfileHeader
          name={profile.name}
          coverImage={profile.coverImage}
          role={profile.role}
        />
        {profile.openToWork && (
          <div className="text-primary my-4 text-xl font-semibold">
            Estoy en búsqueda laboral!
          </div>
        )}
        {profile.email && (
          <div className="my-4">
            <a
              href={`mailto:${profile.email}`}
              className="bg-primary px-4 py-2 text-white text-2xl rounded-lg"
            >
              Contactame
            </a>
          </div>
        )}
        <ProfileSocialMedia socialMedia={profile.socialMedia} />
        <ProfileBody content={profile.content} />
      </main>
    </Layout>
  );
};

export default Profile;

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
    'openToWork',
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
    paths: profiles.map((profile) => {
      return {
        params: {
          slug: profile.slug,
        },
      };
    }),
    fallback: false,
  };
}
