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

const Post = ({ profile, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !profile?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <div className="container relative mx-auto px-4 md:px-6">
        <main className="mb-32">
          <Head>
            <title>{profile.name} | FrontendCafé</title>
            <meta property="og:image" content={profile.ogImage.url} />
          </Head>
          <ProfileHeader
            name={profile.name}
            coverImage={profile.coverImage}
            role={profile.role}
          />
          {/* Social Media */}
          <ProfileSocialMedia socialMedia={profile.socialMedia} />
          <ProfileBody content={profile.content} />
        </main>
      </div>
    </Layout>
  );
};

export default Post;

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
  const posts = getAllProfiles(['slug']);

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      };
    }),
    fallback: false,
  };
}
